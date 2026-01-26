import {
  LayoutDashboard,
  HandHeart,
  Package,
  Building2,
 
  CheckCircle,
  Settings,
} from "lucide-react";

export const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    description: "View platform statistics and recent activity",
  },
  {
    title: "Donation Requests",
    url: "/admin/donation-requests",
    icon: HandHeart,
    description: "Review and manage incoming donation requests",
  },
   {
    title: "Orgs Register",
    url: "/admin/register-orgs",
    icon: Building2,
    description: "Register new organizations",
  },
  {
    title: "Donated Items",
    url: "/admin/donated-items",
    icon: Package,
    description: "Track all items donated to the platform",
  },
  {
    title: "Organizations",
    url: "/admin/orgs",
    icon: Building2,
    description: "Manage registered NGOs and organizations",
  },
  {
    title: "Accept Donation",
    url: "/admin/accept-donation",
    icon: CheckCircle,
    description: "Approve and assign donations to recipients",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    description: "Configure admin and platform preferences",
  },
];
