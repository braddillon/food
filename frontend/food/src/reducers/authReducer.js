import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_REDIRECT } from '../actions/types';

export default function(state = { authenticated: false, error: '', redirect: ''}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: true, error: '' };
        case UNAUTH_USER:
            return { ...state, authenticated: false, error: '' };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case SET_REDIRECT:
            return { ...state, redirect: action.payload}
        default:
            return state;
    }
}
