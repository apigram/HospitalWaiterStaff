import {LOGIN, AUTH_HEADER} from '../actions'

export default function(state = null, action) {
    switch (action.type) {
        case LOGIN:
            if (action.error) {
                console.log(action.payload.status + ': ' + action.payload.message);
                return null;
            }
            AUTH_HEADER.auth.username = action.payload.data.user.token;
            return action.payload.data.user;
        default:
            return state;
    }
}