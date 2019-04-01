import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    /*NavItem,
    NavLink,*/
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faAngleRight,
    faBell,
    faCog,
    faEnvelope,
    faSignOutAlt,
    faTasks,
    faUpload,
    faUser } from "@fortawesome/free-solid-svg-icons";


export default class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div id="header-navbar">
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">Ontario Semantic DataLake</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/*<NavItem>
                  <NavLink href="#">
                    <FontAwesomeIcon icon={faEnvelope} style={{color: "black"}}/>
                  </NavLink>
                </NavItem>*/}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faEnvelope} style={{color: "black"}}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Admin
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Read All Messages
                    <FontAwesomeIcon icon={faAngleRight} style={{color: "black", marginLeft: '6px', paddingTop: '2px'}}/>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
 
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faTasks} style={{color: "black"}}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    ...
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    See All Tasks
                    <FontAwesomeIcon icon={faAngleRight} style={{color: "black", marginLeft: '6px', paddingTop: '2px'}}/>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
             

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faBell} style={{color: "black"}}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <FontAwesomeIcon icon={faUpload} style={{color: "black", marginRight: '6px', paddingTop: '2px'}}/>
                    Server Rebooted
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    See All Alerts
                    <FontAwesomeIcon icon={faAngleRight} style={{color: "black", marginLeft: '6px', paddingTop: '2px'}}/>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faUser} style={{color: "black"}}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <FontAwesomeIcon icon={faUser} style={{color: "black", marginRight: '6px', paddingTop: '2px'}}/>                  
                    User Profile
                  </DropdownItem>
                  <DropdownItem>
                    <FontAwesomeIcon icon={faCog} style={{color: "black", marginRight: '6px', paddingTop: '2px'}}/>                  
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{color: "black", marginRight: '6px', paddingTop: '2px'}}/>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}