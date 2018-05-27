import React, {Component} from 'react';
import {connect} from 'react-redux';

class RequirementDetail extends Component {
    render() {
        if (!this.props.activeRequirement) {
            return <div className="card bg-light text-dark">
                <div className="card-body">
                    <p>Select a requirement to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">{this.props.activeRequirement.label}</h2>
                <div className="card-body">
                    <p>Quantity: {this.props.activeRequirement.type}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeRequirement: state.activeRequirement,
    }
}
export default connect(mapStateToProps, null)(RequirementDetail);