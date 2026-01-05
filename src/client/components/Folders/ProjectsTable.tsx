"use client";
import DataTable from "@/client/common/DataTable/DataTable";
import { Button } from "@/client/primatives/button";
import type { ColumnDef } from "@tanstack/react-table";

interface ProjectsTableProps {
  projects: ProjectsTableColumn[] | undefined;
}
export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return <DataTable columns={staticColumns} data={projects ?? []} />;
}

interface ProjectsTableColumn {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
}

const staticColumns: ColumnDef<ProjectsTableColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 120,
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 160,
    cell: ({ row }) => {
      return row.original.description;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    size: 160,

    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button className="text-right" variant="outline">
            Edit
          </Button>
        </div>
      );
    },
  },
];
