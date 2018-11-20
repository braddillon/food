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
  RECIPE_GET_SECTIONS,
  RECIPE_CHANGE_INGREDIENT_SECTION,
  RECIPE_CHANGE_DIRECTION_SECTION,
  RECIPE_PARSE_DIRECTIONS,
  RECIPE_RESET_DIRECTIONS,
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

export const parseDirections = (directionText, sections) => {
  return function(dispatch) {
        // Get null recipe section
        const sectionId = Object.keys(sections).find( key => sections[key].name === 'Main')

        // Eat start of line numbering
        directionText = directionText.replace(/\d+(\s*|\n)[-\\.)]+\s+/g, '')

        // Eat phantom newlines
        directionText = directionText.replace(/\n\n/g, '\n')

        let dirs = directionText.split("\n")
        dirs = dirs.filter( item => item !== "")

        let pay = dirs.map( (item, index) => {
          return {id: index+1, direction: item, section: parseInt(sectionId, 10)}
        }).reduce((obj, item) => { 
            obj[item.id] = item;
            return obj;
        }, {});

        dispatch({
          type: RECIPE_PARSE_DIRECTIONS,
          payload: pay
        });
  };
};

export const resetDirections = directionText => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_DIRECTIONS, payload: [] });
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

export const changeIngredientSection = (tmpID, sectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_INGREDIENT_SECTION,
      payload: { tmpId: tmpID, sectionId: sectionId }
    });
  };
};

export const changeDirectionSection = (tmpID, sectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_DIRECTION_SECTION,
      payload: { tmpId: tmpID, sectionId: sectionId }
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

export const getRecipeSections = () => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/recipeSection`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        let tmp = response.data.reduce(
          (obj, item) =>
              Object.assign(obj, {
                  [item.id]: {
                      id: item.id,
                      name: item.name,
                  }
              }),
          {}
        );

        dispatch({
          type: RECIPE_GET_SECTIONS,
          payload: tmp
        });
      });
  };
};

export const createNewRecipe = (name, tags, source, ingredients, directions, onResetForm) => {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/recipeCreate`,
        {
          name: name,
          tags: tags,
          source: source,
          ingredients: ingredients,
          directions: directions,
        },
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        if (response.data.status === "success")
          console.log("SUCCESS!!!!");
        else {
          console.log("FAIL");
        }

        dispatch({type: RECIPE_RESET_INGREDIENTS})
        dispatch({type: RECIPE_RESET_DIRECTIONS})
        onResetForm();
        console.log(response.data);
      });
  };
}