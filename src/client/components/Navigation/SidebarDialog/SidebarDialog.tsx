import { Dialog, DialogContent } from "@/primatives/dialog";
import { Fragment } from "react";
import { XIcon } from "lucide-react";
import SideBar from "@/client/components/Navigation/SideBar/SideBar";

interface SidebarDialogProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarDialog = ({ sidebarOpen, setSidebarOpen }: SidebarDialogProps) => {
  return (
    <Dialog open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <DialogContent className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-gray-900/80" />

        <div className="fixed inset-0 flex">
          <DialogContent className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <SideBar />
          </DialogContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SidebarDialog;
