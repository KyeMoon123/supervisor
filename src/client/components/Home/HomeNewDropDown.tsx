import { Button } from "@/primatives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/primatives/dropdown-menu";
import { FileTextIcon, FolderIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface HomeNewDropDownProps {
  setNewFolderDialogOpen: (open: boolean) => void;
}
export function HomeNewDropDown({
  setNewFolderDialogOpen,
}: HomeNewDropDownProps) {
  const router = useRouter();
  const createPromptMutation = api.prompt.createPrompt.useMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PlusIcon />
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 mr-4" align="start">
        <DropdownMenuGroup>
          <NewActionItem
            label="Folder"
            icon={<FolderIcon />}
            description="Organize your prompts"
            onClick={() => {
              setNewFolderDialogOpen(true);
            }}
          />
          <NewActionItem
            label="Prompt"
            icon={<FileTextIcon />}
            description="Create a new prompt"
            onClick={() => {
              createPromptMutation.mutate(undefined, {
                onSuccess: (data) => {
                  router.push(`/prompts/${data?.id}`);
                },
                onError: (error) => {
                  toast.error("Failed to create prompt");
                  console.error(error);
                },
              });
            }}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NewActionItemProps {
  label: string;
  icon: React.ReactNode;
  description?: string;
  onClick: () => void;
}
const NewActionItem = ({
  label,
  icon,
  description,
  onClick,
}: NewActionItemProps) => {
  return (
    <DropdownMenuItem onClick={onClick}>
      <div className="flex items-center gap-4 w-full  py-1">
        {icon}

        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </DropdownMenuItem>
  );
};
