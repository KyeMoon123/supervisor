import {
  adminMenuItems,
  sideBarMenuItems,
} from "@/components/Navigation/Navigation";
import { Separator } from "@/primatives/separator";
// import Logo from "@/assets/Logo.png";
import { useAuth } from "@/client/context/AuthContext";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { SideBarPrimaryMenuItem } from "./SideBarPrimaryMenuItem";

interface SideBarProps {
  disabled?: boolean;
}
export default function SideBar({ disabled }: SideBarProps) {
  const { signOut } = useAuth();

  return (
    <div className="flex  shadow grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 border-r border-border">
      <div className="flex space-x-4 pt-4">
        {/* <img className="h-8  mt-1" src={Logo.src} alt="Your Company" /> */}
      </div>

      <Separator />
      <nav
        className={`flex flex-1 flex-col ${
          disabled ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-6">
              {sideBarMenuItems.map((item) => (
                <SideBarPrimaryMenuItem key={item.label} item={item} />
              ))}
            </ul>
            <>
              <Separator className={"my-2"} />
              <ul role="list" className="-mx-2 space-y-6">
                {adminMenuItems.map((item) => (
                  <SideBarPrimaryMenuItem key={item.label} item={item} />
                ))}
              </ul>
            </>
          </li>
        </ul>
        <ul className={"mb-4 -mx-2"}>
          <SideBarPrimaryMenuItem
            key={"settings"}
            item={{
              label: "Settings",
              route: "/settings",
              icon: SettingsIcon,
            }}
          />
          <button
            className={
              "flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-accent  transition-colors"
            }
            onClick={() => signOut()}
          >
            <LogOutIcon
              className={"h-6 w-6 shrink-0 group-hover:text-accent"}
              aria-hidden="true"
            />
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
}
