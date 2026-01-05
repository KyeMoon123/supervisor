# useAiStream Hook - Usage Examples

The refactored `useAiStream` hook provides three flexible ways to consume AI streaming responses, keeping it completely editor-agnostic and reusable.

## Available Methods

1. **`stream`** - Simple promise-based streaming (original behavior)
2. **`streamWithCallback`** - Stream with callback for each chunk
3. **`streamAsGenerator`** - Async generator for for-await-of loops

## Examples

### 1. Simple Stream (Promise-based)

Just get the final accumulated text:

```tsx
import { useAiStream } from "@/client/hooks/use-ai-steam";

function MyComponent() {
  const { stream, isStreaming, accumulatedText } = useAiStream();

  const handleGenerate = async () => {
    const result = await stream({
      prompt: "Write a story about a robot",
      context: "Science fiction setting",
    });
    
    console.log("Final result:", result);
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={isStreaming}>
        Generate
      </button>
      {isStreaming && <p>Streaming: {accumulatedText}</p>}
    </div>
  );
}
```

### 2. Stream with Callback

Handle each chunk as it arrives (perfect for inserting into an editor):

```tsx
import { useAiStream } from "@/client/hooks/use-ai-steam";
import { useEditor } from "@tiptap/react";

function EditorComponent() {
  const editor = useEditor({ ... });
  const { streamWithCallback, isStreaming } = useAiStream();

  const handleInsertAI = async () => {
    const startPos = editor.state.selection.to;
    let currentPos = startPos;

    const result = await streamWithCallback(
      {
        prompt: "Continue writing",
        context: editor.getText(),
      },
      ({ chunk, accumulated }) => {
        // Insert each chunk at the current position
        editor.commands.insertContentAt(currentPos, chunk);
        currentPos += chunk.length;
        
        // Or do something else with the chunk
        console.log("New chunk:", chunk);
        console.log("Total so far:", accumulated);
      }
    );

    console.log("Stream complete:", result);
  };

  return <button onClick={handleInsertAI}>Insert AI</button>;
}
```

### 3. Async Generator (for-await-of)

Most flexible - use in async functions with for-await-of loops:

```tsx
import { useAiStream } from "@/client/hooks/use-ai-steam";

function AdvancedComponent() {
  const { streamAsGenerator, isStreaming } = useAiStream();

  const handleStream = async () => {
    const generator = streamAsGenerator({
      prompt: "Explain quantum computing",
    });

    for await (const { chunk, accumulated } of generator) {
      console.log("Chunk:", chunk);
      console.log("Accumulated:", accumulated);
      
      // Do anything with each chunk:
      // - Insert into editor
      // - Update UI
      // - Send to analytics
      // - etc.
    }

    // The generator returns the final result
    const final = await generator.next();
    console.log("Final:", final.value);
  };

  return <button onClick={handleStream}>Stream</button>;
}
```

### 4. Custom Display Component

Build a reusable streaming text display:

```tsx
import { useAiStream } from "@/client/hooks/use-ai-steam";

function StreamingTextDisplay({ prompt }: { prompt: string }) {
  const [chunks, setChunks] = useState<string[]>([]);
  const { streamWithCallback, isStreaming } = useAiStream();

  useEffect(() => {
    if (prompt) {
      streamWithCallback(
        { prompt },
        ({ chunk }) => {
          setChunks(prev => [...prev, chunk]);
        }
      );
    }
  }, [prompt]);

  return (
    <div>
      {chunks.map((chunk, i) => (
        <span key={i} className="fade-in">{chunk}</span>
      ))}
      {isStreaming && <span className="cursor">|</span>}
    </div>
  );
}
```

### 5. With Error Handling

All methods throw errors that you can catch:

```tsx
const handleStream = async () => {
  try {
    const result = await streamWithCallback(
      { prompt: "Generate code" },
      ({ chunk, accumulated }) => {
        console.log(chunk);
      }
    );
    console.log("Success:", result);
  } catch (error) {
    console.error("Stream failed:", error);
    // Handle error
  }
};
```

### 6. Tiptap Editor Integration

Complete example with Tiptap:

```tsx
import { useEditor } from "@tiptap/react";
import { useAiStream } from "@/client/hooks/use-ai-steam";

function TiptapWithAI() {
  const editor = useEditor({ ... });
  const { streamWithCallback, isStreaming, accumulatedText } = useAiStream();

  const handleAICompletion = async () => {
    if (!editor) return;

    const selection = editor.state.selection;
    const startPos = selection.to;
    let endPos = startPos;

    try {
      await streamWithCallback(
        {
          prompt: "Continue the text",
          context: editor.getText(),
        },
        ({ chunk }) => {
          // Insert chunk and update end position
          editor.commands.insertContentAt(endPos, chunk);
          endPos += chunk.length;

          // Optional: Add a decoration/mark while streaming
          editor.commands.setMark('aiGenerated', { from: startPos, to: endPos });
        }
      );

      // Remove mark after completion
      editor.commands.unsetMark('aiGenerated', { from: startPos, to: endPos });
    } catch (error) {
      console.error("AI generation failed:", error);
      
      // Optionally remove partially generated content
      if (endPos > startPos) {
        editor.commands.deleteRange({ from: startPos, to: endPos });
      }
    }
  };

  return (
    <div>
      <EditorContent editor={editor} />
      <button onClick={handleAICompletion} disabled={isStreaming}>
        {isStreaming ? `Generating... (${accumulatedText.length} chars)` : "AI Complete"}
      </button>
    </div>
  );
}
```

## Key Benefits

- **Editor-agnostic**: No Tiptap dependencies in the hook
- **Flexible consumption**: Choose callback, generator, or simple promise
- **Built-in state**: `isStreaming` and `accumulatedText` for UI updates
- **Type-safe**: Full TypeScript support with proper types
- **Reusable**: Use in any component that needs AI streaming
- **Error handling**: All methods properly throw errors
