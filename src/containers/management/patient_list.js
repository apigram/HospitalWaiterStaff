import React, {Component} from 'react';
import {fetchPatients, selectPatient, addPatient, deletePatient} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PatientSearch from './patient_search_bar'
import Modal from 'react-modal';
import {Card, CardHeader, CardBody, CardLink, ListGroup, ListGroupItem, Row, Col, ButtonGroup, Button, Form, FormGroup, Input, Label} from 'reactstrap'

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

Modal.setAppElement('.container');

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

    removePatient(patient_uri) {
        this.props.deletePatient(patient_uri);
    }

    renderList() {
        return this.props.patients.map((patient) => {
            let listClass = 'action';
            if (this.props.activePatient !== null && patient.uri === this.props.activePatient.uri) {
                listClass = listClass + ' active';
            }
            return (
                <ListGroupItem key={patient.uri} className={listClass} >
                    <Row>
                        <Col sm="10" onClick={() => {this.props.selectPatient(patient.uri)}}>
                            {patient.first_name} {patient.last_name}
                        </Col>
                        <Col sm="2">
                            <Button type="button" color="danger" onClick={() => {this.removePatient(patient.uri)}}>Delete</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
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
            default:
                break;
        }
    }

    render() {
        return (
            <Card color="bg-light text-dark">
                <CardHeader tag="h2">Patients</CardHeader>
                <PatientSearch/>
                <ListGroup>
                    {this.renderList()}
                </ListGroup>
                <CardLink href="javascript:void(0)" onClick={this.openModal}>Add a new patient</CardLink>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Patient">
                    <Card color="bg-light text-dark">
                        <CardHeader tag="h2">
                            Add Patient
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="first_name">First Name:</Label>
                                    <Input name="first_name" type="text" onChange={this.handleChange}
                                           value={this.state.patient_first_name}/>
                                    <Label htmlFor="last_name">Last Name:</Label>
                                    <Input name="last_name" type="text" onChange={this.handleChange}
                                           value={this.state.patient_last_name}/>
                                    <Label htmlFor="email">Email Address:</Label>
                                    <Input name="email" type="email" onChange={this.handleChange}
                                           value={this.state.patient_email}/>
                                    <Label htmlFor="date_of_birth">Date of Birth:</Label>
                                    <Input name="date_of_birth" type="date" onChange={this.handleChange}
                                           value={this.state.patient_date_of_birth}/>
                                </FormGroup>
                                <ButtonGroup>
                                    <Button type="submit" color="primary">Create</Button>
                                    <Button type="button" color="danger"
                                            onClick={this.closeModal}>Cancel
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Modal>
            </Card>
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
    return bindActionCreators({fetchPatients, selectPatient, addPatient, deletePatient}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);