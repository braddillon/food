import { applyMiddleware, createStore } from 'redux';

import reduxThunk from 'redux-thunk';
import createRootReducer from './reducers/reducers.js';
import { history } from './history.js';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export function configureStore(initialState = {}) {
    const store = createStore(
        createRootReducer(history),
        initialState,
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            reduxThunk
            // ... other middlewares ...
        )
    );
    return store;
}

export const store = configureStore();