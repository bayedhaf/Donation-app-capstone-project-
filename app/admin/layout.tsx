import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AdminSideBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <div className="flex min-h-screen w-full bg-linear-to-r from-indigo-50 to-indigo-100">
        {/* Sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-indigo-200 bg-white/80 px-4 backdrop-blur">
            {/* Mobile nav trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <SidebarTrigger className="text-indigo-700" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <AppSidebar />
                </SheetContent>
              </Sheet>
            </div>
            {/* Desktop breadcrumb/title */}
            <div className="hidden md:block">
              <SidebarTrigger className="text-indigo-700" />
            </div>
            <span className="text-sm font-semibold text-indigo-700">
              Admin Dashboard
            </span>
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
