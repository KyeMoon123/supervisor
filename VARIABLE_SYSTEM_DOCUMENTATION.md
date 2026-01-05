# Variable System Documentation

## Overview

The variable system allows users to insert dynamic placeholders into editor content using the `{{variable_name}}` syntax. These variables can then be managed, filled with values, and replaced in the content.

## Architecture

### 1. Variable Node (`tiptap-node/variable-node/variable-node.ts`)

**Purpose**: Core Tiptap node extension that defines how variables are stored and rendered in the editor.

**Key Features**:
- **Node Type**: `variable` - inline, atomic node
- **Attributes**: `name` - stores the variable name
- **Rendering**: Displays as `{{variable_name}}` in the editor
- **Commands**: `insertVariable(name: string)` - inserts a variable at the current cursor position
- **Keyboard Shortcuts**: Backspace deletes the entire variable node at once
- **Click Handling**: Plugin for potential future click interactions

**Data Structure**:
```typescript
{
  type: "variable",
  attrs: {
    name: "customerName"
  }
}
```

**HTML Output**:
```html
<span data-type="variable" data-variable-name="customerName" class="variable-node">
  {{customerName}}
</span>
```

### 2. Variable Suggestion Extension (`tiptap-extension/variable-suggestion.ts`)

**Purpose**: Enables the `{{` trigger to open the variable input menu.

**Key Features**:
- **Trigger**: `{{` character sequence
- **Plugin Key**: `variableSuggestion`
- **Behavior**: When user types `{{`, opens the variable input menu
- **Command Flow**: Deletes the `{{` trigger → inserts the variable node
- **Restrictions**: Only works in paragraph nodes

### 3. Variable Input Menu (`tiptap-ui/variable-menu/variable-input-menu.tsx`)

**Purpose**: UI component that appears when user types `{{` to create a new variable.

**Key Features**:
- **Component**: `VariableInputMenu` - wrapper that configures the suggestion menu
- **Input**: `VariableInput` - form to enter variable name
- **Keyboard Controls**:
  - `Enter` - submits and inserts the variable
  - `Escape` - cancels and closes the menu
- **Auto-focus**: Input field is focused when menu opens
- **Validation**: Trims whitespace from variable names

**Usage Flow**:
```
1. User types "{{" → Menu appears with input field
2. User types "customerName" → Name is captured
3. User presses Enter → Variable node {{customerName}} is inserted
4. Menu closes
```

### 4. Variable Manager Component (`content/variable-manager.tsx`)

**Purpose**: UI component that displays all variables detected in the editor and allows users to fill in values.

**Props**:
```typescript
{
  variables: string[];           // Array of unique variable names
  values: Record<string, string>; // Key-value pairs of filled values
  onChange: (values: Record<string, string>) => void; // Update handler
}
```

**Features**:
- **Empty State**: Shows helpful message when no variables detected
- **Variable Count Badge**: Displays number of variables
- **Clear All Button**: Appears when any values are filled
- **Input Fields**: One per variable with placeholder
- **Scrollable**: Max height of 400px with overflow scroll

### 5. useVariables Hook (`hooks/use-variables.ts`)

**Purpose**: React hook that extracts all unique variable names from the editor content.

#### `useVariables(providedEditor?: Editor | null): string[]`

**How It Works**:
1. Gets editor instance from context or provided prop
2. Traverses the editor document tree using `doc.descendants()`
3. Finds all nodes with `type.name === "variable"`
4. Extracts the `name` attribute from each variable node
5. Returns unique, sorted array of variable names
6. Automatically updates when editor content changes

**Example**:
```typescript
function MyComponent() {
  const variables = useVariables();
  // Returns: ["customerName", "issueType", "productName"]
}
```

#### `useVariablesWithValues(providedEditor?: Editor | null)`

**Purpose**: Convenience hook that combines variable extraction with state management.

**Returns**:
```typescript
{
  variables: string[];                    // Array of variable names
  values: Record<string, string>;         // Variable values
  setValues: (values: Record<string, string>) => void; // Setter
}
```

**Features**:
- Automatically cleans up values when variables are removed
- Preserves existing values when new variables are added
- Initializes new variables with empty string

**Example**:
```typescript
function MyComponent() {
  const { variables, values, setValues } = useVariablesWithValues();
  
  return (
    <VariableManager 
      variables={variables}
      values={values}
      onChange={setValues}
    />
  );
}
```

## Implementation Details

### Variable Node Lifecycle

1. **Creation**:
   ```
   User types "{{variableName}}" 
   → Suggestion menu opens
   → User enters name and presses Enter
   → insertVariable() command is called
   → Variable node is created with name attribute
   ```

2. **Storage**:
   ```json
   {
     "type": "doc",
     "content": [
       {
         "type": "paragraph",
         "content": [
           { "type": "text", "text": "Hello " },
           { "type": "variable", "attrs": { "name": "customerName" } },
           { "type": "text", "text": "!" }
         ]
       }
     ]
   }
   ```

