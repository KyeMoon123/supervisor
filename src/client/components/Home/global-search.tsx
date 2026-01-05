"use client";

import { useState, useMemo } from "react";
import { Input } from "@/client/primatives/input";
import { Command, Search } from "lucide-react";
import { Badge } from "@/client/primatives/badge";
import { Card } from "@/client/primatives/card";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Search across all items

  return (
    <div className="w-full relative">
      {/* Search Input */}
      <div className="w-full relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5  text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search prompts, blocks, and folders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="h-14 pr-20 text-base bg-card border-border shadow-sm pl-12"
        />
      </div>

      {/* Search Results Dropdown */}
      {isFocused && query.trim() && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-auto shadow-lg z-50 border-border">
          {[].length > 0 ? (
            <div className="p-2"></div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">
                No results found for &quot;{query}&quot;
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
