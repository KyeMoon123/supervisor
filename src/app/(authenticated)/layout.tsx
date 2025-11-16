"use client";
import SideBar from "@/client/components/Navigation/SideBar/SideBar";
import SidebarDialog from "@/client/components/Navigation/SidebarDialog/SidebarDialog";
import StickyTopMobileSideBar from "@/client/components/Navigation/StickyTopMobileSideBar/StickyTopMobileSideBar";
import { AuthProvider } from "@/client/context/AuthContext";
import { useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full bg-primary-foreground text-primary box-border">
      <AuthProvider>
        <StickyTopMobileSideBar setOpen={setSidebarOpen} />
        <SidebarDialog
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-72`}
        >
          <SideBar />
        </div>
        <div className={"lg:ml-72 flex-grow flex flex-col"}>
          <div className="p-8 flex flex-col min-h-screen bg-primary-foreground">
            {children}
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}
