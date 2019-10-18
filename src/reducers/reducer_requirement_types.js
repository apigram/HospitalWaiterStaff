import {FETCH_REQUIREMENT_TYPES} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REQUIREMENT_TYPES:
            if (action.payload.data) {
                return action.payload.data;
            }
            return [];
        default:
            return state;
    }
}