"use client";

import User from "@/img/user.jpg";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logOut } from "@/redux/features/auth-slice";
import { RoleType } from "@/lib/type";
import { FiMenu } from "react-icons/fi";
import { setInitial } from "@/redux/features/active-slice";

export default function Header({
  setOpenSidebar,
  setWidthSidebar,
}: {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  setWidthSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setOpenSidebar(true);
      setWidthSidebar(true);
    } else {
      setWidthSidebar((prev) => !prev);
      setOpenSidebar(false);
    }
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setInitial());
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    setInterval(() => setDate(new Date().toUTCString()), 1000);
  }, []);

  return (
    <div className="w-full px-4 py-2 bg-white shadow-md">
      <div className="w-full items-center flex">
        <FiMenu
          style={{ width: 24, height: 24 }}
          className="mr-4 cursor-pointer"
          onClick={handleMenuButton}
        />
        <div className="mr-auto text-neutral-500 text-sm font-medium">
          {date.slice(0, -3)}
        </div>
        <div>
          <Button
            className=" outline-none border-none"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Image
              src={User}
              priority={true}
              alt="avartar"
              id="user-avartar"
              className="w-10 h-10 rounded-full cursor-pointer
              border-[0.5px] border-neutral-400"
            />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="composition-menu">
                      <MenuItem onClick={handleClose}>
                        <Link href={"/profile"}>Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
}
