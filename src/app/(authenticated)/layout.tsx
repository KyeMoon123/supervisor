"use client";

import SideBar from "@/client/components/Navigation/SideBar/SideBar";
import { AuthProvider } from "@/client/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      {/* Full-page background */}
      <div className="relative w-full h-screen overflow-hidden bg-sidebar">
        {/* SIDEBAR overlay (not boxed) */}
        <aside className="fixed left-0 top-0 h-full w-72  z-20 bg-sidebar">
          <SideBar />
        </aside>

        {/* TOP BAR overlay */}
        <header className="fixed left-72 right-0 top-0 h-12  z-10 flex items-center px-4 bg-sidebar">
          {/* Top bar content */}
        </header>

        {/* PAGE CONTENT positioned under overlays */}
        <main className="absolute left-72 top-12 right-0 bottom-0 overflow-y-auto p-4 z-0 bg-background rounded-xl mr-1 mb-1 shadow-xl">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
