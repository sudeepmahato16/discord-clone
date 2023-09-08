import React, { FC, ReactNode } from "react";
import { NavigationSidebar } from "@/components/navigation/NavigationSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = async ({ children }) => {
  return (
    <div className="h-full flex flex-row">
      <div className="hidden md:flex h-full w-[68px] z-30 flex-col">
        <NavigationSidebar />
      </div>
      <main className="flex-1 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
