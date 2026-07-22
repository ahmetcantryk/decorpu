// WebMCP (Web Model Context Protocol) — Lighthouse "Agentic Browsing" denetimleri.
// 1) Bildirimsel form ek açıklamaları: toolname/tooldescription/toolparamdescription
// 2) document.modelContext.registerTool imperatif API'si (Chrome origin trial)

import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }
  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

interface WebMcpToolResult {
  content: { type: "text"; text: string }[];
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<WebMcpToolResult> | WebMcpToolResult;
}

interface ModelContext {
  registerTool?: (tool: WebMcpTool, opts?: { signal?: AbortSignal }) => Promise<void> | void;
  provideContext?: (ctx: { tools: WebMcpTool[] }) => Promise<void> | void;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export {};
