"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { navigationAnimation } from "@/animations";
import { Button, Brand } from "@/components";
import { cn } from "@/lib/utils";

export const NavigationBar: FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // get url params
  const fullPath = usePathname();
  // get current page URL
  const pathname = "/" + fullPath.split("/")[1];
  // use state for navigation sidebar
  const [isOpen, setIsOpen] = useState(false);

  // navigation link object array
  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/rooms", label: "Rooms" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/about", label: "About" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "relative z-[2] flex w-full items-center justify-between px-2 py-4 lg:px-5",
        pathname === "/admin" ? "border-b bg-white" : "",
      )}
    >
      <div className="text-2xl">
        <Link href={"/"}>
          <Brand />
        </Link>
      </div>
      <ul
        className={cn(
          "hidden gap-x-8 md:flex",
          pathname === "/admin" ? "md:hidden" : "",
        )}
      >
        {links.map((link, index) => (
          <li
            key={index}
            className={`${pathname === link.href ? "text-primary" : ""}`}
          >
            <Link className="hover:text-emerald-600" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* buttons */}
      <div className="flex items-center justify-between gap-x-1">
        {children ? (
          children
        ) : (
          <Link href={"/auth/login?callbackUrl=" + fullPath}>
            <Button className="h-8 w-20 rounded-md bg-primary text-white lg:h-9 lg:w-28">
              Login
            </Button>
          </Link>
        )}

        {/* navigation slider button for small devices */}
        <button
          className={cn(
            "block rounded-full hover:bg-secondary md:hidden",
            pathname === "/admin" ? "hidden" : "",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <RiMenu3Line className="h-10 w-10 p-2" />
        </button>
      </div>

      {/* navigation sider for small devices */}
      <motion.div
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        variants={navigationAnimation}
        className="fixed right-0 top-0 z-50 h-full bg-emerald-600"
      >
        {/* close button */}
        <motion.div
          initial={"closed"}
          animate={isOpen ? "open" : "closed"}
          variants={navigationAnimation}
          className="flex justify-end p-5"
        >
          <button
            className="right-5 top-5 rounded-full bg-secondary/20 text-white"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine className="h-10 w-10 p-2" />
          </button>
        </motion.div>
        <ul className="flex flex-col gap-1 p-5 pe-0 text-white">
          {links.map((link, index) => (
            <li
              key={index}
              className={`${
                pathname.startsWith(link.href) ? "bg-white text-primary" : ""
              } flex rounded-s-full hover:bg-white hover:text-primary`}
            >
              <Link href={link.href} className="w-full py-2.5 ps-3">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};
