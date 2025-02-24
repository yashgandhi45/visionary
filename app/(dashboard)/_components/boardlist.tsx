"use client";

import { EmptySearch } from "./emptysearch";
import { EmptyFavorites } from "./emptyfavorites";
import { EmptyBoards } from "./emptyboards";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export const BoardList = ({orgId, query}: BoardListProps) => {
    const data = [];
    if(!data?.length && query.search) return <EmptySearch/>;
    if(!data?.length && query.favorites) return <EmptyFavorites/>;
    if(!data?.length) return <EmptyBoards/>;
    return (
        <div>
            {JSON.stringify(query)}
        </div>
    )
}