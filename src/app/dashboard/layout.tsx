import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { UserNav } from "./components/user-nav";
import { MainNav } from "./components/main-nav";
import { Button } from "@/components/ui/button";
import { HelpCircle, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HelpCircle className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Help</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Can add search bar here */}
            </div>
            <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
