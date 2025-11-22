"use client";
import PageWrapper from "@/client/common/PageWrapper/PageWrapper";
import NewItemFormDialog from "@/client/components/NewItemFormDialog";
import NewProjectForm from "@/client/components/Folders/NewFolderForm";
import ProjectsGrid from "@/client/components/Folders/FoldersGrid";
import ProjectsTable from "@/client/components/Folders/ProjectsTable";
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
