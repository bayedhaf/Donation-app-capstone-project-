import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/UserSideBar";

export const metadata: Metadata = {
  title: "Donation App | Admin",
  description: "Admin dashboard for managing the donation platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-r from-indigo-50 to-indigo-100">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-indigo-200 bg-white/80 px-4 backdrop-blur">
            <SidebarTrigger className="text-indigo-700" />
            <h1 className="text-sm font-semibold text-indigo-700 tracking-wide">
              Admin Dashboard
            </h1>
          </header>

          {/* Page content */}
          <section className="flex-1 p-4 sm:p-6 md:p-8">
            {children}
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
