import {FETCH_MEAL_TIMES} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEAL_TIMES:
            return action.payload.data.meal_times;
        default:
            return state;
    }
}