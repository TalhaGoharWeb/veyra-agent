/**
 * VEYRA AGENT - CREDIT ECONOMY & ANTI-LOOP ENGINE
 * Directive 10: Credit Economy Engine
 * Directive 11: Tool Call Decision Engine
 * Directive 48: Resource-Aware Development
 * Directive 49: Anti-Loop Protection
 */

export interface ToolEvaluationRequest {
  toolName: string;
  operation: string;
  purpose: string;
  isInformationCached: boolean;
  canCombineWithPrevious: boolean;
  expectedDecisionImpact: string;
}

export interface ToolEvaluationDecision {
  allowed: boolean;
  reason: string;
  creditCostTokens: number;
  expectedValue: 'CRITICAL' | 'HIGH' | 'LOW' | 'ZERO_WASTE';
}

export class CreditEconomyController {
  private tokensUsed: number = 0;
  private toolCallsCount: number = 0;
  private redundantCallsBlocked: number = 0;
  private memoryCache: Map<string, any> = new Map();
  private recentOperations: Array<{ op: string; hash: string; timestamp: number }> = [];

  private tokenBudgetLimit: number;
  private toolCallBudgetLimit: number;

  constructor(tokenBudgetLimit: number = 100000, toolCallBudgetLimit: number = 50) {
    this.tokenBudgetLimit = tokenBudgetLimit;
    this.toolCallBudgetLimit = toolCallBudgetLimit;
  }

  /**
   * Directive 11: Tool Call Decision Engine
   * Internally evaluates whether an expensive tool operation should proceed
   */
  public evaluateToolCall(request: ToolEvaluationRequest): ToolEvaluationDecision {
    // Check if information is already cached or previously inspected
    if (request.isInformationCached) {
      this.redundantCallsBlocked++;
      return {
        allowed: false,
        reason: `Directive 14 Violation Avoided: "${request.operation}" is already available in working memory. Reused without token burn.`,
        creditCostTokens: 0,
        expectedValue: 'ZERO_WASTE',
      };
    }

    // Directive 49: Anti-Loop Protection
    const opKey = `${request.toolName}:${request.operation}`;
    const recentIdentical = this.recentOperations.filter(
      (entry) => entry.hash === opKey && Date.now() - entry.timestamp < 60000
    );

    if (recentIdentical.length >= 2) {
      this.redundantCallsBlocked++;
      return {
        allowed: false,
        reason: `Directive 49 Anti-Loop Tripped: Repetitive cycle detected for "${request.operation}". Halting wasteful loop.`,
        creditCostTokens: 0,
        expectedValue: 'ZERO_WASTE',
      };
    }

    // Record operation
    this.recentOperations.push({ op: request.operation, hash: opKey, timestamp: Date.now() });
    this.toolCallsCount++;
    const estimatedCost = this.estimateCost(request.toolName);
    this.tokensUsed += estimatedCost;

    return {
      allowed: true,
      reason: `Tool call justified: High impact on decision '${request.expectedDecisionImpact}'.`,
      creditCostTokens: estimatedCost,
      expectedValue: 'HIGH',
    };
  }

  private estimateCost(toolName: string): number {
    switch (toolName.toLowerCase()) {
      case 'browser_subagent':
      case 'visual_qa':
        return 2800;
      case 'run_command':
        return 900;
      case 'view_file':
      case 'read_url':
        return 450;
      default:
        return 300;
    }
  }

  public getMetrics() {
    const efficiencyRatio = Number(
      ((this.redundantCallsBlocked * 1200 + this.tokensUsed) / Math.max(1, this.tokensUsed)).toFixed(2)
    );

    return {
      tokensUsed: this.tokensUsed,
      toolCallsMade: this.toolCallsCount,
      redundantCallsPrevented: this.redundantCallsBlocked,
      estimatedCreditsConservedTokens: this.redundantCallsBlocked * 1400,
      efficiencyRatio: Math.max(1.0, efficiencyRatio),
    };
  }

  public reset() {
    this.tokensUsed = 0;
    this.toolCallsCount = 0;
    this.redundantCallsBlocked = 0;
    this.memoryCache.clear();
    this.recentOperations = [];
  }
}
