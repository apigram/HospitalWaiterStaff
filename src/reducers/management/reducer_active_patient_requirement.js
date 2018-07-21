import {FETCH_PATIENT_REQUIREMENTS, ADD_PATIENT_REQUIREMENT, DELETE_PATIENT_REQUIREMENT} from "../../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PATIENT_REQUIREMENTS:
            return action.payload.data.requirements;
        case ADD_PATIENT_REQUIREMENT:
            return [action.payload.data.requirement, ...state];
        case DELETE_PATIENT_REQUIREMENT:
            return state.filter((req) => req.id !== action.payload.data.id);
        default:
            return state;
    }
}