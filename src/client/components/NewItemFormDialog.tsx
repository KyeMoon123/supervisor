import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/primatives/dialog";
import { cn } from "@/client/lib/utils";
import { buttonVariants } from "@/client/primatives/button";
import { PlusIcon } from "lucide-react";

interface NewItemFormDialogProps {
  label: string;
  description?: string;
  triggerLabel: string;
  form: React.ReactElement; // Changed from React.ReactNode to React.ReactElement for cloneElement to work
  onFormSubmitCompleteAction?: () => void;
  dialogContentWidth?: "md" | "lg";
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function NewItemFormDialog({
  label,
  triggerLabel,
  form,
  onFormSubmitCompleteAction,
  dialogContentWidth = "md",
  description,
  open = false,
  setOpen,
}: NewItemFormDialogProps) {
  const [_open, _setOpen] = React.useState(false);
  const onFormSubmitComplete = () => {
    setOpen && setOpen(false);
    _setOpen(false);
    onFormSubmitCompleteAction && onFormSubmitCompleteAction();
  };
  const clonedForm = React.cloneElement(form, { onFormSubmitComplete } as any);

  return (
    <Dialog open={open || _open} onOpenChange={setOpen ? setOpen : _setOpen}>
      {!setOpen ? (
        <DialogTrigger
          className={cn(
            buttonVariants({ variant: "default", size: "default" })
          )}
        >
          <PlusIcon className={"mr-2 h-4 w-4 shrink-0"} />
          {triggerLabel}
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn(
          "w-full",
          dialogContentWidth === "md" ? "max-w-2xl" : "max-w-6xl"
        )}
      >
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          {description && <p className={"text-sm"}>{description}</p>}
        </DialogHeader>
        {clonedForm}
      </DialogContent>
    </Dialog>
  );
}
