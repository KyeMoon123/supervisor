"use client";

import { Input } from "@/client/primatives/input";
import { Label } from "@/client/primatives/label";
import { Badge } from "@/client/primatives/badge";
import { Button } from "@/client/primatives/button";
import { useVariablesWithValues } from "@/client/hooks/use-variables";
import type { Editor } from "@tiptap/react";
import { BoxIcon } from "lucide-react";

interface VariableManagerProps {
  editor?: Editor | null;
}

export function VariableManager({ editor }: VariableManagerProps) {
  const { variables, values, setValues } = useVariablesWithValues(editor);
  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const handleClearAll = () => {
    const clearedValues = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    );
    setValues(clearedValues);
  };

  if (variables.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <BoxIcon className="size-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">No variables detected</p>
        <p className="text-xs text-muted-foreground mt-1">
          Use {`{{variable_name}}`} in your prompt
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Variables</h3>
          <Badge variant="secondary" className="text-xs">
            {variables.length}
          </Badge>
        </div>
        {Object.values(values).some((v) => v !== "") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-7 text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {variables.map((variable) => (
          <div key={variable} className="space-y-1.5">
            <Label htmlFor={variable} className="text-sm font-medium">
              {`${variable}`}
            </Label>
            <Input
              id={variable}
              value={values[variable] || ""}
              onChange={(e) => handleChange(variable, e.target.value)}
              placeholder={`Enter ${variable}...`}
              className="h-9"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
