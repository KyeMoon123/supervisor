import type { AiStreamRequest } from "@/shared/api-interface/ai";
import { useCallback, useState } from "react";

interface StreamChunk {
  chunk: string;
  accumulated: string;
}

export function useAiStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [accumulatedText, setAccumulatedText] = useState("");

  /**
   * Stream AI response with a callback for each chunk
   * This allows the consumer to handle chunks however they want (editor insertion, display, etc.)
   */
  const streamWithCallback = useCallback(
    async (
      props: AiStreamRequest,
      onChunk: (data: StreamChunk) => void | Promise<void>
    ): Promise<string> => {
      const { prompt, context, action, selection } = props;
      if (!prompt) throw new Error("Prompt is required");

      setIsStreaming(true);
      setAccumulatedText("");

      const params = new URLSearchParams({ prompt });
      if (context) params.append("context", context);
      if (action) params.append("action", action);
      if (selection) params.append("selection", selection);

      try {
        const response = await fetch(`/api/ai/stream?${params.toString()}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Stream request failed: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          setAccumulatedText(buffer);

          // Call the chunk handler
          await onChunk({ chunk, accumulated: buffer });
        }

        setIsStreaming(false);
        return buffer;
      } catch (error) {
        setIsStreaming(false);
        setAccumulatedText("");
        throw error;
      }
    },
    []
  );

  /**
   * Get an async generator that yields chunks as they arrive
   * This allows for-await-of loops: for await (const chunk of stream()) { ... }
   */
  const streamAsGenerator = useCallback(async function* (
    props: AiStreamRequest
  ): AsyncGenerator<StreamChunk, string, unknown> {
    const { prompt, context, action, selection } = props;
    if (!prompt) throw new Error("Prompt is required");

    setIsStreaming(true);
    setAccumulatedText("");

    const params = new URLSearchParams({ prompt });
    if (context) params.append("context", context);
    if (action) params.append("action", action);
    if (selection) params.append("selection", selection);
    try {
      const response = await fetch(`/api/ai/stream?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Stream request failed: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        setAccumulatedText(buffer);

        yield { chunk, accumulated: buffer };
      }

      setIsStreaming(false);
      return buffer;
    } catch (error) {
      setIsStreaming(false);
      setAccumulatedText("");
      throw error;
    }
  },
  []);

  /**
   * Simple stream that just accumulates text (original behavior)
   */
  const stream = useCallback(
    async (props: AiStreamRequest): Promise<string> => {
      return streamWithCallback(props, () => {});
    },
    [streamWithCallback]
  );

  return {
    isStreaming,
    accumulatedText,
    stream,
    streamWithCallback,
    streamAsGenerator,
  };
}
