import axios from "axios";
import { store } from "./store";
import { UNAUTH_USER } from "./Auth/actions/types";

export const HTTP = axios.create({
  baseURL: "http://127.0.1.1/api/",
  timeout: 1000,
  headers: {
    Authorization: "JWT " + localStorage.getItem("token")
  }
});

// Alter defaults after instance has been created
HTTP.defaults.xsrfHeaderName = "X-CSRFTOKEN";
HTTP.defaults.xsrfCookieName = "csrftoken";


HTTP.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    //catches if the session ended!
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        store.dispatch({ type: UNAUTH_USER });
      }
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    return Promise.reject(error);
  }
);


// export let ROOT_URL;

// if (window.location.host.includes('codesoldier')) {
// 	ROOT_URL = `https://${window.location.host}/api`;
// } else {
// 	let chunks = window.location.host.split(':');
//     // ROOT_URL = `http://` + chunks[0] + `:8000/api`;
//     ROOT_URL = `http://` + chunks[0] + `/api`;
// }
