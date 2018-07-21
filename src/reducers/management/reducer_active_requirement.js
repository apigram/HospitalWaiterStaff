import {FETCH_REQUIREMENT} from '../../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_REQUIREMENT:
            return action.payload.data.requirement;
        default:
            return state;
    }
}