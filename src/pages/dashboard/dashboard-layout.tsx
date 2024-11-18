import { Outlet } from "react-router-dom"
import Header from "./_components/header"
import Sidebar from "./_components/sidebar"


export default function DashboardLayout() {

    return (
            <div className="fixed inset-0 flex">
                <div className="hidden md:block w-[240px] border-r border-gray-200">
                    <Sidebar />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-[60px] border-b border-gray-200">
                        <Header />
                    </div>
                    <main className="flex-1 overflow-auto bg-background">
                        <div className="mx-auto py-6 px-10 h-full">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
    )
}
