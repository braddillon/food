import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { history } from './history.js';
import { ConnectedRouter } from 'connected-react-router';
import { AUTH_USER } from './actions/types';
import NetworkService from './actions/network-service';


import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';


// ReactDOM.render(<App />, document.getElementById('root'));

NetworkService.setupInterceptors(store);

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
