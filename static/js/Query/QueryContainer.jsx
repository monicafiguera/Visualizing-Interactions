import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {changeActiveSidebarTab} from "../../redux-state/actions/ui";

import Query from "./Query.jsx";

function mapStateToProps(state) {
    return {
        currentDataset: state.general["currentDataset"]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeActiveSidebarTab: (index) => dispatch(changeActiveSidebarTab(index))
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Query);