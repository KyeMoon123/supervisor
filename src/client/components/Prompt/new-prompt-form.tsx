import {
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetClose,
  SheetFooter,
} from "@/client/primatives/sheet";

import { Button } from "@/client/primatives/button";
import { Label } from "@/client/primatives/label";

interface NewPromptDrawerProps {
  newPromptDrawerOpen: boolean;
  setNewPromptDrawerOpen: (open: boolean) => void;
}

export default function NewPromptDrawer({
  newPromptDrawerOpen,
  setNewPromptDrawerOpen,
}: NewPromptDrawerProps) {
  return (
    <Sheet open={newPromptDrawerOpen} onOpenChange={setNewPromptDrawerOpen}>
      <SheetContent side="right" className="min-w-2/3">
        <SheetHeader>
          <SheetTitle>
            Edit profils f nsdbflksbnkfnkdsbfljsdbfjbafljf fhsdkjfbasdl fldsk
            fsdka fe
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div> */}
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
