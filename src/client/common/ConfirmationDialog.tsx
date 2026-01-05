import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/client/primatives/dialog";
import { Button } from "@/client/primatives/button";
import { useState } from "react";

interface ConfirmationDialogProps {
  title: string;
  description?: string;
  triggerText: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  type?: "destructive" | "action";
  loading?: boolean;
}

export function ConfirmationDialog({
  title,
  description,
  triggerText,
  open = false,
  setOpen,
  onConfirm,
  onCancel,
  type = "action",
  loading = false,
}: ConfirmationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined && setOpen !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? setOpen : setInternalOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {
          <Button
            size="sm"
            variant={type === "destructive" ? "destructive" : "default"}
          >
            {triggerText}
          </Button>
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            isLoading={loading}
            variant={type === "destructive" ? "destructive" : "default"}
            onClick={async () => {
              await onConfirm();
              setDialogOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
