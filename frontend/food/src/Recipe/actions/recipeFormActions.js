import axios from 'axios';
import { push } from 'connected-react-router';
import _ from 'lodash';

//import { ROOT_URL } from "../../actions/actions";
import {
    RECIPE_FORM_SET_FIELD,
    RECIPE_FORM_RESET_FIELD,
    RECIPE_FORM_RESET,
    RECIPE_RESET_INGREDIENTS,
    RECIPE_RESET_DIRECTIONS,
    RECIPE_FORM_ENABLE_ADD_MODE,
    RECIPE_FORM_DISABLE_ADD_MODE,
    RECIPE_FORM_EDIT_RECIPE,
    RECIPE_PARSE_INGREDIENTS,
    RECIPE_PARSE_DIRECTIONS
} from './types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const setRecipeFormField = (field, value) => {
    return function(dispatch) {
        dispatch({
            type: RECIPE_FORM_SET_FIELD,
            payload: { field: field, value: value }
        });
    };
};

export const editRecipe = (
    name,
    tags,
    source,
    image,
    recipeId,
    ingredients,
    directions
) => {
    return function(dispatch) {
        let ingText = ingredients.reduce((str, item) => {
            str = str + item.amount + ' ' + item.units + ' ' + item.name;
            if (item.notes !== '') str = str + ', ' + item.notes;
            str = str + '\n';
            return str;
        }, '');
        ingText = _.trim(ingText);

        let parsedIng = ingredients.reduce((obj, item) => {
            item['potentialMatches'] = { [item.food]: item.name };
            item['tmpId'] = item.id;
            item['selection'] = item.food;
            obj[item.id] = item;
            return obj;
        }, {});

        let dirText = directions.reduce((str, item) => {
            str = str + item.text;
            str = str + '\n';
            return str;
        }, '');
        dirText = _.trim(dirText);

        let parsedDir = directions.reduce((obj, item) => {
            item['id'] = item.sort;
            item['direction'] = item.text;
            delete item.text;
            delete item.sort;
            delete item.recipe;
            obj[item.id] = item;
            return obj;
        }, {});

        dispatch({
            type: RECIPE_PARSE_DIRECTIONS,
            payload: parsedDir
        });
        dispatch({
            type: RECIPE_PARSE_INGREDIENTS,
            payload: parsedIng
        });
        dispatch({
            type: RECIPE_FORM_EDIT_RECIPE,
            payload: {
                name: name,
                tags: tags,
                source: source,
                ingredientText: ingText,
                directionsText: dirText,
                image: image,
                recipeId: recipeId
            }
        });
        dispatch(push('/recipeCreate/'));
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
        dispatch({
            type: RECIPE_FORM_ENABLE_ADD_MODE,
            payload: { term: term, tmpId: itemToMatchId }
        });
    };
};

export const disableRecipeFormAddMode = term => {
    return function(dispatch) {
        dispatch({ type: RECIPE_FORM_DISABLE_ADD_MODE, payload: [] });
    };
};
