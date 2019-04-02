import React from "react";
import Endpoint from "./Endpoint";

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
      <div id={"header-navbar"}>
        <Endpoint/>
      </div>
    );
  }
}