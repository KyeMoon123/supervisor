"use client";

import { useState, useEffect, useRef } from "react";
import type { Editor } from "@tiptap/react";
import type { Range } from "@tiptap/core";

// --- Tiptap UI ---
import { Card, CardBody } from "@/components/tiptap/tiptap-ui-primitive/card";
import type { SuggestionMenuProps } from "@/components/tiptap/tiptap-ui-utils/suggestion-menu";
import { SuggestionMenu } from "@/components/tiptap/tiptap-ui-utils/suggestion-menu";
import { Input } from "@/client/primatives/input";

export type VariableInputMenuProps = Omit<
  SuggestionMenuProps,
  "items" | "children"
>;

export const VariableInputMenu = (props: VariableInputMenuProps) => {
  return (
    <SuggestionMenu
      char="{{"
      pluginKey="variableSuggestion"
      decorationClass="tiptap-variable-input-decoration"
      selector="tiptap-variable-input-menu"
      items={() => []}
      {...props}
    >
      {(menuProps) => <VariableInput {...menuProps} />}
    </SuggestionMenu>
  );
};

const VariableInput = ({ onSelect }: { onSelect: (item: any) => void }) => {
  const [variableName, setVariableName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the menu opens
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (variableName.trim()) {
      const trimmedName = variableName.trim();
      // Pass the item with onSelect callback and context
      onSelect({
        title: trimmedName,
        onSelect: ({ editor }: { editor: Editor; range: Range }) => {
          // The range has already been deleted by the SuggestionMenu
          // Just insert the variable at the current position
          editor.chain().focus().insertVariable(trimmedName).run();
        },
        context: { name: trimmedName },
      });
      setVariableName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Escape") {
      e.preventDefault();
      // The menu will close automatically
    }
  };

  return (
    <Card style={{ minWidth: "250px" }}>
      <CardBody className="p-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-muted-foreground font-medium">
              Variable name:
            </label>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter variable name..."
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
              autoFocus
            />
            <div className="text-xs text-muted-foreground">
              Press Enter to insert, Esc to cancel
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
