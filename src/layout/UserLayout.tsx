import { Outlet } from "react-router-dom";
import Navbar from "./Navbav";
import Sidebar from "./Sidebar";

function UserLayout() {
    return (
        <>
            <Navbar />
            <div className="globals-layout">
                <div className="flex ">
                    <div className="hidden md:block border-e">
                        <Sidebar />
                    </div>
                    {/* <Sidebar2 /> */}
                    <div className="w-[100vw] md:px-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserLayout