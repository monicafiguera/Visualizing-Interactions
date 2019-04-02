import React from "react";
import {
    Col,
    Row } from "reactstrap";

import DatasetListContainer from "./DatasetListContainer";

import diagram from "./diagram";
import wcrd from '../queries/wcrd';
import wncrd from '../queries/wncrd';

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
            var ddi = wcrd.get_ddi();
            var pubMed = wcrd.get_pubMed();
            var ddi_pubMed = wcrd.get_ddi_pubMed();

            this.props.fetchCount(ddi);
            this.props.fetchCount(pubMed);
            this.props.fetchCount(ddi_pubMed);

            if (currentDataset === "crd") {
                var crd = wcrd.get_crd();
                var ddi_crd = wcrd.get_ddi_crd();
                var crd_pubMed = wcrd.get_crd_pubMed();
                var ddi_crd_pubMed = wcrd.get_ddi_crd_pubMed();

                this.props.fetchCount(crd);
                this.props.fetchCount(ddi_crd);
                this.props.fetchCount(crd_pubMed);
                this.props.fetchCount(ddi_crd_pubMed);
            } else {
                var ncrd = wncrd.get_ncrd();
                var ddi_ncrd = wncrd.get_ddi_ncrd();
                var ncrd_pubMed = wncrd.get_ncrd_pubMed();
                var ddi_ncrd_pubMed = wncrd.get_ddi_ncrd_pubMed();

                this.props.fetchCount(ncrd);
                this.props.fetchCount(ddi_ncrd);
                this.props.fetchCount(ncrd_pubMed);
                this.props.fetchCount(ddi_ncrd_pubMed);
            }
        }

        if (this.props.data !== prevProps.data) {
            console.log("current",this.props.datasets[currentDataset]);

            diagram.buildDiagram(currentDataset);
            diagram.repaint(this.props.data);
        }
    }

    render() {
        return (
            <div id="body-container" className="contents-container">
                <Row className="body-content-header">
					<Col lg="12">
						<h3 className="title" style={{color: "black"}}>Analysis Drug-Drug Interactions</h3>
						<div tabIndex="-1" className="sidebar-divider"></div>
					</Col>
				</Row>

                <Row>
                    <Col lg="6">
                        <DatasetListContainer />
                    </Col>
                </Row>

                <Row>
                    <Col lg="12">
                        <div id="venn"></div>
                    </Col>
                </Row>

            </div>
        );
    }
}