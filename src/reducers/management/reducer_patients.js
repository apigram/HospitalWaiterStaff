import {FETCH_PATIENTS, ADD_PATIENT, SAVE_PATIENT, DELETE_PATIENT} from '../../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return action.payload.data.patients;
        case ADD_PATIENT:
            return [action.payload.data.patient, ...state];
        case SAVE_PATIENT:
            return state.map((patient) => {
                if (patient.uri === action.payload.data.patient.uri) {
                    return action.payload.data.patient;
                } else {
                    return patient;
                }
            });
        case DELETE_PATIENT:
            return state.filter((patient) => {
                return patient.uri !== `/mealservice/patient/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}