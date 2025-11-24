"use client";

import { AppSidebar } from "@/client/components/Navigation/AuthenticatedSidebar/authenticated-sidebar";
import { AuthProvider } from "@/client/context/AuthContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/primatives/sidebar";
import { usePathname } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <main>
            <div className="">
              <SidebarTrigger />
            </div>
            <div className="px-6">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
