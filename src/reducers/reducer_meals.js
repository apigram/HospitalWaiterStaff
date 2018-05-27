import {FETCH_MEALS} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEALS:
            return action.payload.data.meals;
        default:
            return state;
    }
}