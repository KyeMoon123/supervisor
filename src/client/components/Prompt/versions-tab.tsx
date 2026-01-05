"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/primatives/table";
import { Badge } from "@/client/primatives/badge";
import { Button } from "@/client/primatives/button";

const versions = [
  {
    version: "v1.2.3",
    status: "production",
    date: "2 days ago",
    author: "Alice",
  },
  { version: "v1.2.2", status: "archived", date: "1 week ago", author: "Bob" },
  {
    version: "v1.2.1",
    status: "archived",
    date: "2 weeks ago",
    author: "Alice",
  },
  {
    version: "v1.2.0",
    status: "archived",
    date: "3 weeks ago",
    author: "Charlie",
  },
];

export function VersionsTab() {
  return (
    <div className="border border-border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.version}>
              <TableCell className=" text-sm">{version.version}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    version.status === "production" ? "default" : "secondary"
                  }
                  className="capitalize"
                >
                  {version.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {version.date}
              </TableCell>
              <TableCell>{version.author}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
