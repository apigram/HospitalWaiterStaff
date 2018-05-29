import React, {Component} from 'react';
import {connect} from 'react-redux';
import {savePatient} from "../actions";
import {bindActionCreators} from 'redux';

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
            <div className="card text-white bg-info">
                <h2 className="card-header">{this.props.activePatient.first_name} {this.props.activePatient.last_name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name:</label>
                            <input type="text" name="first_name" onChange={this.handleChange}
                                   value={this.state.first_name} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name:</label>
                            <input type="text" name="first_name" onChange={this.handleChange}
                                   value={this.state.last_name} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_of_birth">Date of Birth:</label>
                            <input type="date" name="first_name" onChange={this.handleChange}
                                   value={this.state.date_of_birth} className="form-control"/>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
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