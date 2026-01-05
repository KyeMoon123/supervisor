import type { Editor } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";
import { isValidPosition, findNodePosition } from "@/client/lib/tiptap-utils";

/**
 * Checks if block select trigger can be added in the current editor state
 */
export function canAddBlockSelectTrigger(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!editor.storage.uiState?.blockSelectMenuItems?.length) {
    return false;
  }
  return true;
}

/**
 * Inserts a trigger in a block node at a specified position or after the current selection
 */
function insertTriggerInBlockNode(
  editor: Editor,
  trigger: string,
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if ((node !== undefined && node !== null) || isValidPosition(nodePos)) {
    const foundPos = findNodePosition({
      editor,
      node: node || undefined,
      nodePos: nodePos || undefined,
    });

    if (!foundPos) {
      return false;
    }

    const isEmpty =
      foundPos.node.type.name === "paragraph" &&
      foundPos.node.content.size === 0;
    const posAndNodeSize = foundPos.pos + foundPos.node.nodeSize;

    return editor
      .chain()
      .insertContentAt(isEmpty ? foundPos.pos : posAndNodeSize, {
        type: "paragraph",
        content: [{ type: "text", text: trigger }],
      })
      .focus(isEmpty ? foundPos.pos + 2 : posAndNodeSize + trigger.length + 1)
      .run();
  }

  const { $from } = editor.state.selection;

  return editor
    .chain()
    .insertContentAt($from.after(), {
      type: "paragraph",
      content: [{ type: "text", text: trigger }],
    })
    .focus()
    .run();
}

/**
 * Inserts a trigger in a text node at the current selection
 */
function insertTriggerInTextNode(
  editor: Editor,
  trigger: string,
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if ((node !== undefined && node !== null) || isValidPosition(nodePos)) {
    const foundPos = findNodePosition({
      editor,
      node: node || undefined,
      nodePos: nodePos || undefined,
    });

    if (!foundPos) {
      return false;
    }

    const isEmpty =
      foundPos.node.type.name === "paragraph" &&
      foundPos.node.content.size === 0;
    const posAndNodeSize = foundPos.pos + foundPos.node.nodeSize;

    editor.view.dispatch(
      editor.view.state.tr
        .scrollIntoView()
        .insertText(
          trigger,
          isEmpty ? foundPos.pos : posAndNodeSize,
          isEmpty ? foundPos.pos : posAndNodeSize
        )
    );

    editor.commands.focus(
      isEmpty ? foundPos.pos + 2 : posAndNodeSize + trigger.length + 1
    );

    return true;
  }

  const { $from } = editor.state.selection;
  const currentNode = $from.node();
  const hasContentBefore =
    $from.parentOffset > 0 &&
    currentNode.textContent[$from.parentOffset - 1] !== " ";

  return editor
    .chain()
    .insertContent({
      type: "text",
      text: hasContentBefore ? ` ${trigger}` : trigger,
    })
    .focus()
    .run();
}

/**
 * Adds a block select trigger at the current selection or specified node position
 */
export function addBlockSelectTrigger(
  editor: Editor | null,
  trigger: string = "@",
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canAddBlockSelectTrigger(editor)) return false;

  try {
    const { $from } = editor.state.selection;
    const currentNode = $from.node();
    const isBlockNode = currentNode.isBlock && !currentNode.isTextblock;

    if (isBlockNode) {
      return insertTriggerInBlockNode(editor, trigger, node, nodePos);
    }

    return insertTriggerInTextNode(editor, trigger, node, nodePos);
  } catch {
    return false;
  }
}

export function addVariableInputTrigger(
  editor: Editor,
  trigger: string = "{{",
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if (!editor || !editor.isEditable) return false;

  try {
    const { $from } = editor.state.selection;
    const currentNode = $from.node();
    const isBlockNode = currentNode.isBlock && !currentNode.isTextblock;

    if (isBlockNode) {
      return insertTriggerInBlockNode(editor, trigger, node, nodePos);
    }

    return insertTriggerInTextNode(editor, trigger, node, nodePos);
  } catch {
    return false;
  }
}
