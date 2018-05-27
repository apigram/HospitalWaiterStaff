import React, {Component} from 'react';
import {connect} from 'react-redux';

class PatientDetail extends Component {
    render() {
        if (!this.props.activePatient) {
            return <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a patient to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card text-white bg-info">
                <h2 className="card-header">{this.props.activePatient.first_name} {this.props.activePatient.last_name}</h2>
                <div className="card-body">
                    <p>Date of birth: {this.props.activePatient.date_of_birth}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activePatient: state.activePatient,
    }
}
export default connect(mapStateToProps, null)(PatientDetail);