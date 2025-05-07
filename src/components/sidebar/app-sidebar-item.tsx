"use client";

import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  url: string;
}

export default function AppSidebarItem({ title, icon, url }: SidebarItemProps) {
  const currentPath = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={title} isActive={currentPath === url}>
        {icon}
        <Link className="w-full" href={url}>
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
