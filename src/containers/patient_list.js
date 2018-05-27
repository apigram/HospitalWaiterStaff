import React, {Component} from 'react';
import {fetchPatients, selectPatient} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PatientSearch from './patient_search_bar'

class PatientList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchPatients();
    }

    renderList() {
        return this.props.patients.map((patient) => {
            return <li key={patient.uri} className="list-group-item"
            onClick={() => {this.props.selectPatient(patient.uri)}}>{patient.first_name} {patient.last_name}</li>
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Patients</h2>
                <PatientSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        patients: state.patients,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPatients, selectPatient}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);