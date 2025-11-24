import { useState } from "react";
import NewFolderForm from "../Folders/NewFolderForm";
import NewItemFormDialog from "../NewItemFormDialog";
import NewPromptDrawer from "../Prompt/new-prompt-form";
import { HomeNewDropDown } from "./HomeNewDropDown";

export default function HomeActionsAndFilters() {
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newPromptDrawerOpen, setNewPromptDrawerOpen] = useState(false);
  return (
    <div className="flex  w-full  justify-between items-center ">
      <div>
        <h1> Filters</h1>
      </div>
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
