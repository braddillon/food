import axios from "axios";
//import moment from 'moment';
//import { store } from '../store.js';
//import { push } from 'connected-react-router';

import { ROOT_URL } from "../../actions/actions";
import {
  RECIPE_PARSE_INGREDIENTS,
  RECIPE_RESET_INGREDIENTS,
  RECIPE_CHANGE_INGREDIENT_MATCH,
  RECIPE_PICK_POSSIBLE_INGREDIENTS,
  RECIPE_RESET_POSSIBLE_INGREDIENTS,
  RECIPE_ADHOC_INGREDIENT_MATCH,
} from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const parseIngredients = ingredientText => {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/parseIngredients`,
        {
          ingText: ingredientText
        },
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        dispatch({
          type: RECIPE_PARSE_INGREDIENTS,
          payload: response.data
        });
      });
  };
};

export const resetIngredients = ingredientText => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_INGREDIENTS, payload: {} });
  };
};

export const changeIngredientMatch = (tmpID, selectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_INGREDIENT_MATCH,
      payload: { tmpId: tmpID, selectionId: selectionId }
    });
  };
};

export const setAdhocIngredientMatch = (tmpID, selectionId, name) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_ADHOC_INGREDIENT_MATCH,
      payload: { tmpId: tmpID, selectionId: selectionId, name: name }
    });
  };
}

export const pickPossibleIngredients = g => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/food?term=${g}`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: RECIPE_PICK_POSSIBLE_INGREDIENTS,
          payload: response.data
        });
      });
  };
};

export const resetPossibleIngredients = g => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_POSSIBLE_INGREDIENTS, payload: [] });
  };
};
