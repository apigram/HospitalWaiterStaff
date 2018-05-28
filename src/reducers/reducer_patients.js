import {FETCH_PATIENTS, ADD_PATIENT} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return action.payload.data.patients;
        case ADD_PATIENT:
            return [action.payload.data.patient, ...state];
        default:
            return state;
    }
}