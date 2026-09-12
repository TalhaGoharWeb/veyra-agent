/**
 * VEYRA PRODUCTION PRIMITIVE: RELATIONAL DATABASE & MIGRATIONS
 * Uses native node:sqlite (Node 22+) with zero external dependencies.
 * Directive 20: Database Engine
 * Directive 23: Security & SQL Injection Prevention
 */

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

export class VeyraDB {
  constructor(dbPath = 'data.sqlite') {
    this.dbPath = dbPath;
    this.db = new DatabaseSync(dbPath);
    this.initPragmas();
    this.initMigrationTable();
  }

  initPragmas() {
    // WAL mode for high concurrency & foreign keys for ACID integrity
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      PRAGMA synchronous = NORMAL;
    `);
  }

  initMigrationTable() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS _veyra_migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  /**
   * Applies an array of SQL migration scripts deterministically
   */
  migrate(migrations = []) {
    const applied = new Set(
      this.db.prepare('SELECT name FROM _veyra_migrations').all().map((r) => r.name)
    );

    for (const mig of migrations) {
      if (!applied.has(mig.name)) {
        console.log(`[VEYRA DB] Applying migration: ${mig.name}`);
        this.db.exec('BEGIN TRANSACTION;');
        try {
          this.db.exec(mig.sql);
          this.db.prepare('INSERT INTO _veyra_migrations (name) VALUES (?)').run(mig.name);
          this.db.exec('COMMIT;');
        } catch (err) {
          this.db.exec('ROLLBACK;');
          console.error(`[VEYRA DB MIGRATION ERROR] ${mig.name} failed:`, err);
          throw err;
        }
      }
    }
  }

  /**
   * Executes a safe prepared query returning all matching rows
   */
  query(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params);
  }

  /**
   * Executes a safe prepared query returning single first row
   */
  queryOne(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.get(...params);
  }

  /**
   * Executes an INSERT, UPDATE, or DELETE mutation with parameter binding
   */
  execute(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.run(...params);
  }

  close() {
    this.db.close();
  }
}
