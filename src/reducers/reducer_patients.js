import {FETCH_PATIENTS} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return action.payload.data.patients;
        default:
            return state;
    }
}