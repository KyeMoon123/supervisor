import { Button } from "@/primatives/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/primatives/field";
import { Form } from "@/primatives/form";
import { Input } from "@/primatives/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

/**
 * Props for the NewFolderForm component
 */
interface NewFolderFormProps {
  onFormSubmitComplete?: () => void;
}

const newFolderFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

/**
 * A form component that allows the user to create a new folder
 * @param onFormSubmitComplete
 * @constructor
 */
export default function NewFolderForm({
  onFormSubmitComplete,
}: NewFolderFormProps) {
  const utils = api.useUtils();
  const createFolderMutation = api.folder.createFolder.useMutation();
  const form = useForm<z.infer<typeof newFolderFormSchema>>({
    resolver: zodResolver(newFolderFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newFolderFormSchema>) {
    createFolderMutation.mutate(values, {
      onSuccess: async () => {
        await utils.folder.getFolders.refetch();
        onFormSubmitComplete?.();
        toast.success("Folder created");
      },
      onError: (error) => {
        toast.error("Failed to create folder");
        console.error(error);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="form-new-folder">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-folder-name">
                  Folder Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-new-folder-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Folder Name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal" className="justify-end">
            <Button type="submit" form="form-new-folder">
              Create Folder
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
