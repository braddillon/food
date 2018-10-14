import { applyMiddleware, createStore } from 'redux';

import reduxThunk from 'redux-thunk';
import { reducers } from './reducers/reducers.js';
import { history } from './history.js';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export function configureStore(initialState = {}) {
    const store = createStore(
        connectRouter(history)(reducers),
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
