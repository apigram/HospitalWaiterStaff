import {FETCH_REQUIREMENTS, ADD_REQUIREMENT, DELETE_REQUIREMENT, SAVE_REQUIREMENT} from '../../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REQUIREMENTS:
            return action.payload.data.requirements;
        case ADD_REQUIREMENT:
            return [action.payload.data.requirement, ...state];
        case SAVE_REQUIREMENT:
            return state.map((req) => {
                if (req.uri === action.payload.data.requirement.uri) {
                    return action.payload.data.requirement;
                } else {
                    return req;
                }
            });
        case DELETE_REQUIREMENT:
            return state.filter((req) => {
                return req.uri !== `/mealservice/requirement/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}