import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Global from '../redux-state/singleton.js';

export default class Endpoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: Global.endpoint};

        this.handleChange = this.handleChange.bind(this);
        this.setEndpoint = this.setEndpoint.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    setEndpoint() {
        Global.setEndpoint(this.state.name);
    }

    render() {
        return(
            <div id="header-navbar-endpoint">
                <label htmlFor="name" className={"label-endpoint"}>Endpoint:</label>
                <input type="url" name="name" id="name"
                       placeholder="http://dbpedia.org/sparql"
                       className="text ui-widget-content ui-corner-all input-endpoint-name"
                       value={this.state.name}
                       onChange={this.handleChange} />
                <button onClick={this.setEndpoint} className="btn btn-default button-save">
                    <FontAwesomeIcon icon={faCheck} style={{color: "black"}}/>
                </button>
            </div>
        );
    }

}
