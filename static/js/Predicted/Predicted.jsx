import React from "react";
import {
    Col,
    Row } from "reactstrap";

import diagram from "./diagram";

import DatasetListContainer from "./DatasetListContainer";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.changeActiveSidebarTab(1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentDataset } = this.props;

        if (currentDataset !== '' && currentDataset !== prevProps.currentDataset) {

            var paintingNr = 1;

            //this.props.fetchCount(ddi);
            //this.props.fetchCount(pubMed);
            //this.props.fetchCount(ddi_pubMed);

            if (currentDataset === "blm") {
                paintingNr = 1;
            } else if (currentDataset === "laprls") {
                paintingNr = 2;
            }

            //console.log("current",this.props.datasets[currentDataset]);

            diagram.buildDiagram(currentDataset);


            diagram.repaint(paintingNr);

        }


    }

    componentWillUnmount() {
        this.props.generalActions.setCurrentDataset('');
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