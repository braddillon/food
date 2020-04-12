import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './Other/store.js';
import { history } from './Other/history.js';
import { ConnectedRouter } from 'connected-react-router';
import { AUTH_USER } from './Other/Auth/actions/types';

import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from './Other/registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('container')
);


//registerServiceWorker();
unregister();
