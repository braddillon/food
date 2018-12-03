import axios from "axios";

import { ROOT_URL } from "../../actions/actions";
import {
    RECIPE_FORM_SET_FIELD,
    RECIPE_FORM_RESET_FIELD,
    RECIPE_FORM_RESET,
    RECIPE_RESET_INGREDIENTS,
    RECIPE_RESET_DIRECTIONS,
    RECIPE_FORM_ENABLE_ADD_MODE,
    RECIPE_FORM_DISABLE_ADD_MODE,
} from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const setRecipeFormField = (field, value) => {
  return function(dispatch) {
        dispatch({
          type: RECIPE_FORM_SET_FIELD,
          payload: {'field': field, 'value': value}
        });
  };
};

export const resetRecipeFormField = field => {
    return function(dispatch) {
          dispatch({
            type: RECIPE_FORM_RESET_FIELD,
            payload: field
          });
    };
  };

  export const resetRecipeForm = () => {
    return function(dispatch) {
          dispatch({ type: RECIPE_FORM_RESET, payload: [] });
          dispatch({ type: RECIPE_RESET_INGREDIENTS, payload: [] });
          dispatch({ type: RECIPE_RESET_DIRECTIONS, payload: [] });
    };
  };

  export const enableRecipeFormAddMode = (term, itemToMatchId) => {
    return function(dispatch) {
          dispatch({ type: RECIPE_FORM_ENABLE_ADD_MODE, payload: {term: term, tmpId: itemToMatchId }});
    };
  };

  export const disableRecipeFormAddMode = (term) => {
    return function(dispatch) {
          dispatch({ type: RECIPE_FORM_DISABLE_ADD_MODE, payload: [] });
    };
  };