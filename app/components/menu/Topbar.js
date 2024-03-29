import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
    Navbar,
    Button,
    NavbarToggler,

} from "reactstrap";

const Topbar = ({ toggleSidebar }) => {
    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

    return (
        <Navbar
            color="light"
            light
            className="navbar shadow-sm p-3 mb-5 bg-white rounded"
            expand="md"
        >
            <Button color="primary" outline onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
            <NavbarToggler onClick={toggleTopbar} />

        </Navbar>
    );
};

export default Topbar;