3. **Extraction**:
   ```typescript
   // useVariables hook traverses document
   doc.descendants((node) => {
     if (node.type.name === "variable") {
       variableNames.add(node.attrs.name);
     }
   });
   ```

4. **Deletion**:
   - Backspace when cursor is after variable → deletes entire node
   - Manual selection + delete → removes node

### Real-time Synchronization

The system maintains real-time sync between editor content and variable manager:

```
Editor Content Changes
  ↓
Editor fires "update" event
  ↓
useVariables hook listener triggered
  ↓
extractVariables() re-scans document
  ↓
variables state updated
  ↓
VariableManager re-renders with new variables
```

### Value Management

When using `useVariablesWithValues`:

```typescript
// Variables: ["name", "email"]
// User fills values
values = { name: "John", email: "john@example.com" }

// User removes "email" variable from editor
// Hook automatically cleans up
values = { name: "John" } // email is removed

// User adds "phone" variable
values = { name: "John", phone: "" } // phone is initialized
```

## Usage Examples

### Basic Usage

```typescript
import { useVariables } from "@/client/hooks/use-variables";
import { VariableManager } from "@/client/components/content/variable-manager";
import { useState } from "react";

function MyEditor() {
  const variables = useVariables();
  const [values, setValues] = useState({});

  return (
    <EditorProvider>
      <EditorContentArea />
      <VariableManager
        variables={variables}
        values={values}
        onChange={setValues}
      />
    </EditorProvider>
  );
}
```

### With Values Hook

```typescript
import { useVariablesWithValues } from "@/client/hooks/use-variables";

function MyEditor() {
  const { variables, values, setValues } = useVariablesWithValues();

  return (
    <EditorProvider>
      <EditorContentArea />
      <VariableManager
        variables={variables}
        values={values}
        onChange={setValues}
      />
    </EditorProvider>
  );
}
```

### With Custom Editor Instance

```typescript
function MyEditor() {
  const editor = useEditor({...});
  const variables = useVariables(editor);

  return (
    <VariableManager
      variables={variables}
      values={values}
      onChange={setValues}
    />
  );
}
```

### Replacing Variables with Values

```typescript
function MyComponent() {
  const { variables, values } = useVariablesWithValues();
  const editor = useTiptapEditor();

  const getContentWithVariables = () => {
    let content = editor?.getText() || "";
    
    // Replace all variables with their values
    variables.forEach((variable) => {
      const value = values[variable] || "";
      content = content.replaceAll(`{{${variable}}}`, value);
    });
    
    return content;
  };

  return (
    <button onClick={() => console.log(getContentWithVariables())}>
      Get Filled Content
    </button>
  );
}
```

## Best Practices

### 1. Variable Naming
- Use camelCase: `customerName`, `emailAddress`
- Be descriptive: `firstName` not `fn`
- Avoid spaces: The system trims whitespace

### 2. Hook Usage
- Use `useVariables()` when you only need to read variables
- Use `useVariablesWithValues()` when you need to manage values
- Pass editor instance only when working outside EditorContext

### 3. Performance
- Variables are extracted efficiently using document traversal
- Updates only trigger on editor "update" events
- Array is sorted for consistent ordering

### 4. State Management
- `useVariablesWithValues` automatically cleans up removed variables
- Values persist for existing variables
- New variables are initialized with empty strings

## Future Enhancements

Potential improvements to consider:

1. **Variable Types**: Support different variable types (text, number, date)
2. **Default Values**: Allow setting default values for variables
3. **Required Variables**: Mark certain variables as required
4. **Variable Suggestions**: Suggest previously used variable names
5. **Bulk Import**: Import variable values from JSON/CSV
6. **Variable Preview**: Show inline preview of filled values in editor
7. **Variable Validation**: Validate variable values (email format, etc.)
8. **Variable Groups**: Organize variables into categories

## Troubleshooting

### Variables Not Appearing
- Check that variables are created with the `{{` trigger
- Verify the variable node is properly inserted
- Ensure `useVariables` hook is within EditorProvider context

### Values Not Persisting
- Make sure to use the setter from `useVariablesWithValues`
- Check that onChange handler is properly connected
- Verify state management is working correctly

### Variables Not Updating
- Verify editor "update" event is firing
- Check that hook dependencies are correct
- Ensure editor instance is available

## Technical Notes

### ProseMirror Integration
Variables use ProseMirror's node system:
- **Atom**: Variable is treated as a single unit
- **Inline**: Variables can appear inline with text
- **Descendants**: Efficient traversal for extraction

### React Integration
- Hooks follow React best practices
- Automatic cleanup with useEffect
- Memoization for performance

### Type Safety
- Full TypeScript support
- Type-safe variable names and values
- Editor instance typing from Tiptap
