"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/primatives/card";
import { Badge } from "@/client/primatives/badge";
import { CheckCircle2 } from "lucide-react";

export function PublishedTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Published Status</CardTitle>
            <Badge className="gap-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Version</p>
              <p className="text-sm font-medium text-foreground">v1.2.3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Published</p>
              <p className="text-sm font-medium text-foreground">2 days ago</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Requests
              </p>
              <p className="text-sm font-medium text-foreground">1,234</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Published Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg bg-muted/30 p-4  text-xs text-foreground overflow-x-auto">
            <pre>{`You are a helpful customer support assistant for {{productName}}...`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
