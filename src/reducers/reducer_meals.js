import {ADD_MEAL, FETCH_MEALS} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEALS:
            return action.payload.data.meals;
        case ADD_MEAL:
            return [action.payload.data.meal, ...state];
        default:
            return state;
    }
}