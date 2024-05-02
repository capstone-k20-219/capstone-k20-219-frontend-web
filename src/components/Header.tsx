"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import User from "@/img/user.jpg";
import Image from "next/image";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/auth-slice";
import { setInitial } from "@/redux/features/active-slice";
import { userLogOut } from "@/lib/services/auth";

function HeaderTimer() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timerInterval = setInterval(
      () => setDate(new Date().toUTCString()),
      1000
    );
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="mr-auto text-neutral-500 text-sm font-medium">
      {date.slice(0, -3)}
    </div>
  );
}

function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { token } = useAppSelector((state) => state.auth.value);
  const dispatch = useDispatch<AppDispatch>();
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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

  const handleLogout = async () => {
    await userLogOut(token);
    dispatch(logOut());
    dispatch(setInitial());
  };

  useEffect(() => {
    let ignore = false;
    if (prevOpen.current === true && !ignore) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;

    return () => {
      ignore = true;
    };
  }, [open]);

  return (
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
          alt="avartar"
          id="user-avartar"
          // loading="lazy"
          priority
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
  );
}

export default function Header({
  setOpenSidebar,
  setWidthSidebar,
}: {
  setOpenSidebar: (state?: boolean) => void;
  setWidthSidebar: (state?: boolean) => void;
}) {
  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setOpenSidebar(true);
      setWidthSidebar(true);
    } else {
      setWidthSidebar();
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-white shadow-md">
      <div className="w-full items-center flex">
        <FiMenu
          style={{ width: 24, height: 24 }}
          className="mr-4 cursor-pointer"
          onClick={handleMenuButton}
        />
        <HeaderTimer />
        <HeaderMenu />
      </div>
    </div>
  );
}
