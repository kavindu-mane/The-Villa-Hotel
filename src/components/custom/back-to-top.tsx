"use client";
import { FC, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

export const BackToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <button
      className={`fixed bottom-24 right-7 z-[999] flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white outline-none duration-200 ease-in ${
        isVisible ? "scale-100" : "scale-0"
      }`}
      onClick={scrollToTop}
    >
      <MdKeyboardDoubleArrowUp className="h-6 w-6" />
    </button>
  );
};
