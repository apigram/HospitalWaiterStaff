import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class RequirementDetail extends Component {
    render() {
        if (!this.props.activeRequirement) {
            return <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a requirement to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card text-white bg-info">
                <h2 className="card-header">{this.props.activeRequirement.label}</h2>
                <div className="card-body">
                    <p>Type: {_.find(this.props.requirementTypes, {'value': this.props.activeRequirement.type}).key}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeRequirement: state.activeRequirement,
        requirementTypes: state.requirementTypes
    }
}
export default connect(mapStateToProps, null)(RequirementDetail);