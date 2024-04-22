import Link from "next/link";
import React from "react";


const NotFound = () => {
	return (
		<section className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-4xl md:text-5xl mb-8">404 | Page Not Found</h1>
			<Link
				href={"/"}
				className="bg-emerald-600 p-2 rounded-md hover:bg-emerald-700 duration-300 text-white">
				Go back to home
			</Link>
		</section>
	);
};

export default NotFound;
