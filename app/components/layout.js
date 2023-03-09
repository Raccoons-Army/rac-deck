import React, { useState } from "react";
import SideBar from "./sidebar/SideBar";
import Content from "./sidebar/Content";

export default function Layout({ children }) {

    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <>
            <main>
                <div className="App wrapper">
                    <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
                    <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} >{children}</Content>


                </div>

            </main>
        </>
    )
}