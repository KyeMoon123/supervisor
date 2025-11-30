import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/client/primatives/select";
import { toSentenceCase } from "@/shared/utils/utils";
import { Label } from "../primatives/label";
import { BlockCategory } from "@/server/db/schema/blocks";

interface PromptSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptSelect({ value, onChange }: PromptSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="type">Block Type</Label>
      <Select
        value={value || undefined}
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {BlockCategory.enumValues.map((type) => (
            <SelectItem key={type} value={type}>
              {toSentenceCase(type)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
