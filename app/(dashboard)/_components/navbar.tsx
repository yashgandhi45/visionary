"use client";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./sidebar/searchInput";
import { InviteButton } from "./invitebutton";

export const Navbar = () => {
    const {organization} = useOrganization();
    return (
        <div className="flex gap-x-4 p-5 items-center ">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
            <OrganizationSwitcher hidePersonal appearance={{
                elements:{
                    rootBox:{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "360px",
                    },
                    organizationSwitcherTrigger:{
                        padding: "6px",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                    }
                }
            }}/>
            </div>
            {organization && <InviteButton/>}
            <UserButton/>
        </div>
    )
}