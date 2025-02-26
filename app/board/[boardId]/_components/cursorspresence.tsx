"use client";

import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds() || []; // Safe fallback to an empty array
    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId} // Ensure connectionId is unique
                    connectionId={connectionId}
                />
            ))}
        </>
    );
};

export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence";
