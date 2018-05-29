import {FETCH_MEAL_REQUIREMENTS, ADD_MEAL_REQUIREMENT, DELETE_MEAL_REQUIREMENT} from "../actions";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_MEAL_REQUIREMENTS:
            return action.payload.data.requirements;
        case ADD_MEAL_REQUIREMENT:
            return [action.payload.data.requirement, ...state];
        case DELETE_MEAL_REQUIREMENT:
            return state.filter((req) => req.id !== action.payload.data.id);
        default:
            return state;
    }
}