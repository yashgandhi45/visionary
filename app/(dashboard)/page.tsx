"use client";
import { BoardList } from "./_components/boardlist";
import { EmptyOrg } from "./_components/emptyorg";
import { useOrganization } from "@clerk/nextjs";

interface DashBoardPageProps {
    searchParams : {
        search?:string;
        favorites?:string;
    }
}

export const DashBoardPage = ({searchParams}: DashBoardPageProps) => {
    const {organization} = useOrganization();
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {JSON.stringify(searchParams)}
            {!organization ? <EmptyOrg/> : (
                <BoardList orgId = {organization.id} query={searchParams}/>
            )}
        </div>
    )
}
export default DashBoardPage;