import React from "react";

export default class DatasetList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSelectedDataset: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        //this.props.fedActions.fetchFeds('/api/federations');
    }


    handleChange(event) {
        var selected = event.target.value;
        this.setState({currentSelectedDataset: selected});
        this.props.generalActions.setCurrentDataset(selected);
    }

    render() {
        const { datasets } = this.props;
        const { currentSelectedDataset } = this.state;

        return (
            <div className="form-group form-control-lg">
                <select className="form-control " id="datasetlist"
                        value={currentSelectedDataset} onChange={this.handleChange}>
                    <option value="">Choose data to interact...</option>
                    {Object.keys(datasets).map((uri, index) => {
                        return <option key={index} value={uri}>{datasets[uri].name}</option>
                    })}
                </select>
            </div>
        );
    }
}