import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as DatasetsActions from "../../redux-state/actions/datasets";
import * as GeneralActions     from "../../redux-state/actions/general";

import DatasetList from "./DatasetList";

function mapStateToProps(state) {
  return {
    currentDataset: state.general["currentDataset"],
    datasets: state.datasets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    datasetActions: bindActionCreators(DatasetsActions, dispatch),
    generalActions: bindActionCreators(GeneralActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetList);