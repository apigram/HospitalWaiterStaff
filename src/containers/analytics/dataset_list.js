import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchDatasets} from '../../actions/index';

class DatapointList extends Component {
    constructor(props) {
        super(props);

        this.selectDataset = this.selectDataset.bind(this);
    }

    selectDataset() {

    }

    renderList() {
        return this.props.datasets.map((dataset) => {
            return (
                <ListGroupItem key={dataset.label} onClick={this.selectDataset}>
                    <ListGroupItemHeading>{dataset.label}</ListGroupItemHeading>
                </ListGroupItem>
            );
        });
    }

    render() {
        return (
            <Card>
                <ListGroup>
                    {this.renderList()}
                </ListGroup>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeDataset: state.activeDataset,
        datasets: state.datapoints
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchDatasets}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DatapointList);