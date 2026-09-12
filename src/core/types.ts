/**
 * VEYRA AGENT - CORE TYPE DEFINITIONS
 * Universal Vibe Coding Orchestrator
 * INTENT-DRIVEN • RESOURCE-AWARE • CREDIT-EFFICIENT • FULL-STACK • PRODUCTION-READY
 */

export type ProjectMode = 'concept' | 'prototype' | 'mvp' | 'production';

export type RequestCategory = 
  | 'NEW PRODUCT'
  | 'NEW WEBSITE'
  | 'NEW APP'
  | 'NEW FEATURE'
  | 'BUG FIX'
  | 'UI IMPROVEMENT'
  | 'UX IMPROVEMENT'
  | 'REFACTOR'
  | 'PERFORMANCE OPTIMIZATION'
  | 'SECURITY FIX'
  | 'DATABASE CHANGE'
  | 'API CHANGE'
  | 'INTEGRATION'
  | 'MIGRATION'
  | 'DESIGN IMPLEMENTATION'
  | 'RESPONSIVE FIX'
  | 'ACCESSIBILITY FIX'
  | 'SEO IMPROVEMENT'
  | 'CONTENT SYSTEM'
  | 'AUTOMATION'
  | 'DEPLOYMENT'
  | 'RESEARCH / PLANNING';

export interface UserIntent {
  rawPrompt: string;
  category: RequestCategory;
  mode: ProjectMode;
  goal: string;
  targetUsers: string[];
  coreProblem: string;
  primaryWorkflows: string[];
  contentRequirements: string[];
  dataEntities: string[];
  businessLogicRules: string[];
  uxPhilosophy: string;
  uiRequirements: {
    theme: 'dark' | 'light' | 'adaptive';
    paletteStyle: string;
    density: 'compact' | 'comfortable' | 'spacious';
    motionIntensity: 'minimal' | 'smooth' | 'rich';
  };
  technicalConstraints: string[];
  successCriteria: string[];
  inferredDefaults: Record<string, string>;
  clarificationBudgetStatus: 'RESOLVED_AUTONOMOUSLY' | 'MINIMAL_QUERY_NEEDED';
}

export interface DecisionFactor {
  name: string;
  score: number; // 1-10
  priority: 'Critical' | 'Very High' | 'High' | 'Medium';
  notes: string;
}

export interface TechDecision {
  category: 'Frontend' | 'Backend' | 'Database' | 'Styling' | 'State' | 'Deployment' | 'Auth';
  selected: string;
  rationale: string;
  alternativeConsidered: string;
  justificationScore: number;
}

export interface UXJourneyStep {
  stage: 'Entry' | 'Orientation' | 'Navigation' | 'Primary Action' | 'Interaction' | 'System Feedback' | 'Completion';
  userAction: string;
  systemResponse: string;
  edgeCases: {
    loading: string;
    error: string;
    empty: string;
    permissionDenied?: string;
    networkFailure?: string;
  };
}

export interface DesignTokenSet {
  typography: {
    headingFont: string;
    bodyFont: string;
    monoFont: string;
    scale: Record<string, string>;
  };
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceElevated: string;
    border: string;
    textPrimary: string;
    textMuted: string;
    success: string;
    warning: string;
    error: string;
  };
  radius: Record<string, string>;
  shadows: Record<string, string>;
  spacingScale: number[];
}

export interface EntityField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  references?: string;
}

export interface DataEntity {
  name: string;
  table: string;
  description: string;
  fields: EntityField[];
  indexes: string[];
}

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  authRequired: boolean;
  rbacRole?: string;
  requestBodySchema?: Record<string, string>;
  responseStatus: number;
  responsePayloadExample: Record<string, any>;
}

export interface ArchitectureBlueprint {
  productName: string;
  tagline: string;
  techStack: TechDecision[];
  designTokens: DesignTokenSet;
  uxJourney: UXJourneyStep[];
  dataEntities: DataEntity[];
  apiEndpoints: APIEndpoint[];
  dependencyJustifications: {
    name: string;
    version: string;
    reason: string;
    sizeCost: string;
  }[];
  stateMachine: {
    initial: string;
    states: string[];
  };
}

export interface GeneratedFile {
  path: string;
  language: string;
  purpose: string;
  content: string;
  isExecutable: boolean;
  sizeBytes: number;
}

export interface BuildOutput {
  files: GeneratedFile[];
  summary: string;
  realFunctionalityChecks: {
    hasRealDataFlow: boolean;
    hasProperErrorBoundaries: boolean;
    zeroMockSleepTimers: boolean;
    validatedServerEnforcement: boolean;
  };
}

export interface QACheckResult {
  category: 'Functional' | 'Integration' | 'Visual QA' | 'Security' | 'Performance' | 'Accessibility' | 'Regression' | 'Code Quality';
  name: string;
  passed: boolean;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  detail: string;
  remedyAction?: string;
}

export interface FinalDeliveryReport {
  timestamp: string;
  whatWasBuilt: string;
  keyTechnicalDecisions: string[];
  resourcesUsed: string[];
  dependenciesAdded: string[];
  qaResults: QACheckResult[];
  overallHealthScore: number; // 0-100
  complianceSummary: {
    realFunctionalityRate: number;
    securityAuditPassed: boolean;
    a11yStandard: string;
    antiGenericScore: number;
  };
  knownLimitations: string[];
  nextActions: string[];
  creditsSaved: {
    tokensConservedEstimate: number;
    redundantToolCallsPrevented: number;
    loopsBreached: number;
  };
}

export interface OrchestrationState {
  currentStage: 'idle' | 'understanding' | 'architecting' | 'building' | 'verifying' | 'completed';
  stageProgress: number; // 0 - 100
  intent: UserIntent | null;
  blueprint: ArchitectureBlueprint | null;
  build: BuildOutput | null;
  report: FinalDeliveryReport | null;
  creditTracker: {
    tokensUsed: number;
    toolCallsMade: number;
    creditsEstimated: number;
    efficiencyRatio: number;
  };
  logs: Array<{
    id: string;
    timestamp: string;
    engine: string;
    message: string;
    level: 'info' | 'success' | 'warn' | 'decision';
  }>;
}
