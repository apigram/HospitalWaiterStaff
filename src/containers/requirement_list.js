import React, {Component} from 'react';
import {fetchRequirements, selectRequirement} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class RequirementList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchRequirements();
    }

    renderList() {
        return this.props.requirements.map((requirement) => {
            return <li key={requirement.uri} className="list-group-item"
                       onClick={() => {this.props.selectRequirement(requirement.uri)}}>{requirement.label}</li>
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Requirements</h2>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        requirements: state.requirements,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRequirements, selectRequirement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequirementList);