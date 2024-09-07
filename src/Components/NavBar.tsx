import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Assign, Passengers, Checkin } from "@/icons/navBarIcons";

export function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <Passengers
          id="passengers_icon"
          className="h-5 w-5 text-primary '[&>svg]:fill-primary"
        />
        <a href="#" className="flex items-center">
          View Passengers
        </a>
      </li>
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <Assign
          id="assign_icon"
          className="h-5 w-5 text-primary '[&>svg]:fill-primary"
        />
        <a href="#" className="flex items-center">
          Assign Passengers
        </a>
      </li>
      <li className="flex items-center gap-x-2 p-1 font-medium">
        <Checkin id="checkin_id" className="h-5 w-5 text-primary" />
        <a href="#" className="flex items-center">
          Starship View and Check-in
        </a>
      </li>
    </ul>
  );

  return (
    <Navbar
      id="navbar"
      className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4"
    >
      <div className="container mx-auto flex items-center justify-between text-primary">
        <Image
          id="navbar_logo"
          src="/logo/Hyperspace.svg"
          className="mr-10"
          width={100}
          height={30}
          alt="Hyperspace"
        />
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-primary inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
