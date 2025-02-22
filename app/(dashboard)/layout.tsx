import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/orgsidebar";
import { Sidebar } from "./_components/sidebar";

interface DashBoardLayoutProps {
    children: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
    return(
        <main className="h-full">
            <Sidebar/>
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar/>
                    <div className="h-full flex-1">
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashBoardLayout;