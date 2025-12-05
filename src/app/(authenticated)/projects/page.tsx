"use client";
import PageWrapper from "@/client/common/PageWrapper/PageWrapper";
import NewItemFormDialog from "@/client/components/NewItemFormDialog";
import NewProjectForm from "@/client/components/folders/NewFolderForm";
import ProjectsGrid from "@/client/components/folders/folders-grid";
import ProjectsTable from "@/client/components/folders/ProjectsTable";
import { api } from "@/trpc/react";

export default function ProjectsPage() {
  return (
    <>
      <PageWrapper
        actions={[
          <NewItemFormDialog
            label="Add Project"
            triggerLabel="Add Project"
            form={<NewProjectForm />}
          />,
        ]}
      >
        <ProjectsGrid />
      </PageWrapper>
    </>
  );
}
