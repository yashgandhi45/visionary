"use client";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const EmptyBoards = () => {
    const {organization} = useOrganization();
    const create = useMutation(api.board.create);
    const onClick = () => {

        if(!organization) return;
        create ({
            orgId : organization.id,
            title : "Untitled"
        });
    };
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/Home.jpg" width={140} height={140} alt="Empty"/>
            <h2 className="text-muted-foreground text-sm mt-2">Create your first board!</h2>
            <p>Start by creating a board for your organization</p>
            <div className="mt-6">
                <Button onClick={onClick} size="lg">Create Board</Button>
            </div>
        </div>
    )
}