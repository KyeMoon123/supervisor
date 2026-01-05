import { useState } from "react";

interface UseInlineEditOptions<T> {
  initialValue: T;
  onSave: (value: T) => void;
}

export function useInlineEdit<T>({ initialValue, onSave }: UseInlineEditOptions<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<T>(initialValue);

  const handleSave = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const startEditing = () => setIsEditing(true);

  return {
    isEditing,
    value,
    setValue,
    handleSave,
    handleCancel,
    handleKeyDown,
    startEditing,
  };
}
