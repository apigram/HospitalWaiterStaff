import React from 'react';
import PatientList from '../containers/management/patient_list'
import PatientDetail from '../containers/management/patient_detail'
import RequirementList from '../containers/management/requirement_list'
import RequirementDetail from '../containers/management/requirement_detail'
import MealList from '../containers/management/meal_list'
import MealDetail from '../containers/management/meal_detail'
import {TabPane, CardDeck} from 'reactstrap'

export default () => {
    return (
        <TabPane tabId="1">
            <CardDeck>
                <PatientList/>
                <PatientDetail/>
            </CardDeck>
            <br/>
            <CardDeck>
                <RequirementList/>
                <RequirementDetail/>
            </CardDeck>
            <br/>
            <CardDeck>
                <MealList/>
                <MealDetail/>
            </CardDeck>
            <br/>
        </TabPane>
    )
}