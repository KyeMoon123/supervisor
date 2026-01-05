# Variable Feature Documentation

## Overview

A custom Tiptap extension that allows users to insert named variables into the editor. Variables appear as bold, blue text in the format `{{variableName}}` and are easily distinguishable in the editor's JSON output.

## How to Use

1. **Trigger the Variable Input**: Type `{` in the editor
2. **Enter Variable Name**: A small input dialog will appear
3. **Insert Variable**: Press `Enter` to insert the variable with the name you typed
4. **Cancel**: Press `Esc` to close the dialog without inserting

## Example

1. Type `{` in the editor
2. Input dialog appears: "Variable name:"
3. Type `userName` and press Enter
4. Result: `{{userName}}` appears in bold blue text

## Technical Details

### File Structure

```
src/client/components/tiptap/
├── tiptap-node/
│   └── variable-node/
│       ├── variable-node.ts          # Node definition
│       ├── variable-node.scss        # Styling (bold, blue)
│       └── index.ts                  # Exports
├── tiptap-extension/
│   └── variable-suggestion.ts        # Suggestion trigger extension
└── tiptap-ui/
    └── variable-menu/
        └── variable-input-menu.tsx   # UI component for input
```

### JSON Output

Variables are stored as distinct nodes in the Tiptap JSON:

```json
{
  "type": "paragraph",
  "content": [
    {
      "type": "text",
      "text": "Hello "
    },
    {
      "type": "variable",
      "attrs": {
        "name": "userName"
      }
    },
    {
      "type": "text",
      "text": ", welcome!"
    }
  ]
}
```

### Styling

Variables are rendered with:
- **Bold text** (font-weight: 700)
- **Blue color** (rgb(59, 130, 246) - Tailwind blue-500)
- **Light blue background** (rgba(59, 130, 246, 0.1))
- **Rounded corners** with padding
- **Hover effect** (darker background)

### Key Features

1. **Inline Node**: Variables are atomic inline nodes, not marks
2. **Easy Identification**: Each variable has a `type: "variable"` in JSON
3. **Named Attributes**: The variable name is stored in `attrs.name`
4. **Backspace Deletion**: Pressing backspace at a variable deletes the entire node
5. **Non-editable**: Variables are atomic and cannot be edited inline
6. **Format Preservation**: Always renders as `{{name}}`

### Commands

The extension adds a custom command to the editor:

```typescript
editor.commands.insertVariable(name: string)
```

You can programmatically insert variables:

```typescript
editor.commands.insertVariable("myVariable");
```

### Extracting Variables from JSON

To extract all variables from saved content:

```typescript
function extractVariables(editorJSON: any): string[] {
  const variables: string[] = [];
  
  function traverse(node: any) {
    if (node.type === "variable") {
      variables.push(node.attrs.name);
    }
    if (node.content) {
      node.content.forEach(traverse);
    }
  }
  
  traverse(editorJSON);
  return [...new Set(variables)]; // Remove duplicates
}
```

## Implementation Components

### 1. Variable Node (`variable-node.ts`)
- Defines the node schema
- Handles rendering (HTML and text)
- Provides keyboard shortcuts (backspace)
- Adds the `insertVariable` command

### 2. Variable Suggestion Extension (`variable-suggestion.ts`)
- Triggers when user types `{`
- Integrates with Tiptap's suggestion plugin
- Handles the suggestion flow

### 3. Variable Input Menu (`variable-input-menu.tsx`)
- Renders the input UI
- Captures user input
- Calls the insert command on Enter
- Closes on Escape

## Customization

### Changing the Trigger Character

Edit `variable-suggestion.ts`:

```typescript
char: "{",  // Change to your preferred trigger
```

### Changing the Variable Format

Edit `variable-node.ts` renderHTML and renderText methods:

```typescript
renderHTML({ node, HTMLAttributes }) {
  return [
    "span",
    mergeAttributes(...),
    `{{${node.attrs.name}}}`,  // Change format here
  ];
}
```

### Changing the Styling

Edit `variable-node.scss`:

```scss
.variable-node {
  font-weight: 700;
  color: rgb(59, 130, 246);  // Change color
  // ... other styles
}
```

## Differences from Previous Approach

### Previous (Using Marks/Bold Text)
- Variables were just bold text
- Hard to distinguish from regular bold text in JSON
- Manual text formatting required
- Could be accidentally edited

### Current (Custom Node)
- Variables are distinct node types
- Easy to identify: `type: "variable"`
- Atomic nodes (can't be split or edited)
- Proper data structure with attributes
- Better for programmatic access

## Future Enhancements

Possible improvements:
- Variable autocomplete from existing variables
- Variable validation
- Variable preview on hover
- Variable replacement/substitution
- Different variable types (string, number, etc.)
- Variable library/management UI
