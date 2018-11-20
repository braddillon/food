import axios from 'axios';
import { UNAUTH_USER } from './types';

export default {
    setupInterceptors: store => {
        // Add a response interceptor
        axios.interceptors.response.use(
            function(response) {
                return response;
            },
            function(error) {
                //catches if the session ended!
                console.log("brad");
                console.log(Object.keys(error));
                console.log(error.config);
                console.log(error.request);
                console.log(error.response);

                console.log("brad");
                if (error.response.status === 401) {
                    localStorage.clear();
                    store.dispatch({ type: UNAUTH_USER });
                }
                return Promise.reject(error);
            }
        );
    }
};
