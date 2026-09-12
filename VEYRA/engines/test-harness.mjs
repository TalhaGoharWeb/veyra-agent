/**
 * VEYRA PRODUCTION ENGINE: MULTI-VECTOR TEST & AUDIT HARNESS
 * Zero external dependencies. Uses native Node APIs.
 * Directive 30: Testing Engine
 * Directive 23: Security Engine
 * Directive 28: Accessibility Engine
 */

import fs from 'node:fs';
import path from 'node:path';

export class VeyraTestHarness {
  static async runFullSuite(projectDir) {
    console.log(`\n\x1b[1m\x1b[38;5;99m[VEYRA AUTOMATED MULTI-VECTOR QA HARNESS • ONE-MAN ARMY FOR VIBE CODERS]\x1b[0m`);
    console.log(`\x1b[90mEngineered by Muhammad Talha Farid • Directives 1-55 Compliant\x1b[0m`);
    console.log(`Target: ${projectDir}\n`);

    const results = [];

    // 1. Directive 24 Check: Real Functionality vs Mock Timers
    results.push(this.checkRealFunctionality(projectDir));

    // 2. Directive 23 Check: Security & Secrets
    results.push(this.checkSecurity(projectDir));

    // 3. Directive 28 Check: Accessibility & Semantic HTML
    results.push(this.checkAccessibility(projectDir));

    // 4. Directive 20 Check: Relational DB Schema
    results.push(this.checkDatabaseIntegrity(projectDir));

    // 5. 2026 Flutter Architecture Check (Dart 3, ThemeExtension, Riverpod/BLoC, GoRouter)
    results.push(this.checkFlutterModernStandards(projectDir));

    // 6. Directive 44 & Vibe-Coder Sanity Check: No Unimplemented Stubs or Silent Failures
    results.push(this.checkVibeCoderSanity(projectDir));

    // Summary
    const total = results.length;
    const passed = results.filter((r) => r.passed).length;
    const score = Math.round((passed / total) * 100);

    console.log(`\n-----------------------------------------------------`);
    console.log(`QA AUDIT SCORE: \x1b[1m${score === 100 ? '\x1b[32m100%' : score >= 75 ? '\x1b[33m' + score + '%' : '\x1b[31m' + score + '%'}\x1b[0m (${passed}/${total} vectors passed)`);
    console.log(`-----------------------------------------------------\n`);

    return { score, passed, total, results, author: 'Muhammad Talha Farid' };
  }

  static checkVibeCoderSanity(projectDir) {
    let stubsFound = 0;
    const files = this.getAllFiles(projectDir);

    for (const file of files) {
      if (file.includes('node_modules') || file.includes('.git') || file.includes('VEYRA') || file.includes('.dart_tool')) continue;
      if (!/\.(js|mjs|ts|jsx|tsx|dart|html)$/.test(file)) continue;
      const content = fs.readFileSync(file, 'utf8');

      if (/\/\/\s*(TODO\b|FIXME\b|PLACEHOLDER\b)/i.test(content)) {
        stubsFound++;
      }
      if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(content)) {
        stubsFound++;
      }
    }

