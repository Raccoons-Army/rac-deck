import React, { useState } from "react";
import SideBar from "./menu/SideBar";
import Content from "./menu/Content";


export default function Layout({ children }, props) {

    // side bar
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <>
            <main>
                <div className="App wrapper">
                    <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} connections={children.props} />
                    <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} >{children}</Content>
                </div>

            </main>
        </>
    )
}