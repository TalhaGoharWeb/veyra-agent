/**
 * VEYRA AGENT - PRESET APP TEMPLATES
 * Ready-to-orchestrate presets across major software archetypes
 */

export interface PresetApp {
  id: string;
  name: string;
  category: string;
  tagline: string;
  prompt: string;
  suggestedMode: 'concept' | 'prototype' | 'mvp' | 'production';
  highlights: string[];
}

export const PRESET_APPS: PresetApp[] = [
  {
    id: 'veyra-orchestrator',
    name: 'Universal Agent Orchestration Engine',
    category: 'Developer Platform',
    tagline: 'Multi-stage autonomous pipeline for understanding, architecting, building, and verifying software.',
    prompt: 'Build an autonomous agent orchestrator that takes user requests through deep intent analysis, architectural decisions, code synthesis, and multi-vector verification without burning unnecessary credits.',
    suggestedMode: 'production',
    highlights: ['Credit Economy Controller', 'Multi-Vector QA Engine', 'Anti-Loop Guardrails'],
  },
  {
    id: 'saas-billing',
    name: 'FinTech Invoicing & Subscription Engine',
    category: 'FinTech / SaaS',
    tagline: 'High-precision invoicing, multi-currency ledger, and real-time subscription lifecycle management.',
    prompt: 'Build a production-grade invoicing and payment reconciliation hub with customer credit tracking, automated status reconciliation, PDF receipts, and audit trails.',
    suggestedMode: 'production',
    highlights: ['Strict Relational Ledger', 'Server RBAC Authorization', 'Optimistic Reconciliation'],
  },
  {
    id: 'kanban-flow',
    name: 'Real-time Project & Sprint Flow',
    category: 'Productivity',
    tagline: 'Responsive task orchestration with optimistic drag updates, sprint metrics, and team collaboration.',
    prompt: 'Build a modern collaborative task management system with sprint boards, custom status pipelines, latency-free optimistic state mutations, and team activity logs.',
    suggestedMode: 'mvp',
    highlights: ['Sub-10ms UI Updates', 'Rollback-Safe State Store', 'Zero Generic AI Clutter'],
  },
  {
    id: 'ecommerce-fulfillment',
    name: 'Distributed Commerce & Inventory Center',
    category: 'E-Commerce',
    tagline: 'Order processing engine with real-time stock alerts, cart reconciliation, and fulfillment status.',
    prompt: 'Build an e-commerce fulfillment and catalog operations platform with inventory reservations, order tracking, responsive search filtering, and safe transaction commits.',
    suggestedMode: 'production',
    highlights: ['ACID-Safe Cart Operations', 'Instant Search & Filter', 'Responsive Multi-Device Layout'],
  },
];
