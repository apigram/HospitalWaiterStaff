import {FETCH_REQUIREMENTS} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS:
            return action.payload.data.requirements;
        default:
            return state;
    }
}