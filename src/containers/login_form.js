import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../actions'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({username: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            default:
                break;
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username} className="form-control"/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} className="form-control"/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);