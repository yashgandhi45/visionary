"use client";

import { use } from "react";
import { BoardList } from "./_components/boardlist";
import { EmptyOrg } from "./_components/emptyorg";
import { useOrganization } from "@clerk/nextjs";

interface DashBoardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const DashBoardPage = (props: DashBoardPageProps) => {
  const searchParams = use(props.searchParams);
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={searchParams} />}
    </div>
  );
};

export default DashBoardPage;