    const passed = stubsFound === 0;
    console.log(`  [${passed ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[33m▲ WARN\x1b[0m'}] Directive 44: Vibe-Coder Sanity (Zero TODO Stubs & Empty Catches)`);
    if (!passed) console.log(`      \x1b[33mFound ${stubsFound} placeholder stubs or swallowed error catches.\x1b[0m`);
    return { name: 'Directive 44 Vibe Coder Sanity', passed };
  }

  static checkRealFunctionality(projectDir) {
    let mockTimersFound = 0;
    const files = this.getAllFiles(projectDir);

    for (const file of files) {
      if (file.includes('node_modules') || file.includes('test') || file.includes('VEYRA') || file.includes('.dart_tool')) continue;
      const content = fs.readFileSync(file, 'utf8');
      
      // JavaScript / TypeScript mock timer
      if (/setTimeout\s*\(\s*(\(\)\s*=>|function)\s*\{?[^}]*\}?,\s*(1000|1500|2000|3000|4000|5000)\s*\)/.test(content)) {
        if (!/copied|setCopied|toast|dismiss/i.test(content)) {
          mockTimersFound++;
        }
      }

      // Flutter / Dart mock sleep timer
      if (/Future\.delayed\s*\(\s*(const\s+)?Duration\s*\(\s*seconds:\s*[1-9]\d*\s*\)/.test(content)) {
        mockTimersFound++;
      }
    }

    const passed = mockTimersFound === 0;
    console.log(`  [${passed ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[31m✘ FAIL\x1b[0m'}] Directive 24: Real-Functionality (No Mock setTimeout or Future.delayed)`);
    if (!passed) console.log(`      \x1b[31mFound ${mockTimersFound} suspicious mock sleep timers simulating latency.\x1b[0m`);
    return { name: 'Directive 24 Real Functionality', passed };
  }

  static checkSecurity(projectDir) {
    let secretLeaks = 0;
    const files = this.getAllFiles(projectDir);

    for (const file of files) {
      if (file.includes('node_modules') || file.includes('.git') || file.includes('VEYRA') || file.includes('.dart_tool')) continue;
      const content = fs.readFileSync(file, 'utf8');
      if (/(api_key|secret_key|private_key|master_token)\s*=\s*['"][a-zA-Z0-9_\-]{20,}['"]/i.test(content)) {
        secretLeaks++;
      }
    }

    const passed = secretLeaks === 0;
    console.log(`  [${passed ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[31m✘ FAIL\x1b[0m'}] Directive 23: Security & Secret Sanitization`);
    if (!passed) console.log(`      \x1b[31mFound ${secretLeaks} hardcoded secrets in source files.\x1b[0m`);
    return { name: 'Directive 23 Security', passed };
  }

  static checkAccessibility(projectDir) {
    const htmlFiles = this.getAllFiles(projectDir).filter((f) => f.endsWith('.html') && !f.includes('node_modules') && !f.includes('VEYRA'));
    let missingLabels = 0;

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('<input') && !content.includes('<label') && !content.includes('aria-label')) {
        missingLabels++;
      }
    }

    const passed = missingLabels === 0;
    console.log(`  [${passed ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[33m▲ WARN\x1b[0m'}] Directive 28: Accessibility & Form Labels`);
    return { name: 'Directive 28 Accessibility', passed };
  }

  static checkDatabaseIntegrity(projectDir) {
    const schemaFiles = this.getAllFiles(projectDir).filter((f) => (f.endsWith('schema.sql') || f.endsWith('.sql')) && !f.includes('node_modules'));
    let hasForeignKeys = true;

    if (schemaFiles.length > 0) {
      const content = fs.readFileSync(schemaFiles[0], 'utf8');
      hasForeignKeys = content.includes('PRIMARY KEY') && (content.includes('FOREIGN KEY') || content.includes('REFERENCES') || !content.includes('CREATE TABLE'));
    }

    console.log(`  [${hasForeignKeys ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[31m✘ FAIL\x1b[0m'}] Directive 20: Relational Schema Integrity & Constraints`);
    return { name: 'Directive 20 Database Integrity', passed: hasForeignKeys };
  }

  static checkFlutterModernStandards(projectDir) {
    const dartFiles = this.getAllFiles(projectDir).filter((f) => f.endsWith('.dart') && !f.includes('.dart_tool') && !f.includes('VEYRA'));
    if (dartFiles.length === 0) {
      // Not a Flutter project or no Dart files
      return { name: '2026 Flutter Standards', passed: true };
    }

    let hasThemeExtension = false;
    let hasSealedResult = false;
    let usesSetState = 0;

    for (const file of dartFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('ThemeExtension')) hasThemeExtension = true;
      if (content.includes('sealed class Result') || content.includes('sealed class')) hasSealedResult = true;
      if (content.includes('setState(')) usesSetState++;
    }

    const compliant = hasThemeExtension || hasSealedResult || usesSetState <= 5;
    console.log(`  [${compliant ? '\x1b[32m✔ PASS\x1b[0m' : '\x1b[33m▲ WARN\x1b[0m'}] 2026 Flutter Standards: Dart 3 Sealed Classes, ThemeExtension & Clean State`);
    return { name: '2026 Flutter Standards', passed: compliant };
  }

  static getAllFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        results = results.concat(this.getAllFiles(full));
      } else {
        results.push(full);
      }
    }
    return results;
  }
}
