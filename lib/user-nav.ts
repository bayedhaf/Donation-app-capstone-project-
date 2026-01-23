import {
  LayoutDashboard,
  HandHeart,
  Settings,
} from "lucide-react";

export const items = [
  {
    title: "Dashboard",
    url: "/users",
    icon: LayoutDashboard,
    description: "Overview of platform activity and statistics",
  },
  {
    title: "Donate",
    url: "/users/donate",
    icon: HandHeart,
    description: "Create and manage donations",
  },
  {
    title: "Settings",
    url: "/users/settings",
    icon: Settings,
    description: "Manage account and platform preferences",
  },
];
