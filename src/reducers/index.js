import {combineReducers} from 'redux';
import RequirementsReducer from './reducer_requirements';
import MealsReducer from './reducer_meals';
import PatientsReducer from './reducer_patients';
import ActiveRequirementReducer from './reducer_active_requirement'
import ActivePatientReducer from './reducer_active_patient'
import ActiveMealReducer from './reducer_active_meal'

const rootReducer = combineReducers({
    patients: PatientsReducer,
    meals: MealsReducer,
    requirements: RequirementsReducer,
    activePatient: ActivePatientReducer,
    activeRequirement: ActiveRequirementReducer,
    activeMeal: ActiveMealReducer,
});

export default rootReducer;
