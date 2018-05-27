import React, {Component} from 'react';
import '../App.css';
import PatientList from '../containers/patient_list'
import PatientDetail from '../containers/patient_detail'
import RequirementList from '../containers/requirement_list'
import RequirementDetail from '../containers/requirement_detail'
import MealList from '../containers/meal_list'
import MealDetail from '../containers/meal_detail'

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
        return (
            <div className="App">
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
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRequirementTypes, fetchMealTimes}, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
