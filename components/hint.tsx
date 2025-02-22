import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface HintProps {
    label: string; // Fixed typo: "lablel" -> "label"
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({ label, children, side = "top", align = "center", sideOffset = 0, alignOffset = 0 }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="text-white bg-black border-black"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                >
                    <p className="font-semibold capitalize">
                        {label} {/* Fixed typo: "lablel" -> "label" */}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};