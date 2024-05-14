"use client";

import { FC } from "react";

export const ExploreHero: FC = () => {
    return (
        <header>
        <div className="w-full bg-center bg-cover h-[25rem]" style={{ backgroundImage: "url('/images/img_28.jpg')" }}>
            <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20">
                    <h1 className="text-4xl font-semibold text-white md:text-5xl lg:text-6xl uppercase">Things to do</h1>
                    <p className="text-lg font-light text-white mt-2 md:text-xl lg:text-2xl lg:px-20">
                        Uncover nearby wonders from our hotel's doorstep, offering endless exploration for every guest
                    </p>
                </div>
            </div>
        </div>
    </header>
    );
  };