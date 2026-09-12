/**
 * VEYRA AGENT - MASTER ORCHESTRATION PIPELINE
 * Directive 2: Universal Execution Pipeline
 * Directive 53: Universal Decision Algorithm
 * Directive 55: Final Directive
 */

import { IntentEngine } from './intent-engine.ts';
import { ArchitectEngine } from './architect-engine.ts';
import { BuildEngine } from './build-engine.ts';
import { VerifyEngine } from './verify-engine.ts';
import { CreditEconomyController } from './credit-economy.ts';
import type { OrchestrationState, ProjectMode, UserIntent, ArchitectureBlueprint, BuildOutput, FinalDeliveryReport } from './types.ts';

export class VeyraOrchestrator {
  private intentEngine: IntentEngine;
  private architectEngine: ArchitectEngine;
  private buildEngine: BuildEngine;
  private verifyEngine: VerifyEngine;
  private creditController: CreditEconomyController;

  constructor() {
    this.intentEngine = new IntentEngine();
    this.architectEngine = new ArchitectEngine();
    this.buildEngine = new BuildEngine();
    this.verifyEngine = new VerifyEngine();
    this.creditController = new CreditEconomyController();
  }

  /**
   * Directive 2 & 53: Executes full lifecycle with credit consciousness
   */
  public async executePipeline(
    prompt: string,
    mode: ProjectMode = 'production',
    onProgress?: (state: Partial<OrchestrationState>) => void
  ): Promise<{
    intent: UserIntent;
    blueprint: ArchitectureBlueprint;
    build: BuildOutput;
    report: FinalDeliveryReport;
    creditMetrics: any;
  }> {
    this.creditController.reset();

    // 1. UNDERSTAND (Directives 1, 3, 4, 37, 38)
    onProgress?.({
      currentStage: 'understanding',
      stageProgress: 25,
      logs: [{
        id: 'log_1',
        timestamp: new Date().toLocaleTimeString(),
        engine: 'IntentEngine',
        message: 'Normalizing intent: Extracting goal, workflows, data entities, and business constraints...',
        level: 'info'
      }]
    });

    const toolEval1 = this.creditController.evaluateToolCall({
      toolName: 'intent_normalization',
      operation: 'parse_semantics',
      purpose: 'Extract business rules and domain model',
      isInformationCached: false,
      canCombineWithPrevious: false,
      expectedDecisionImpact: 'Determines full architectural scope'
    });

    const intent = this.intentEngine.analyze(prompt, mode);

    // 2. ARCHITECT (Directives 7, 14, 15, 16, 20, 21, 33)
    onProgress?.({
      currentStage: 'architecting',
      stageProgress: 50,
      intent,
      logs: [{
        id: 'log_2',
        timestamp: new Date().toLocaleTimeString(),
        engine: 'ArchitectEngine',
        message: 'Synthesizing architecture: Tech stack scoring matrix, UX flows, schema, and API contracts...',
        level: 'decision'
      }]
    });

    this.creditController.evaluateToolCall({
      toolName: 'architectural_synthesis',
      operation: 'generate_blueprint',
      purpose: 'Generate complete schema, endpoints, and UX journeys',
      isInformationCached: false,
      canCombineWithPrevious: true,
      expectedDecisionImpact: 'Locks component boundaries and API contracts'
    });

    const blueprint = this.architectEngine.architect(intent);

    // 3. BUILD (Directives 18, 19, 22, 23, 24, 44, 45)
    onProgress?.({
      currentStage: 'building',
      stageProgress: 75,
      blueprint,
      logs: [{
        id: 'log_3',
        timestamp: new Date().toLocaleTimeString(),
        engine: 'BuildEngine',
        message: 'Synthesizing production source code: Enforcing Real-Functionality Rule & Anti-Generic UI standard...',
        level: 'info'
      }]
    });

    this.creditController.evaluateToolCall({
      toolName: 'build_synthesizer',
      operation: 'generate_code_artifacts',
      purpose: 'Write database schema, typed store, API routes, and components',
      isInformationCached: false,
      canCombineWithPrevious: true,
      expectedDecisionImpact: 'Produces deployable source code'
    });

    const build = this.buildEngine.build(intent, blueprint);

    // 4. VERIFY (Directives 30, 31, 50, 51, 52)
    onProgress?.({
      currentStage: 'verifying',
      stageProgress: 90,
      build,
      logs: [{
        id: 'log_4',
        timestamp: new Date().toLocaleTimeString(),
        engine: 'VerifyEngine',
        message: 'Running multi-vector QA: Functional, Security, A11y, Performance, and Regression check...',
        level: 'info'
      }]
    });

    this.creditController.evaluateToolCall({
      toolName: 'qa_verification',
      operation: 'multi_vector_audit',
      purpose: 'Run audit across 6 vectors and evaluate stop condition',
      isInformationCached: false,
      canCombineWithPrevious: true,
      expectedDecisionImpact: 'Certifies production readiness'
    });

    const report = this.verifyEngine.verify(intent, blueprint, build, this.creditController);
    const creditMetrics = this.creditController.getMetrics();

    onProgress?.({
      currentStage: 'completed',
      stageProgress: 100,
      report,
      creditTracker: {
        tokensUsed: creditMetrics.tokensUsed,
        toolCallsMade: creditMetrics.toolCallsMade,
        creditsEstimated: creditMetrics.estimatedCreditsConservedTokens,
        efficiencyRatio: creditMetrics.efficiencyRatio
      },
      logs: [{
        id: 'log_5',
        timestamp: new Date().toLocaleTimeString(),
        engine: 'VerifyEngine',
        message: `Delivery Complete! Health Score: ${report.overallHealthScore}/100 • Credits conserved: ~${creditMetrics.estimatedCreditsConservedTokens} tokens.`,
        level: 'success'
      }]
    });

    return {
      intent,
      blueprint,
      build,
      report,
      creditMetrics,
    };
  }

  public getCreditController() {
    return this.creditController;
  }
}
