import {ADD_MEAL, FETCH_MEALS, SAVE_MEAL, DELETE_MEAL} from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEALS:
            return action.payload.data.meals;
        case ADD_MEAL:
            return [action.payload.data.meal, ...state];
        case SAVE_MEAL:
            return state.map((meal) => {
                if (meal.uri === action.payload.data.meal.uri) {
                    return action.payload.data.meal;
                } else {
                    return meal;
                }
            });
        case DELETE_MEAL:
            return state.filter((meal) => {
                return meal.uri !== `/mealservice/meal/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}