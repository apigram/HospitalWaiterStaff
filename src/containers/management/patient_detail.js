import React, {Component} from 'react';
import {connect} from 'react-redux';
import {savePatient} from "../../actions/index";
import {bindActionCreators} from 'redux';
import PatientRequirementList from './patient_requirement_list';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';

class PatientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            first_name: '',
            last_name: '',
            date_of_birth: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activePatient.uri !== prevState.uri) {
            this.setState({uri: this.props.activePatient.uri});
            if (this.props.activePatient.first_name !== prevState.first_name) {
                this.setState({first_name: this.props.activePatient.first_name})
            }
            if (this.props.activePatient.last_name !== prevState.last_name) {
                this.setState({last_name: this.props.activePatient.last_name})
            }
            if (this.props.activePatient.date_of_birth !== prevState.date_of_birth) {
                this.setState({date_of_birth: this.props.activePatient.date_of_birth})
            }
        }

    }

    handleChange(event) {
        switch (event.target.name) {
            case 'first_name':
                this.setState({first_name: event.target.value});
                break;
            case 'last_name':
                this.setState({last_name: event.target.value});
                break;
            case 'date_of_birth':
                this.setState({date_of_birth: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const patientData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            date_of_birth: this.state.date_of_birth
        };
        this.props.savePatient(this.props.activePatient.uri, patientData);
    }

    render() {
        if (!this.props.activePatient) {
            return <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a patient to view details.</p>
                </div>
            </div>
        }
        return (
            <Card color="info">
                <CardHeader tag="h2">{this.props.activePatient.first_name} {this.props.activePatient.last_name}</CardHeader>
                <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="first_name">First Name:</Label>
                            <Input type="text" name="first_name" onChange={this.handleChange}
                                   value={this.state.first_name} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="last_name">Last Name:</Label>
                            <Input type="text" name="first_name" onChange={this.handleChange}
                                   value={this.state.last_name} />

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="date_of_birth">Date of Birth:</Label>
                            <Input type="date" name="first_name" onChange={this.handleChange}
                                   value={this.state.date_of_birth} />
                        </FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                    </Form>
                    <br/>
                    <PatientRequirementList/>
                </CardBody>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        activePatient: state.activePatient,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({savePatient}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);