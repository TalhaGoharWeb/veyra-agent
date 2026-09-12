/**
 * VEYRA AGENT - INTENT & CLASSIFICATION ENGINE
 * Directives 1, 3, 4, 37, 38, 40
 */

import type { UserIntent, RequestCategory, ProjectMode } from './types.ts';

export class IntentEngine {
  /**
   * Understands deep intent from raw prompt, eliminating discrepancies between
   * what the user says vs what the user actually needs.
   */
  public analyze(rawPrompt: string, requestedMode?: ProjectMode): UserIntent {
    const text = rawPrompt.trim();
    const lower = text.toLowerCase();

    // 1. Classification Engine
    const category = this.classifyRequest(lower);

    // 2. Mode Detection (Concept / Prototype / MVP / Production)
    const mode = requestedMode || this.detectMode(lower);

    // 3. Goal Extraction
    const goal = this.extractGoal(text);

    // 4. Target Users
    const targetUsers = this.extractUsers(lower);

    // 5. Core Problem
    const coreProblem = this.extractProblem(text, lower);

    // 6. Primary Workflows
    const primaryWorkflows = this.extractWorkflows(lower);

    // 7. Data Entities
    const dataEntities = this.extractDataEntities(lower);

    // 8. Business Logic Rules
    const businessLogicRules = this.extractBusinessRules(lower);

    // 9. UI & UX Requirements
    const uiRequirements = this.extractUIRequirements(lower);

    // 10. Technical Constraints
    const technicalConstraints = this.extractConstraints(lower);

    // 11. Success Criteria
    const successCriteria = [
      `Complete functional workflow without placeholders or mock timeouts`,
      `Verified responsive UX across Desktop, Tablet, and Mobile`,
      `Zero security vulnerabilities (XSS, client-side auth leaks, injection)`,
      `Sub-100ms UI state transitions with predictable error recovery`,
    ];

    // 12. Inferred Defaults (Clarification Budget optimization)
    const inferredDefaults = {
      theme: uiRequirements.theme,
      authMethod: lower.includes('auth') || lower.includes('login') ? 'JWT / Cookie Session with RBAC' : 'Local Workspace Session',
      persistence: lower.includes('postgres') ? 'PostgreSQL via Prisma' : lower.includes('sqlite') ? 'SQLite' : 'Modern IndexedDB / LocalStorage with REST/Server sync',
      styling: 'Vanilla CSS / Modern Design Tokens (Anti-Generic UI)',
    };

    return {
      rawPrompt: text,
      category,
      mode,
      goal,
      targetUsers,
      coreProblem,
      primaryWorkflows,
      contentRequirements: [
        'Structured dashboard summaries',
        'Actionable records table with sorting/filters',
        'Stateful forms with immediate inline validation',
        'Contextual error banners and recovery actions',
      ],
      dataEntities,
      businessLogicRules,
      uxPhilosophy: 'Progressive disclosure, direct manipulation, instant feedback, graceful offline/error fallback',
      uiRequirements,
      technicalConstraints,
      successCriteria,
      inferredDefaults,
      clarificationBudgetStatus: 'RESOLVED_AUTONOMOUSLY',
    };
  }

  private classifyRequest(lower: string): RequestCategory {
    if (lower.includes('fix') || lower.includes('bug') || lower.includes('broken')) return 'BUG FIX';
    if (lower.includes('perf') || lower.includes('speed') || lower.includes('slow')) return 'PERFORMANCE OPTIMIZATION';
    if (lower.includes('refactor') || lower.includes('clean up')) return 'REFACTOR';
    if (lower.includes('security') || lower.includes('auth leak')) return 'SECURITY FIX';
    if (lower.includes('database') || lower.includes('migration') || lower.includes('schema')) return 'DATABASE CHANGE';
    if (lower.includes('api') || lower.includes('endpoint')) return 'API CHANGE';
    if (lower.includes('responsive') || lower.includes('mobile layout')) return 'RESPONSIVE FIX';
    if (lower.includes('accessibility') || lower.includes('a11y')) return 'ACCESSIBILITY FIX';
    if (lower.includes('feature') || lower.includes('add to')) return 'NEW FEATURE';
    if (lower.includes('website') || lower.includes('landing')) return 'NEW WEBSITE';
    if (lower.includes('app') || lower.includes('saas') || lower.includes('tool') || lower.includes('software')) return 'NEW APP';
    return 'NEW PRODUCT';
  }

