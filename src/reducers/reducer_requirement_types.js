import {FETCH_REQUIREMENT_TYPES} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REQUIREMENT_TYPES:
            return action.payload.data.requirement_types;
        default:
            return state;
    }
}