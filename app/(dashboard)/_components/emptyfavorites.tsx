import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/placeholders/3.svg" width={140} height={140} alt="Empty Favorites"/>
            <h2 className="text-muted-foreground text-sm mt-2">No favorite boards!</h2>
            <p className="text-muted-foreground text-sm mt-2">Try favoriting a board</p>
        </div>
    )
}