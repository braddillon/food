import { HTTP } from "../../HTTP";
import { push } from 'connected-react-router';
import { store } from '../../store.js';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_REDIRECT } from '../actions/types';

export function signInUser({ username, password }) {
    return function(dispatch) {
        HTTP
            .post(`auth/token/`, { username, password })
            .then(response => {
                console.log("auth attempt");
                console.log(response);
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                if (store.getState().auth.redirect !== '')
                    dispatch(push(store.getState().auth.redirect));    
                else
                    dispatch(push('/'));
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return function(dispatch) {
        dispatch({ type: UNAUTH_USER });
        dispatch(push('/'));
    };
}

export function setLoginRedirect(path) {
    return function(dispatch) {
        dispatch({ type: SET_REDIRECT, payload: path})
    }
}
