// Minimal Tiptap AI Extension using Vercel AI SDK (or fetch)
// Only supports: accept/reject, prompt with text, prompt with editor context

import { Extension } from "@tiptap/core";
import { Editor } from "@tiptap/react";

/**
 * Extend the existing 'ai' commands interface to include our minimal commands.
 * Only add new commands to avoid type conflicts and duplicates.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    _ai: {
      aiPrompt?: (text: string) => ReturnType;
      aiPromptWithContext?: (text: string) => ReturnType;
      aiAccept?: () => ReturnType;
      aiReject?: () => ReturnType;
    };
  }
}

type AiState =
  | { status: "idle"; response?: string }
  | { status: "loading"; response?: string }
  | { status: "error"; error: Error }
  | { status: "ready"; response: string };

export interface AIStorage {
  ai: AiState;
}

export interface AIOptions {
  endpoint?: string; // e.g. '/api/ai/stream'
}

export const AI = Extension.create<AIOptions, AIStorage>({
  name: "ai",

  addStorage() {
    return {
      ai: { status: "idle" } as AiState,
    };
  },

  addCommands() {
    return {
      // Prompt with user text only
      aiPrompt:
        (text: string) =>
        ({ editor }: { editor: Editor }) => {
          if (!text?.trim()) return false;
          this.storage.ai = { status: "loading" };
          const endpoint = this.options.endpoint || "/api/ai/stream";
          // Fire async request, don't return Promise
          (async () => {
            try {
              const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text }),
              });
              if (!res.ok) throw new Error("AI request failed");
              const data = await res.json();
              this.storage.ai = {
                status: "ready",
                response: data.result || data.response || "",
              };
            } catch (error: unknown) {
              const err =
                error instanceof Error ? error : new Error(String(error));
              this.storage.ai = { status: "error", error: err };
            }
          })();
          return true;
        },

      // Prompt with all editor context + user text
      aiPromptWithContext:
        (text: string) =>
        ({ editor }: { editor: Editor }) => {
          const context = editor.getHTML();
          const prompt = `${context}\n\n${text}`;
          this.storage.ai = { status: "loading" };
          const endpoint = this.options.endpoint || "/api/ai/stream";
          (async () => {
            try {
              const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
              });
              if (!res.ok) throw new Error("AI request failed");
              const data = await res.json();
              this.storage.ai = {
                status: "ready",
                response: data.result || data.response || "",
              };
            } catch (error: unknown) {
              const err =
                error instanceof Error ? error : new Error(String(error));
              this.storage.ai = { status: "error", error: err };
            }
          })();
          return true;
        },

      // Accept: insert AI response at current selection
      aiAccept:
        () =>
        ({ editor }: { editor: Editor }) => {
          if (this.storage.ai.status !== "ready" || !this.storage.ai.response)
            return false;
          editor.commands.insertContent(this.storage.ai.response);
          this.storage.ai = { status: "idle" };
          return true;
        },

      // Reject: clear AI response
      aiReject: () => () => {
        this.storage.ai = { status: "idle" };
        return true;
      },
    };
  },
});

export default AI;
