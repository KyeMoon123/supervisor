// import Logo from "@/assets/Logo.png";
import { useAuth } from "@/client/context/AuthContext";
import { Button } from "@/client/primatives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/client/primatives/dropdown-menu";
import { ChevronDown, FileText } from "lucide-react";
import SideBarItem from "../../Sidebar/SideBarItem";

interface SideBarProps {
  disabled?: boolean;
}
export default function SideBar({ disabled }: SideBarProps) {
  return (
    <aside className="w-72  flex flex-col">
      <div className="p-4  ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <span className="font-semibold">Personal</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {[{ id: "1", name: "Workspace 1" }].map((workspace) => (
              <DropdownMenuItem key={workspace.id}>
                {workspace.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <SideBarItem
          href="/home"
          icon={<FileText className="w-4 h-4" />}
          label="Home"
        />
      </nav>
    </aside>
  );
}
