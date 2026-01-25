"use client";

import { items } from "@/lib/admin-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-64 bg-white border-r border-indigo-200 shadow-sm">
      <SidebarContent className="h-full flex flex-col">
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-700 font-bold text-lg px-4 pt-4">
            Admin Panel
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex-1 mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
                      <a
                        href={item.url}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-indigo-100 text-indigo-800 font-semibold"
                            : "text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
            <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
