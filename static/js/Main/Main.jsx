import React from "react";
import {
    Row,
    Col,
    CardHeader,
    CardBody,
    Card,
    CardFooter
} from 'reactstrap';
import DatasetListContainer from './DatasetListContainer';

import diagram from "./diagram";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.changeActiveSidebarTab(0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentDataset } = this.props;

        if (currentDataset !== '' && currentDataset !== prevProps.currentDataset) {
            diagram.buildDiagram(currentDataset);
        }
    }

    render() {
        return (
            <div id="body-container" className="dashboard-container">

                <h3 className="title page-header" style={{color: "black"}}>Analysis Drug-Drug Interactions</h3>
                <div tabIndex="-1" className="sidebar-divider"></div>

                <div id="page-wrapper">
                    <Row>
                        <Col lg="6">
                            <DatasetListContainer />
                        </Col>
                    </Row>

                    <Row>

                        <div id="venn"></div>

                    </Row>
                </div>
            </div>
        );
    }
}