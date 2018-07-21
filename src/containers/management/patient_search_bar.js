import React, {Component} from 'react'
import {fetchPatients} from '../../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CardBody, Form, FormGroup, Input} from 'reactstrap';

class PatientSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {criteria: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchPatients(this.state.criteria);
    }

    handleChange(event) {
        this.setState({criteria: event.target.value})
    }

    render() {
        return (
            <CardBody>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input
                        type="search"
                        name="criteria"
                        value={this.state.criteria}
                        onChange={this.handleChange}
                        placeholder="Search for a patient..."/>
                    </FormGroup>
                </Form>
            </CardBody>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPatients}, dispatch);
}

export default connect(null, mapDispatchToProps)(PatientSearch);