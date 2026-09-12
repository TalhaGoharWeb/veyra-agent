/**
 * VEYRA AGENT - ARCHITECTURE ENGINE
 * Directives 7, 8, 9, 14, 15, 16, 20, 21, 33, 34, 35
 */

import type { UserIntent, ArchitectureBlueprint, TechDecision, UXJourneyStep, DesignTokenSet, DataEntity, APIEndpoint } from './types.ts';

export class ArchitectEngine {
  /**
   * Generates a complete, coherent technical blueprint from normalized intent
   */
  public architect(intent: UserIntent): ArchitectureBlueprint {
    const techStack = this.evaluateTechnology(intent);
    const designTokens = this.generateDesignTokens(intent);
    const uxJourney = this.designUXJourney(intent);
    const dataEntities = this.modelDataEntities(intent);
    const apiEndpoints = this.designAPIContracts(intent, dataEntities);
    const dependencyJustifications = this.evaluateDependencies(intent, techStack);

    return {
      productName: this.deriveProductName(intent),
      tagline: intent.goal,
      techStack,
      designTokens,
      uxJourney,
      dataEntities,
      apiEndpoints,
      dependencyJustifications,
      stateMachine: {
        initial: 'INITIALIZED',
        states: ['INITIALIZED', 'AUTHENTICATING', 'READY', 'MUTATING', 'VALIDATING', 'ERROR_RECOVERY', 'SYNCED'],
      },
    };
  }

  private deriveProductName(intent: UserIntent): string {
    const prompt = intent.rawPrompt.toLowerCase();
    if (prompt.includes('invoice') || prompt.includes('billing')) return 'Veyra Ledger';
    if (prompt.includes('ecommerce') || prompt.includes('shop')) return 'Veyra Commerce';
    if (prompt.includes('task') || prompt.includes('kanban')) return 'Veyra Flow';
    if (prompt.includes('agent') || prompt.includes('orchestrat')) return 'VEYRA Core Orchestrator';
    return 'Veyra Engineered System';
  }

  /**
   * Directive 7 & 33: Technology Selection Engine and Decision Matrix
   */
  private evaluateTechnology(intent: UserIntent): TechDecision[] {
    return [
      {
        category: 'Frontend',
        selected: 'React 19 + TypeScript + Vite',
        rationale: 'Sub-second cold boot, full static typing, zero boilerplate, unmatched component composability.',
        alternativeConsidered: 'Next.js (Rejected: unneeded SSR latency/complexity for this architecture).',
        justificationScore: 9.8,
      },
      {
        category: 'Styling',
        selected: 'Custom CSS Tokens + Tailwind Utility System',
        rationale: 'Strict compliance with Anti-Generic UI. Zero runtime CSS overhead, full responsive design control.',
        alternativeConsidered: 'Plain CSS (Higher maintenance) / CSS-in-JS (Runtime performance penalty).',
        justificationScore: 9.5,
      },
      {
        category: 'State',
        selected: 'Typed Context + Optimistic Reducer Pattern',
        rationale: 'Zero third-party bloat; handles async mutations, optimistic rollback, and real-time state safely.',
        alternativeConsidered: 'Redux Toolkit (Over-engineered for this domain) / Zustand (Unnecessary dependency).',
        justificationScore: 9.6,
      },
      {
        category: 'Backend',
        selected: 'Node.js ESM / Express REST API with Zod Schema Validation',
        rationale: 'Deterministic contract enforcement, shared TypeScript schemas, lightweight, sub-5ms routing overhead.',
        alternativeConsidered: 'GraphQL (Unjustified complexity) / Python FastAPI (Additional runtime requirements).',
        justificationScore: 9.4,
      },
      {
        category: 'Database',
        selected: 'SQLite with WAL mode (or PostgreSQL for enterprise production)',
        rationale: 'Zero external network hop in local dev, ACID compliant, full relational integrity, migration-safe.',
        alternativeConsidered: 'MongoDB / NoSQL (Loose schema introduces silent regressions and data anomalies).',
        justificationScore: 9.7,
      },
      {
        category: 'Auth',
        selected: 'JWT + HTTP-Only Cookies + Role-Based Access Control (RBAC)',
        rationale: 'Directives 22 & 23: Server-enforced authorization with token rotation, zero credentials in client state.',
        alternativeConsidered: 'Local storage tokens (Vulnerable to XSS extraction).',
        justificationScore: 9.9,
      },
    ];
  }

