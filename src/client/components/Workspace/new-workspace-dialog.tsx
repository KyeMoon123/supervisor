import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/primatives/dialog";
import { Button } from "@/client/primatives/button";
import { useState } from "react";
import { Input } from "@/client/primatives/input";
import { api } from "@/trpc/react";
import { Field, FieldGroup, FieldLabel } from "@/client/primatives/field";
import { toast } from "sonner";

export function NewWorkspaceDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const createWorkspaceMutation = api.workspace.createWorkspace.useMutation();
  const utils = api.useUtils();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Workspace</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace Name"
            />
          </Field>
          <Field orientation="horizontal" className="justify-end">
            <Button
              isLoading={createWorkspaceMutation.isPending}
              onClick={async () => {
                await createWorkspaceMutation.mutateAsync({ name });
                // await utils.workspace.getUserWorkspaces.refetch();
                setOpen(false);
                toast.success("Workspace created");
                window.location.reload();
              }}
            >
              Create Workspace
            </Button>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
