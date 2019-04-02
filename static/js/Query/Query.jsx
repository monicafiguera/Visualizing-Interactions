import React, { Component } from "react";

import {
	Card,
	CardHeader,
	CardBody,
	Col,
	Row } from "reactstrap";

import DatasetListContainer from "../Main/DatasetListContainer";

import load from './load';

var crdQuery = `SELECT  distinct (COUNT(?d1) as ?crd)
        WHERE {
            ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2.
        }
    `;

var intersCRDPUB = `SELECT distinct (COUNT(?d1) as ?crd_pubMed)
    {
    {
    SELECT distinct ?d1 ?d2
    WHERE {
    ?interaction a <http://project-iasis.eu/vocab/EffectInteraction>.
    ?interaction <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/PubMed>.
    ?interaction <http://project-iasis.eu/vocab/isAffected> ?d1.
    ?interaction <http://project-iasis.eu/vocab/affects> ?d2.
    ?d1 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d2
    }
    }
    UNION
    {
    SELECT distinct ?d1 ?d2
    WHERE {
    ?interaction a <http://project-iasis.eu/vocab/EffectInteraction>.
    ?interaction <http://project-iasis.eu/vocab/provenance> <http://project-iasis.eu/SourceName/PubMed>.
    ?interaction <http://project-iasis.eu/vocab/isAffected> ?d1.
    ?interaction <http://project-iasis.eu/vocab/affects> ?d2.
    ?d2 <http://project-iasis.eu/vocab/drugDrugInteraction_sameCYP> ?d1
    }
    }
    }
    `;

export default class Query extends Component {
	constructor(props) {
		super(props);

		this.state = { firstTimeLoaded: false };
		this.loadQueryBox = this.loadQueryBox.bind(this);
	}

	componentDidMount() {
	    this.props.changeActiveSidebarTab(1);
		this.loadQueryBox();
		load.load();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentFed !== "" && this.props.currentFed !== prevProps.currentFed) {
			if (!this.state.firstTimeLoaded) {
	        	this.loadQueryBox();
			}
		}
	}

	loadQueryBox() {
		console.log("loading box...");
		this.setState({firstTimeLoaded: true});
	}

    render() {
        return (
            <div id="body-container" className="contents-container">
				<Row className="body-content-header">
					<Col lg="12">
						<h3 className="title" style={{color: "black"}}>Query</h3>
						<div tabIndex="-1" className="sidebar-divider"></div>
					</Col>
				</Row>

				{/*<Row>
					<Col lg="6">
						<DatasetListContainer />
					</Col>
				</Row>*/}

				<Row id="queryrow" style={{display: "flex"}}>

					<Col lg="8">
						<div id="yasqe"></div>
						<div id="yasr"></div>
						{/*<div className="form-group">
							<label className="control-label " htmlFor="timeout">Timeout</label>
							<input className="form-control" id="timeout" name="timeout" type="text"/>
						</div>*/}
					</Col>
					<Col lg="4">
						<Card>
							<CardHeader className="panel-heading">
								Example Queries
							</CardHeader>
							<CardBody className="panel-body">
								<ul>
									<li id="sampleCRD">
										Get CRD
									</li>
									<li id="sampleInteractions">
										Get interactions between CRD and PubMedDDI
									</li>
								</ul>
							</CardBody>
						</Card>
					</Col>
				</Row>


				{/*<Row id="resultrow">
					<Col lg="12">
						<Card className="panel panel-default">
							<p><b><span id="resstatus" style="color:red"></span></b></p>
							<CardHeader className="panel-heading" id="resultinfo">
								Results
								<div className="pull-right">
									<p>
										<b>1st Result time:
										<span id="frestime" style={{color:"#D2691E"}}></span>
										</b> &nbsp;|&nbsp;
										<b>Execution time:
										<span id="exetime" style={{color:"#D2691E"}}></span>
										</b>
									</p>

								</div>
							</CardHeader>

							<CardBody className="panel-body" id="results">
								<table width="100%" className="table display table-striped table-bordered table-hover"
									   id="dataTables-example">

								</table>
							</CardBody>

						</Card>
					</Col>
				</Row>*/}
     	    </div>
        );
    }
}