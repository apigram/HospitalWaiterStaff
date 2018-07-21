import {combineReducers} from 'redux';
import RequirementsReducer from './management/reducer_requirements';
import MealsReducer from './management/reducer_meals';
import PatientsReducer from './management/reducer_patients';
import ActiveRequirementReducer from './management/reducer_active_requirement'
import ActivePatientReducer from './management/reducer_active_patient'
import ActiveMealReducer from './management/reducer_active_meal'
import RequirementTypesReducer from './management/reducer_requirement_types';
import MealTimesReducer from './management/reducer_meal_times';
import AuthReducer from './reducer_auth'
import ActivePatientRequirementReducer from './management/reducer_active_patient_requirement';
import ActiveMealRequirementReducer from './management/reducer_active_meal_requirement';

const rootReducer = combineReducers({
    patients: PatientsReducer,
    meals: MealsReducer,
    requirements: RequirementsReducer,
    activePatient: ActivePatientReducer,
    activeRequirement: ActiveRequirementReducer,
    activeMeal: ActiveMealReducer,
    requirementTypes: RequirementTypesReducer,
    mealTimes: MealTimesReducer,
    activeUser: AuthReducer,
    activePatientRequirements: ActivePatientRequirementReducer,
    activeMealRequirements: ActiveMealRequirementReducer
});

export default rootReducer;
