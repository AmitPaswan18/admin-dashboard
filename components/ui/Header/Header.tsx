import MenuIcon from "@mui/icons-material/Menu";
import { ModeToggle } from "../Model-Toggle";
import ListIcon from "@mui/icons-material/List";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Link from "next/link";

export default function Header() {
  return (
    <div className="h-28 w-full">
      <div className="h-[60%] flex justify-between w-full">
        <div className="p-4 text-gray-400 flex leading-8 md:gap-3 gap-1">
          {" "}
          <MenuIcon sx={{ fontSize: "32px" }} />
          <Link href="/registeruser">Dashboard</Link>
          <Link href="/users">Users</Link>
          <div>Settings</div>
        </div>
        <div className="p-4 md:pr-20 pr-2 flex gap-4 leading-10">
          <div>
            <ModeToggle />
          </div>
          <div>
            <ListIcon sx={{ fontSize: "30px" }} />
          </div>
          <div>
            <NotificationsActiveIcon sx={{ fontSize: "30px" }} />
          </div>
        </div>
      </div>
      <div className="border-y h-[40%] text-gray-400 p-2 pl-4">
        {" "}
        Home / dashboard{" "}
      </div>
    </div>
  );
}
