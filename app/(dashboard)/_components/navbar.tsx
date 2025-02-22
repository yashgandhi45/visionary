"use client";

import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <div className="flex gap-x-4 p-5 items-center bg-green-500">
            <div className="hidden lg:flex lg:flex-1">
                {/* Add Search */}
            </div>
            <UserButton/>
        </div>
    )
}