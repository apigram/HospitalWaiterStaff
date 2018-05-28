import {LOGIN, AUTH_HEADER} from '../actions'

export default function(state = null, action) {
    switch (action.type) {
        case LOGIN:
            AUTH_HEADER.auth.username = action.payload.data.user.token;
            return action.payload.data.user;
        default:
            return state;
    }
}