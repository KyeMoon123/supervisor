import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/client/lib/utils";
import { Button } from "@/client/primatives/button";
import { Calendar } from "@/client/primatives/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/primatives/popover";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date | undefined) => void;
}

/**
 * A DatePicker component that allows the user to select a date from a calendar
 * @param value the value of the DatePicker
 * @param onChange function to set the value of the DatePicker
 * @constructor
 */
const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
