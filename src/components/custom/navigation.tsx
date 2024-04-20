"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { navigationAnimation } from "@/animations";

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
		<nav className="flex relative justify-between w-full p-5 items-center">
			<h1>The Villa Hotel</h1>
			<ul className="md:flex gap-x-5 hidden">
				{links.map((link, index) => (
					<li
						key={index}
						className={`${pathname.startsWith(link.href) ? "text-primary" : ""}`}>
						<Link href={link.href}>{link.label}</Link>
					</li>
				))}
			</ul>

			{/* buttons */}
			<div className="flex justify-between gap-x-3">
				<Button>Book Now</Button>

				{/* navigation sider button for small devices */}
				<button
					className="block md:hidden rounded-full hover:bg-secondary"
					onClick={() => setIsOpen(!isOpen)}>
					<RiMenu3Line className="w-10 h-10 p-2" />
				</button>
			</div>

			{/* navigation sider for small devices */}
			<motion.div
				initial={"closed"}
				animate={isOpen ? "open" : "closed"}
				variants={navigationAnimation}
				className="fixed top-0 right-0 h-full bg-emerald-600 z-50">
				{/* close button */}
				<motion.div
					initial={"closed"}
					animate={isOpen ? "open" : "closed"}
					variants={navigationAnimation}
					className="p-5 flex justify-end">
					<button
						className="top-5 right-5 rounded-full bg-secondary/20 text-white"
						onClick={() => setIsOpen(false)}>
						<RiCloseLine className="w-10 h-10 p-2" />
					</button>
				</motion.div>
				<ul className="flex flex-col p-5 gap-1 pe-0 text-white">
					{links.map((link, index) => (
						<li
							key={index}
							className={`${
								pathname.startsWith(link.href) ? "text-primary bg-white" : ""
							} flex hover:bg-white hover:text-primary rounded-s-full`}>
							<Link
								href={link.href}
								className="w-full py-2.5 ps-3">
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</motion.div>
		</nav>
	);
};
