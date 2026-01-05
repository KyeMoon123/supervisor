"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { useTiptapEditor } from "./use-tiptap-editor";

/**
 * Hook that extracts all unique variable names from the editor content.
 * 
 * Variables are stored as nodes with type "variable" and have a "name" attribute.
 * This hook traverses the editor document and collects all unique variable names.
 *
 * @param providedEditor - Optional editor instance to use instead of the context editor
 * @returns An array of unique variable names found in the editor
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const variables = useVariables();
 *   // variables = ["customerName", "productName", "issueType"]
 *   
 *   return (
 *     <VariableManager 
 *       variables={variables}
 *       values={variableValues}
 *       onChange={setVariableValues}
 *     />
 *   );
 * }
 * ```
 */
export function useVariables(providedEditor?: Editor | null): string[] {
  const { editor } = useTiptapEditor(providedEditor);
  const [variables, setVariables] = useState<string[]>([]);

  useEffect(() => {
    if (!editor) {
      setVariables([]);
      return;
    }

    // Function to extract variables from editor content
    const extractVariables = () => {
      const variableNames = new Set<string>();
      const { doc } = editor.state;

      // Traverse the document and find all variable nodes
      doc.descendants((node) => {
        if (node.type.name === "variable") {
          const name = node.attrs.name as string;
          if (name && name.trim()) {
            variableNames.add(name.trim());
          }
        }
      });

      return Array.from(variableNames).sort();
    };

    // Initial extraction
    setVariables(extractVariables());

    // Listen for content updates
    const updateHandler = () => {
      setVariables(extractVariables());
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor]);

  return variables;
}

/**
 * Hook that provides both variables and their values with a setter.
 * This is a convenience hook that combines useVariables with state management.
 *
 * @param providedEditor - Optional editor instance to use instead of the context editor
 * @returns An object containing variables array, values record, and a setter function
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { variables, values, setValues } = useVariablesWithValues();
 *   
 *   return (
 *     <VariableManager 
 *       variables={variables}
 *       values={values}
 *       onChange={setValues}
 *     />
 *   );
 * }
 * ```
 */
export function useVariablesWithValues(providedEditor?: Editor | null) {
  const variables = useVariables(providedEditor);
  const [values, setValues] = useState<Record<string, string>>({});

  // Clean up values when variables are removed
  useEffect(() => {
    setValues((prevValues) => {
      const newValues: Record<string, string> = {};
      variables.forEach((variable) => {
        // Keep existing value if it exists, otherwise use empty string
        newValues[variable] = prevValues[variable] || "";
      });
      return newValues;
    });
  }, [variables]);

  return {
    variables,
    values,
    setValues,
  };
}
