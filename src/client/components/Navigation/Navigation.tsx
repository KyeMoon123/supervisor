import {
  BlocksIcon,
  BriefcaseIcon,
  FileTextIcon,
  HardHat,
  UsersIcon,
  HomeIcon,
} from "lucide-react";

export interface NavigationItemProps {
  label: string;
  icon: any;
  route: string;
}

export const sideBarMenuItems: NavigationItemProps[] = [
  { label: "Dashboard", route: "/dashboard", icon: HomeIcon },
  { label: "Projects", route: "/projects", icon: BriefcaseIcon },
  { label: "Jobs", route: "/jobs", icon: HardHat },
  { label: "Job Records", route: "/job-records", icon: FileTextIcon },
  { label: "Form Templates", route: "/record-templates", icon: BlocksIcon },
];

export const adminMenuItems: NavigationItemProps[] = [
  {
    label: "Organisation Users",
    route: "/organisation-users",
    icon: UsersIcon,
  },
];
