"use client";
import qs from "query-string";
import {Search} from "lucide-react"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";


export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounce(value, 500); // Use debounced value

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value); // Update the input value
    };

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: {
                    search: debouncedValue, // Use debounced value in the query
                },
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.push(url); // Update the URL
    }, [debouncedValue, router]);
    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
            <Input className="w-full max-w-[516px] pl-9" placeholder="Search Boards" onChange={handleChange} value={value}/>
        </div>
    )
}