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
import {
  ArrowLeftRight,
  CookieIcon,
  LayoutDashboardIcon,
  ShoppingBag,
} from "lucide-react";
import AppSidebarItem from "./app-sidebar-item";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

const menuItems = [
  { title: "Dashboard", icon: <LayoutDashboardIcon />, url: "/dashboard" },
  {
    title: "Rest TODOS",
    icon: <MdOutlineCategory />,
    url: "/dashboard/rest-todos",
  },
  {
    title: "Server Actions",
    icon: <ArrowLeftRight />,
    url: "/dashboard/server-todos",
  },
  { title: "Cookies", icon: <CookieIcon />, url: "/dashboard/cookies" },
  { title: "Products", icon: <ShoppingBag />, url: "/dashboard/products" },
];

export async function AppSidebar() {
  const user = await getUserSessionServer();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col items-center">
        <NavUser
          user={{
            name: user?.name ?? "Unknown User",
            role: Array.isArray(user?.roles)
              ? user?.roles
              : [user?.roles ?? "Client"],
            avatar: user?.image ?? "",
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
