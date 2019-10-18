import {FETCH_MEAL_TIMES} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEAL_TIMES:
            if (action.payload.data) {
                return action.payload.data;
            }
            return [];
        default:
            return state;
    }
}