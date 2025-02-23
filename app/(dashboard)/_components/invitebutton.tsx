import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2"/>
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                Just to avoid warnings
      </DialogDescription>
                <OrganizationProfile routing="hash"/>
            </DialogContent>
        </Dialog>
    )
}