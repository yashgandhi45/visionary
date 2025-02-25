"use client";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useapimutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const router = useRouter();
    const {organization} = useOrganization();
    const {mutate,pending} = useApiMutation(api.board.create);
    const onClick = () => {

        if(!organization) return;
        mutate ({
            orgId : organization.id,
            title : "Untitled"
        })
        .then((id)=>{
            toast.success("Board Created");
            router.push(`/board/${id}`);
        })
        .catch(()=> toast.error("Failed to create board"));
    };
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/placeholders/1.svg" width={140} height={140} alt="Empty"/>
            <h2 className="text-muted-foreground text-sm mt-2">Create your first board!</h2>
            <p>Start by creating a board for your organization</p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">Create Board</Button>
            </div>
        </div>
    )
}