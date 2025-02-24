import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavorite: boolean;
    onClick: () => void;
    disabled: boolean
}

export const Footer = ({title, authorLabel, createdAtLabel, isFavorite, onClick, disabled}:FooterProps) => {
    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p>
                {authorLabel}, {createdAtLabel}
            </p>
        </div>
    )
}