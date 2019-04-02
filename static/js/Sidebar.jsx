import React from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    Nav,
    NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faSitemap } from "@fortawesome/free-solid-svg-icons";

const data = [
    { id: 0, name: "Interactions",     icon: faSitemap, link: "/" },
    { id: 1, name: "Query",            icon: faSearch,   link: "/query" }
];

const Sidebar = ({activeSidebarTab}) => {
    return (
        <div id="sidebar-nav">
            <Navbar color="light" light>
                <Collapse isOpen={true} navbar>

                    <Nav className="ml-auto" navbar>

                        {data.map((elem, i) => {
                            return (
                                <NavItem key={i}
                                         className={elem.id === activeSidebarTab ? "active" : ""}
                                >
                                    <Link to={elem.link}>
                                        <FontAwesomeIcon icon={elem.icon} style={{color: "black"}}/>
                                        {elem.name}
                                    </Link>
                                </NavItem>
                            );
                        })}

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Sidebar;