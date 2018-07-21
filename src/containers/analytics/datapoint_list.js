import React, {Component} from 'react';
import {Card, CardBody, CardText, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchDatapoints} from '../../actions/index';

class DatapointList extends Component {
    constructor(props) {
        super(props);

        this.selectDatapoint = this.selectDatapoint.bind(this);
    }

    selectDatapoint() {

    }

    renderList() {
        return this.props.datapoints.map((datapoint) => {
            return (
                <ListGroupItem key={datapoint.title} onClick={this.selectDatapoint}>
                    <ListGroupItemHeading>{datapoint.title}</ListGroupItemHeading>
                </ListGroupItem>
            );
        });
    }

    render() {
        if (this.props.activeDataset && this.props.datapoints) {
            return (
                <Card>
                    <ListGroup>
                        {this.renderList()}
                    </ListGroup>
                </Card>
            )
        } else {
            return (
                <Card>
                    <CardBody>
                        <CardText>Please select a dataset.</CardText>
                    </CardBody>
                </Card>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        activeDataset: state.activeDataset,
        datapoints: state.datapoints
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchDatapoints}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DatapointList);