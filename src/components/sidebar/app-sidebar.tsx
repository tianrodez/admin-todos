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
import { auth } from "@/auth/auth";

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
  const session = await auth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col items-center">
        <NavUser
          user={{
            name: session?.user?.name ?? "Unknown User",
            role: Array.isArray(session?.user?.roles) ? session?.user?.roles : [session?.user?.roles ?? "Client"],
            avatar: session?.user?.image ?? "",
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
