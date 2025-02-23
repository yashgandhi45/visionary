import { Button } from "@/components/ui/button";
import Image from "next/image";

export const EmptyBoards = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/Home.jpg" width={140} height={140} alt="Empty"/>
            <h2 className="text-muted-foreground text-sm mt-2">Create your first board!</h2>
            <p>Start by creating a board for your organization</p>
            <div className="mt-6">
                <Button size="lg">Create Board</Button>
            </div>
        </div>
    )
}