import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export interface VariableOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    variable: {
      /**
       * Insert a variable
       */
      insertVariable: (name: string) => ReturnType;
    };
  }
}

export const Variable = Node.create<VariableOptions>({
  name: "variable",

  group: "inline",

  inline: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      name: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-variable-name"),
        renderHTML: (attributes) => {
          return {
            "data-variable-name": attributes.name,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="variable"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        {
          "data-type": "variable",
          class: "variable-node",
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      `{{${node.attrs.name}}}`,
    ];
  },

  renderText({ node }) {
    return `{{${node.attrs.name}}}`;
  },

  addCommands() {
    return {
      insertVariable:
        (name: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { name },
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isVariable = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isVariable = true;
              tr.delete(pos, pos + node.nodeSize);
              return false;
            }
          });

          return isVariable;
        }),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("variableClick"),
        props: {
          handleClick(view, pos) {
            const { doc } = view.state;
            const node = doc.nodeAt(pos);

            if (node?.type.name === "variable") {
              // Could add click handling here if needed
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
