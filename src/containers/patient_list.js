import React, {Component} from 'react';
import {fetchPatients, selectPatient, addPatient} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PatientSearch from './patient_search_bar'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement(document.querySelector('.App'));

class PatientList extends Component {

    constructor(props) {
        super(props);
        this.props.fetchPatients();
        this.state = {
            modalIsOpen: false,
            patient_first_name: '',
            patient_last_name: '',
            patient_email: '',
            patient_date_of_birth: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    renderList() {
        return this.props.patients.map((patient) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activePatient !== null && patient.uri === this.props.activePatient.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={patient.uri} className={listClass} onClick={() => {
                    this.props.selectPatient(patient.uri)
                }}>
                    <div className="row">
                        <div className="col-sm-10">
                            {patient.first_name} {patient.last_name}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPatient({
            first_name: this.state.patient_first_name,
            last_name: this.state.patient_last_name,
            email: this.state.patient_email,
            date_of_birth: this.state.patient_date_of_birth,
        });
        this.closeModal();
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'first_name':
                this.setState({patient_first_name: event.target.value});
                break;
            case 'last_name':
                this.setState({patient_last_name: event.target.value});
                break;
            case 'email':
                this.setState({patient_email: event.target.value});
                break;
            case 'date_of_birth':
                this.setState({patient_date_of_birth: event.target.value});
                break;
        }
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Patients</h2>
                <PatientSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
                <div className="card-link">
                    <a href="javascript:void(0)" onClick={this.openModal}>Add a new patient</a>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add Patient">
                        <div className="card bg-light text-dark">
                            <div className="card-header">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Add Patient</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name:</label>
                                        <input name="first_name" type="text" onChange={this.handleChange}
                                               value={this.state.patient_first_name} className="form-control"/>
                                        <label htmlFor="last_name">Last Name:</label>
                                        <input name="last_name" type="text" onChange={this.handleChange}
                                               value={this.state.patient_last_name} className="form-control"/>
                                        <label htmlFor="email">Email Address:</label>
                                        <input name="email" type="email" onChange={this.handleChange}
                                               value={this.state.patient_email} className="form-control"/>
                                        <label htmlFor="date_of_birth">Date of Birth:</label>
                                        <input name="date_of_birth" type="date" onChange={this.handleChange}
                                               value={this.state.patient_date_of_birth} className="form-control"/>
                                    </div>
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary">Create</button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={this.closeModal}>Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        patients: state.patients,
        activePatient: state.activePatient
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPatients, selectPatient, addPatient}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);