  /**
   * Directive 15 & 16: UI Design Engine & Anti-Generic-UI Engine
   */
  private generateDesignTokens(intent: UserIntent): DesignTokenSet {
    const isDark = intent.uiRequirements.theme !== 'light';

    return {
      typography: {
        headingFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        monoFont: '"JetBrains Mono", "Fira Code", monospace',
        scale: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
      },
      colors: isDark
        ? {
            primary: '#6366f1',
            primaryLight: '#818cf8',
            secondary: '#a855f7',
            accent: '#00f5d4',
            background: '#0a0d18',
            surface: '#11162a',
            surfaceElevated: '#18203b',
            border: '#232d4e',
            textPrimary: '#f8fafc',
            textMuted: '#94a3b8',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
          }
        : {
            primary: '#4f46e5',
            primaryLight: '#6366f1',
            secondary: '#9333ea',
            accent: '#0d9488',
            background: '#f8fafc',
            surface: '#ffffff',
            surfaceElevated: '#f1f5f9',
            border: '#e2e8f0',
            textPrimary: '#0f172a',
            textMuted: '#64748b',
            success: '#059669',
            warning: '#d97706',
            error: '#dc2626',
          },
      radius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      shadows: isDark
        ? {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
            glow: '0 0 15px rgba(99, 102, 241, 0.25)',
          }
        : {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            glow: '0 0 15px rgba(79, 70, 229, 0.15)',
          },
      spacingScale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
    };
  }

  /**
   * Directive 14: UX-First Engine
   */
  private designUXJourney(intent: UserIntent): UXJourneyStep[] {
    return [
      {
        stage: 'Entry',
        userAction: 'User accesses platform URL or opens application interface',
        systemResponse: 'Instantly renders shell with zero CLS layout shift; authenticates session in background',
        edgeCases: {
          loading: 'Display skeletal structural frame with brand accent pulsing gently',
          error: 'Unreachable service triggers cached offline view with immediate retry button',
          empty: 'If user has no data, displays guided onboarding card instead of blank screen',
        },
      },
      {
        stage: 'Orientation',
        userAction: 'Views high-density summary metrics and recent activity feeds',
        systemResponse: 'Visual hierarchy highlights critical pending tasks, key KPIs, and system health status',
        edgeCases: {
          loading: 'Individual KPI cards display shimmer micro-placeholders',
          error: 'Failed KPI displays warning pill with manual reload action',
          empty: 'First-time user sees 3-step initialization checklist with progress indicator',
        },
      },
      {
        stage: 'Navigation',
        userAction: 'Selects workflow section via keyboard shortcut or responsive sidebar',
        systemResponse: 'Deep routes update instantaneously; state retained without full-page reloads',
        edgeCases: {
          loading: 'Pre-fetches route assets upon hover for 0ms perceptual latency',
          error: '404 shows helpful back-to-dashboard and search fallback',
          empty: 'Route displays descriptive empty state with primary CTA',
        },
      },
      {
        stage: 'Primary Action',
        userAction: 'Initiates core action (e.g., Create Record, Trigger Orchestrator, Process Payment)',
        systemResponse: 'Opens focused interactive modal/form with keyboard autofocus on primary input',
        edgeCases: {
          loading: 'Form fields disable with spinner during server transmission',
          error: 'Field-level inline validation highlights invalid inputs with exact remediation text',
          empty: 'Inputs pre-populate with sensible defaults to minimize manual typing',
        },
      },
      {
        stage: 'Interaction',
        userAction: 'Modifies values, applies filters, sorts records, or runs bulk operations',
        systemResponse: 'Client applies mutations optimistically; updates data view immediately',
        edgeCases: {
          loading: 'Subtle sync spinner in top indicator bar',
          error: 'If server rejects mutation, automatically rolls back to previous valid state with toast explanation',
          empty: 'Filtered view displays "No matching records found" with "Clear Filters" button',
        },
      },
      {
        stage: 'System Feedback',
        userAction: 'Completes critical operation',
        systemResponse: 'Displays non-blocking contextual toast with undo capability and updates activity log',
        edgeCases: {
          loading: 'Shows progress bar for multi-step background tasks',
          error: 'Error banner provides "Copy diagnostics" and "Retry" actions',
          empty: 'N/A',
        },
      },
      {
        stage: 'Completion',
        userAction: 'Reviews generated artifacts, finalized exports, or committed transactions',
        systemResponse: 'Provides immediate download, webhook trigger, or shareable link with audit log entry',
        edgeCases: {
          loading: 'Generates export stream without freezing UI main thread',
          error: 'Export failure provides direct raw JSON fallback download',
          empty: 'Offers templates to begin the next workflow iteration',
        },
      },
    ];
  }

