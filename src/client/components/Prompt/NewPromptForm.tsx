import { Form } from "@/primatives/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/primatives/field";
import { Input } from "@/primatives/input";
import { InputGroup } from "@/primatives/input-group";
import { InputGroupTextarea } from "@/primatives/input-group";

import { Controller } from "react-hook-form";
import { Button } from "@/primatives/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

/**
 * Props for the NewRecordTemplateForm component
 */
interface NewPromptFormProps {
  onFormSubmitComplete?: () => void;
}

const newPromptFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional().nullable(),
});

/**
 * A form component that allows the user to create a new project
 * @param onFormSubmitComplete
 * @constructor
 */
export default function NewPromptForm({
  onFormSubmitComplete,
}: NewPromptFormProps) {
  const utils = api.useUtils();
  const createPromptMutation = api.prompt.createPrompt.useMutation();
  const form = useForm<z.infer<typeof newPromptFormSchema>>({
    resolver: zodResolver(newPromptFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPromptFormSchema>) {
    createPromptMutation.mutate(values, {
      onSuccess: async () => {
        await utils.prompt.getPrompts.refetch();
        onFormSubmitComplete?.();
        toast.success("Prompt created");
      },
      onError: (error) => {
        toast.error("Failed to create prompt");
        console.error(error);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="form-new-project">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-project-name">
                  Project Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-new-project-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Project Name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-project-description">
                  Project Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    value={field.value ?? ""}
                    id="form-new-project-description"
                    placeholder="Project Description"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field orientation="horizontal" className="justify-end">
            <Button type="submit" form="form-new-project">
              Create Project
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
