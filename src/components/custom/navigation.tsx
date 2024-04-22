"use client";

import { FC, useState } from "react";
import { Button } from "../ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { navigationAnimation } from "@/animations";
import { Brand } from "./brand";

export const NavigationBar: FC = () => {
  // get current page URL
  const pathname = usePathname();
  // use state for navigation sidebar
  const [isOpen, setIsOpen] = useState(false);

  // navigation link object array
  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="relative flex w-full items-center justify-between px-5 py-5 lg:px-0">
      <div className="text-2xl">
        <Link href={"/"}>
          <Brand />
        </Link>
      </div>
      <ul className="hidden gap-x-5 md:flex">
        {links.map((link, index) => (
          <li
            key={index}
            className={`${pathname.startsWith(link.href) ? "text-primary" : ""}`}
          >
            <Link className="hover:text-emerald-600" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* buttons */}
      <div className="flex justify-between gap-x-3">
        <Button>
          <Link href={"/login"} className="w-20">
            Login
          </Link>
        </Button>

        {/* navigation sider button for small devices */}
        <button
          className="block rounded-full hover:bg-secondary md:hidden"
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
