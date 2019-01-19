import axios from 'axios';
import { push } from 'connected-react-router';
import { store } from '../store.js';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_REDIRECT } from './types';

import { ROOT_URL } from './actions';

export function signInUser({ username, password }) {
    return function(dispatch) {
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios.defaults.xsrfCookieName = 'csrftoken';

        axios
            .post(`${ROOT_URL}/auth/token/`, { username, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                console.log(store.getState().auth);
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
