"use client";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useapimutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirmmodal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
}

export const Actions = ({children, side, sideOffset, id, title}:ActionsProps) => {
    const {onOpen} = useRenameModal();
    const {mutate, pending} = useApiMutation(api.board.remove)
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
            .then(()=> toast.success("Link Copied"))
            .catch(()=> toast.error("Failed to copy link"))
    }

    const onDelete = () => {
        mutate({ id })
            .then(()=>toast.success("Board deleted"))
            .catch(()=>toast.error("Failed to deleted board"))
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e)=>e.stopPropagation()} side={side} sideOffset={sideOffset} className="w-60">
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={()=>onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal header="Delete board?" description="This will delete the board and all of its contents." disabled={pending} onConfirm={onDelete}>
                <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal" >
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};