import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/placeholders/4.svg" width={140} height={140} alt="Empty"/>
            <h2 className="text-muted-foreground text-sm mt-2">No results found!</h2>
            <p>Try searching for something else</p>
        </div>
    )
}