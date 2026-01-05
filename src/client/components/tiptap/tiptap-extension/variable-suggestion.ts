import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";

export type VariableSuggestionOptions = {
  suggestion: Omit<SuggestionOptions, "editor">;
};

export const VariableSuggestion = Extension.create<VariableSuggestionOptions>({
  name: "variableSuggestion",

  addOptions() {
    return {
      suggestion: {
        char: "{{",
        pluginKey: new PluginKey("variableSuggestion"),
        command: ({ editor, range, props }) => {
          // props will contain the variable name
          const name = props.name as string;

          // Delete the {{ trigger and insert the variable
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertVariable(name)
            .run();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes.variable;

          return !!type && $from.parent.type.name === "paragraph";
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
