import React, {Component} from 'react';
import '../App.css';
import PatientList from '../containers/patient_list'
import PatientDetail from '../containers/patient_detail'
import RequirementList from '../containers/requirement_list'
import RequirementDetail from '../containers/requirement_detail'
import MealList from '../containers/meal_list'
import MealDetail from '../containers/meal_detail'
import LoginForm from '../containers/login_form';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchRequirementTypes, fetchMealTimes} from "../actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.props.fetchRequirementTypes();
        this.props.fetchMealTimes();
    }

    render() {
        if (this.props.activeUser !== null) {
            return (
                <div className="App">
                    <nav className="navbar navbar-expand-sm bg-secondary text-white">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Import from PAS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Reconcile MHR</a>
                            </li>
                        </ul>
                    </nav>
                    <h1>Hospital Waiter - Management</h1>
                    <div className="card-deck">
                        <PatientList/>
                        <PatientDetail/>
                    </div>
                    <br/>
                    <div className="card-deck">
                        <RequirementList/>
                        <RequirementDetail/>
                    </div>
                    <br/>
                    <div className="card-deck">
                        <MealList/>
                        <MealDetail/>
                    </div>
                    <br/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <h1>Hospital Waiter - Management</h1>
                    <LoginForm/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRequirementTypes, fetchMealTimes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