  /**
   * Directive 20: Database Engine
   */
  private modelDataEntities(intent: UserIntent): DataEntity[] {
    const prompt = intent.rawPrompt.toLowerCase();

    if (prompt.includes('invoice') || prompt.includes('finance')) {
      return [
        {
          name: 'Invoice',
          table: 'invoices',
          description: 'Represents a billing record sent to a customer',
          fields: [
            { name: 'id', type: 'VARCHAR(36)', isPrimary: true },
            { name: 'invoice_number', type: 'VARCHAR(50)', isUnique: true },
            { name: 'customer_id', type: 'VARCHAR(36)', references: 'customers.id' },
            { name: 'amount_cents', type: 'INTEGER' },
            { name: 'currency', type: 'VARCHAR(3)' },
            { name: 'status', type: 'VARCHAR(20)' },
            { name: 'due_date', type: 'TIMESTAMP' },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' },
          ],
          indexes: ['idx_invoices_customer_id', 'idx_invoices_status', 'idx_invoices_due_date'],
        },
        {
          name: 'Customer',
          table: 'customers',
          description: 'Client details and payment profiles',
          fields: [
            { name: 'id', type: 'VARCHAR(36)', isPrimary: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'email', type: 'VARCHAR(255)', isUnique: true },
            { name: 'tax_id', type: 'VARCHAR(50)', isNullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
          ],
          indexes: ['idx_customers_email'],
        },
      ];
    }

    // Universal Veyra Engine entities
    return [
      {
        name: 'Project',
        table: 'projects',
        description: 'Core project workspace metadata and state',
        fields: [
          { name: 'id', type: 'VARCHAR(36)', isPrimary: true },
          { name: 'title', type: 'VARCHAR(255)' },
          { name: 'category', type: 'VARCHAR(50)' },
          { name: 'mode', type: 'VARCHAR(20)' },
          { name: 'status', type: 'VARCHAR(30)' },
          { name: 'created_at', type: 'TIMESTAMP' },
          { name: 'updated_at', type: 'TIMESTAMP' },
        ],
        indexes: ['idx_projects_status', 'idx_projects_category'],
      },
      {
        name: 'OrchestratorTask',
        table: 'orchestrator_tasks',
        description: 'Pipeline task runs with credit consumption tracking',
        fields: [
          { name: 'id', type: 'VARCHAR(36)', isPrimary: true },
          { name: 'project_id', type: 'VARCHAR(36)', references: 'projects.id' },
          { name: 'stage', type: 'VARCHAR(30)' },
          { name: 'tokens_consumed', type: 'INTEGER' },
          { name: 'tool_calls_count', type: 'INTEGER' },
          { name: 'audit_score', type: 'INTEGER' },
          { name: 'completed_at', type: 'TIMESTAMP', isNullable: true },
        ],
        indexes: ['idx_tasks_project_id', 'idx_tasks_stage'],
      },
      {
        name: 'Artifact',
        table: 'artifacts',
        description: 'Produced blueprints, code files, and verification reports',
        fields: [
          { name: 'id', type: 'VARCHAR(36)', isPrimary: true },
          { name: 'task_id', type: 'VARCHAR(36)', references: 'orchestrator_tasks.id' },
          { name: 'filename', type: 'VARCHAR(255)' },
          { name: 'file_type', type: 'VARCHAR(50)' },
          { name: 'checksum', type: 'VARCHAR(64)' },
          { name: 'created_at', type: 'TIMESTAMP' },
        ],
        indexes: ['idx_artifacts_task_id'],
      },
    ];
  }

  /**
   * Directive 21: API Engine
   */
  private designAPIContracts(intent: UserIntent, entities: DataEntity[]): APIEndpoint[] {
    return [
      {
        method: 'GET',
        path: '/api/v1/projects',
        summary: 'List all managed applications with status, credit usage, and audit scores',
        authRequired: true,
        rbacRole: 'developer',
        responseStatus: 200,
        responsePayloadExample: {
          data: [{ id: 'proj_01', title: 'Ledger Flow', mode: 'production', status: 'VERIFIED' }],
          total: 1,
        },
      },
      {
        method: 'POST',
        path: '/api/v1/orchestrator/pipeline',
        summary: 'Execute autonomous Understand → Architect → Build → Verify lifecycle',
        authRequired: true,
        rbacRole: 'developer',
        requestBodySchema: {
          prompt: 'string (min 5 chars)',
          mode: 'concept | prototype | mvp | production',
        },
        responseStatus: 201,
        responsePayloadExample: {
          executionId: 'exec_88392',
          status: 'COMPLETED',
          auditScore: 98,
          creditsSavedTokens: 4200,
        },
      },
      {
        method: 'GET',
        path: '/api/v1/artifacts/:id/download',
        summary: 'Download verified production-ready project bundle and test reports',
        authRequired: true,
        responseStatus: 200,
        responsePayloadExample: {
          downloadUrl: 'https://veyra.engine/bundles/exec_88392.zip',
          checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        },
      },
      {
        method: 'POST',
        path: '/api/v1/qa/verify',
        summary: 'Execute multi-vector verification suite against specified codebase or endpoint',
        authRequired: true,
        rbacRole: 'admin',
        requestBodySchema: {
          targetPath: 'string',
          vectors: 'string[]',
        },
        responseStatus: 200,
        responsePayloadExample: {
          passed: true,
          vulnerabilitiesCount: 0,
          performanceScore: 99,
          a11yIssues: 0,
        },
      },
    ];
  }

  /**
   * Directive 9: Dependency Decision Engine
   */
  private evaluateDependencies(intent: UserIntent, techStack: TechDecision[]) {
    return [
      {
        name: 'lucide-react',
        version: '^1.16.0',
        reason: 'Accessible, tree-shakable SVG icon system with zero runtime DOM overhead.',
        sizeCost: '~18kB gzipped',
      },
      {
        name: 'clsx + tailwind-merge',
        version: '^2.1.1',
        reason: 'Deterministic CSS class composition, preventing duplicate and conflicting utility classes.',
        sizeCost: '~2.8kB gzipped',
      },
    ];
  }
}
