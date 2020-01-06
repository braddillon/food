import { applyMiddleware, createStore } from 'redux';

import reduxThunk from 'redux-thunk';
import createRootReducer from '../reducers.js';
import { history } from './history.js';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initialState = {}) {
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            reduxThunk
            // ... other middlewares ...
        ))
    );
    return store;
}

export const store = configureStore();