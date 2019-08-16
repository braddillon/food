import objectToFormData from "object-to-formdata";
import { push } from "connected-react-router";
import { resetRecipeForm } from "./recipeFormActions";
import { HTTP } from "../../Other/HTTP";

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
  RECIPE_GET_LIST,
  RECIPE_GET_TAGS,
  RECIPE_DETAIL,
  RECIPE_RESET
} from "./types";

export const parseIngredients = ingredientText => {
  return function(dispatch) {
    HTTP.post(`/parseIngredients`, {
      ingText: ingredientText
    }).then(response => {
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
    const sectionId = Object.keys(sections).find(
      key => sections[key].name === "Main"
    );

    // Eat start of line numbering
    directionText = directionText.replace(/\d+(\s*|\n)[-\\.)]+\s+/g, "");

    // Eat phantom newlines
    directionText = directionText.replace(/\n\n/g, "\n");

    let dirs = directionText.split("\n");
    dirs = dirs.filter(item => item !== "");

    let pay = dirs
      .map((item, index) => {
        return {
          id: index + 1,
          direction: item,
          section: parseInt(sectionId, 10)
        };
      })
      .reduce((obj, item) => {
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
    console.log("setAdhocIngredient");
    console.log(tmpID);
    console.log(selectionId);
    dispatch({
      type: RECIPE_ADHOC_INGREDIENT_MATCH,
      payload: { tmpId: tmpID, selectionId: selectionId, name: name }
    });
  };
};

export const pickPossibleIngredients = g => {
  return function(dispatch) {
    HTTP.get(`food?term=${g}`).then(response => {
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
    HTTP.get(`recipeSection`).then(response => {
      let tmp = response.data.reduce(
        (obj, item) =>
          Object.assign(obj, {
            [item.id]: {
              id: item.id,
              name: item.name
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

export const getRecipeList = () => {
  return function(dispatch) {
    HTTP.get(`recipeList`).then(response => {
      dispatch({
        type: RECIPE_GET_LIST,
        payload: response.data
      });
    });
  };
};

export const getRecipeTags = () => {
  return function(dispatch) {
    HTTP.get(`recipeTags`).then(response => {
      dispatch({
        type: RECIPE_GET_TAGS,
        payload: response.data
      });
    });
  };
};

export const getRecipe = g => {
  return function(dispatch) {
    HTTP.get(`recipe/${g}`).then(response => {
      dispatch({
        type: RECIPE_DETAIL,
        payload: response.data
      });
    });
  };
};

export const recipeReset = () => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET });
  };
};

export const uploadRecipeImage = file => {
  return function(dispatch) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("remark", "blah blah blah");
    HTTP.post(`upload/`, formData)
      .then(function() {
        console.log("SUCCESS!!");
      })
      .catch(function() {
        console.log("FAILURE!!");
      });
  };
};

export const createNewRecipe = (
  name,
  tags,
  source,
  ingredients,
  directions,
  imgFile,
  image,
  recipeId
) => {
  return function(dispatch) {
    //test2
    const formData = new FormData();

    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("source", source);
    formData.append("recipeId", recipeId);
    formData.append("image", image);

    // convert blob to file
    if (imgFile && "name" in imgFile) {
      let fileOfBlob = new File([imgFile], imgFile.name);
      formData.append("file", fileOfBlob);
    }

    let formData2 = objectToFormData(
      ingredients,
      { indices: false },
      formData,
      "ingredients"
    );
    let formData3 = objectToFormData(
      directions,
      { indices: false },
      formData2,
      "directions"
    );

    HTTP.post(`recipeCreate`, formData3).then(response => {
      if (response.data.status === "success") {
        dispatch({ type: RECIPE_RESET_INGREDIENTS });
        dispatch({ type: RECIPE_RESET_DIRECTIONS });
        dispatch(resetRecipeForm());
        dispatch(push("/recipeGallery"));
      }
    });
  };
};
