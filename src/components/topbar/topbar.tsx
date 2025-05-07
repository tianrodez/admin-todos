import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CiChat1 } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../theme/theme-toggle";
import TopbarBreadcrumb from "./topbar-breadcrumb";

export function Topbar() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <TopbarBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <Input type="search" placeholder="Buscar..." />
        <Button size={"icon"}>
          <CiChat1 />
        </Button>
        <Button size={"icon"}>
          <IoIosNotificationsOutline />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
