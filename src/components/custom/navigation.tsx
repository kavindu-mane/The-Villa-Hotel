"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line, RiCloseFill } from "react-icons/ri";
import { navigationAnimation } from "@/animations";
import { Brand } from "./brand";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Login } from "./login";
import { Register } from "./register";
import { Button } from "..";

export const NavigationBar: FC = () => {
  // get current page URL
  const pathname = usePathname();
  // use state for navigation sidebar
  const [isOpen, setIsOpen] = useState(false);
  // check auth status login or not
  const [isLogin, setIsLogin] = useState(true);

  // navigation link object array
  const links = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="relative flex w-full items-center justify-between px-2 py-5 lg:px-5">
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
      <div className="flex items-center justify-between gap-x-1">
        <AlertDialog>
          <AlertDialogTrigger className="h-8 w-20 rounded-md bg-primary text-white lg:h-9 lg:w-28">
            Login
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogCancel className="absolute end-3 top-2 h-8 w-8 rounded-full p-1">
              <RiCloseFill className="h-6 w-6 text-slate-900" />
            </AlertDialogCancel>
            {/* login */}
            {isLogin && <Login />}

            {/* register */}
            {!isLogin && <Register />}

            {/* change display text based on login and register */}
            <div className="mt-4 flex items-center justify-center gap-x-1.5 text-sm">
              {isLogin && <span>Don&apos;t</span>}
              {!isLogin && <span>Already</span>}
              have an account?
              <Button
                variant={"ghost"}
                className="w-fit p-0 underline hover:bg-transparent"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>

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
