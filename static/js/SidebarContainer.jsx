import { connect } from "react-redux";

import Sidebar from "./Sidebar";

function mapStateToProps(state) {
    return {
        activeSidebarTab: state.ui
    };
}

export default connect(
  mapStateToProps,
)(Sidebar);