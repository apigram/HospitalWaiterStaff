import {FETCH_PATIENT} from '../../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_PATIENT:
            return action.payload.data.patient;
        default:
            return state;
    }
}