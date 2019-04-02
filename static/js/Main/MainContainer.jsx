import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Main from "./Main";

import * as DataActions     from '../../redux-state/actions/data';
import * as DataInfoActions from '../../redux-state/actions/datasets';
import { changeActiveSidebarTab } from "../../redux-state/actions/ui";
import { fetchCount } from "../../redux-state/actions/data";
import * as GeneralActions from "../../redux-state/actions/general";

function mapStateToProps(state) {
    return {
        currentDataset: state.general["currentDataset"],
        data: state.data,
        datasets: state.datasets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dataActions: bindActionCreators(DataActions, dispatch),
        dataInfoActions: bindActionCreators(DataInfoActions, dispatch),
        generalActions: bindActionCreators(GeneralActions, dispatch),
        changeActiveSidebarTab: (index) => dispatch(changeActiveSidebarTab(index)),
        fetchCount: (query) => dispatch(fetchCount(query))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);