  private detectMode(lower: string): ProjectMode {
    if (lower.includes('production') || lower.includes('enterprise') || lower.includes('deploy')) return 'production';
    if (lower.includes('mvp') || lower.includes('launch')) return 'mvp';
    if (lower.includes('prototype') || lower.includes('quick demo')) return 'prototype';
    if (lower.includes('concept') || lower.includes('wireframe')) return 'concept';
    return 'production'; // Directive: Default to high quality production standard
  }

  private extractGoal(text: string): string {
    const cleaned = text.replace(/^(build|create|make|develop|generate)\s+/i, '');
    return `Deliver an autonomous, production-ready solution for: ${cleaned.slice(0, 120)}`;
  }

  private extractUsers(lower: string): string[] {
    const users: string[] = ['End Consumers', 'Team Administrators'];
    if (lower.includes('dev') || lower.includes('coder') || lower.includes('engineer')) users.push('Software Engineers');
    if (lower.includes('manager') || lower.includes('lead')) users.push('Project Managers');
    if (lower.includes('customer') || lower.includes('client')) users.push('Clients / Customers');
    if (lower.includes('ecommerce') || lower.includes('shop') || lower.includes('store')) users.push('Shoppers & Store Admins');
    return users;
  }

  private extractProblem(text: string, lower: string): string {
    if (lower.includes('task') || lower.includes('todo') || lower.includes('kanban')) {
      return 'Fragmented task coordination, lack of real-time status visibility, and complex project tracking friction.';
    }
    if (lower.includes('finance') || lower.includes('invoice') || lower.includes('payment') || lower.includes('crypto')) {
      return 'Disjointed financial tracking, error-prone manual calculations, and lack of immediate reconciliation audit trails.';
    }
    if (lower.includes('ai') || lower.includes('agent') || lower.includes('orchestrat')) {
      return 'Excessive tool-call token burn, fragile LLM workflows, superficial fake mockups, and chaotic state handoffs.';
    }
    return `Addressing critical workflow friction and operational gaps in: ${text.slice(0, 80)}...`;
  }

  private extractWorkflows(lower: string): string[] {
    const workflows = [
      'Account / Workspace Initialization & Configuration',
      'Entity Creation, Real-time Validation & Persistence',
      'Interactive Filtering, Sorting, and Semantic Search',
      'State Transitions with Optimistic UI & Server Reconciliation',
      'Audit Logging & Exportable Reporting',
    ];
    if (lower.includes('auth') || lower.includes('user')) {
      workflows.unshift('Secure User Authentication, Session Persistence & RBAC Guard');
    }
    return workflows;
  }

  private extractDataEntities(lower: string): string[] {
    const entities = ['User', 'Workspace', 'ActivityLog'];
    if (lower.includes('invoice') || lower.includes('finance')) {
      entities.push('Invoice', 'Customer', 'PaymentTransaction', 'LedgerItem');
    } else if (lower.includes('ecommerce') || lower.includes('shop')) {
      entities.push('Product', 'Category', 'Order', 'CartItem', 'Customer');
    } else if (lower.includes('task') || lower.includes('project')) {
      entities.push('Project', 'TaskItem', 'BoardColumn', 'Tag', 'Comment');
    } else if (lower.includes('agent') || lower.includes('code')) {
      entities.push('AgentSession', 'TaskExecution', 'Artifact', 'CreditLog', 'DiagnosticReport');
    } else {
      entities.push('CoreRecord', 'Metadata', 'EventStream');
    }
    return entities;
  }

  private extractBusinessRules(lower: string): string[] {
    return [
      'Immutable primary keys and server-validated cryptographic audit timestamps',
      'Server-side authorization enforced at the API barrier (Frontend controls never relied on for security)',
      'Real-time client validation paired with idempotent backend handlers',
      'Optimistic mutations must rollback cleanly if network or server validation fails',
      'Rate-limiting and sanitization applied to all incoming mutation payloads',
    ];
  }

  private extractUIRequirements(lower: string) {
    return {
      theme: (lower.includes('light') ? 'light' : 'dark') as 'dark' | 'light' | 'adaptive',
      paletteStyle: 'High-contrast Cyber/SaaS Slate & Indigo with intentional neon accents',
      density: 'comfortable' as const,
      motionIntensity: 'smooth' as const,
    };
  }

  private extractConstraints(lower: string): string[] {
    return [
      'Strict adherence to Directive 24: Zero fake data, zero mock timeouts',
      'Directive 16: Zero meaningless generic AI UI (no random gradients or useless floating blobs)',
      'Sub-50ms interaction response latency',
      'Complete testability and offline resilience where applicable',
    ];
  }
}
