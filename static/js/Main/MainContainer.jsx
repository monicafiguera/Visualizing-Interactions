import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Main from "./Main";

import * as DataInfoActions from '../../redux-state/actions/datasets';
import { changeActiveSidebarTab } from "../../redux-state/actions/ui";
import { fetchCount } from "../../redux-state/actions/data";

function mapStateToProps(state) {
    return {
        currentDataset: state.general["currentDataset"],
        data: state.data,
        datasets: state.datasets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dataInfoActions: bindActionCreators(DataInfoActions, dispatch),
        changeActiveSidebarTab: (index) => dispatch(changeActiveSidebarTab(index)),
        fetchCount: (query) => dispatch(fetchCount(query))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);