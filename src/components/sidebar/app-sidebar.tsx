import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { MdOutlineCategory } from "react-icons/md";
import { NavUser } from "../nav-user";
import { ArrowLeftRight, CookieIcon, LayoutDashboardIcon, ShoppingBag } from "lucide-react";
import AppSidebarItem from "./app-sidebar-item";

const menuItems = [
  { title: "Dashboard", icon: <LayoutDashboardIcon />, url: "/dashboard" },
  { title: "Rest TODOS", icon: <MdOutlineCategory />, url: "/dashboard/rest-todos" },
  { title: "Server Actions", icon: <ArrowLeftRight />, url: "/dashboard/server-todos" },
  { title: "Cookies", icon: <CookieIcon />, url: "/dashboard/cookies" },
  { title: "Products", icon: <ShoppingBag />, url: "/dashboard/products" },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col items-center">
        <NavUser
          user={{
            name: "tianrodez",
            role: "Admin",
            avatar: "https://avatars.githubusercontent.com/u/125223639?v=4",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item, index) => {
              return <AppSidebarItem key={index} {...item} />;
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
