import { useState } from "react";
import NewFolderForm from "../folders/NewFolderForm";
import NewItemFormDialog from "../NewItemFormDialog";
import { HomeNewDropDown } from "./HomeNewDropDown";

export default function HomeActions() {
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newPromptDrawerOpen, setNewPromptDrawerOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-2">
        <HomeNewDropDown
          setNewFolderDialogOpen={setNewFolderDialogOpen}
          setNewPromptDrawerOpen={setNewPromptDrawerOpen}
        />
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
