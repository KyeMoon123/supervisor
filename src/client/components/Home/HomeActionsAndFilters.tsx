import { Button } from "@/client/primatives/button";
import { PlusIcon } from "lucide-react";
import { HomeNewDropDown } from "./HomeNewDropDown";
import NewItemFormDialog from "../NewItemFormDialog";
import NewFolderForm from "../Folders/NewFolderForm";
import { useState } from "react";

export default function HomeActionsAndFilters() {
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  return (
    <div className="flex  w-full  justify-between items-center ">
      <div>
        <h1> Filters</h1>
      </div>
      <div className="flex items-center gap-2">
        <HomeNewDropDown setNewFolderDialogOpen={setNewFolderDialogOpen} />
      </div>
      <NewItemFormDialog
        label="Add Folder"
        triggerLabel="Add Folder"
        form={<NewFolderForm />}
        open={newFolderDialogOpen}
        setOpen={setNewFolderDialogOpen}
      />
    </div>
  );
}
