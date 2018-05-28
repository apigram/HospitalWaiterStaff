import {FETCH_REQUIREMENTS, ADD_REQUIREMENT} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS:
            return action.payload.data.requirements;
        case ADD_REQUIREMENT:
            return [action.payload.data.requirement, ...state];
        default:
            return state;
    }
}