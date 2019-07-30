import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authReducer from './authReducer';
import groceries from './groceryReducers.js';
import stores from './storeReducer.js';
import { parsedIngredients } from '../Recipe/reducers/parsedIngredientsReducer';
import { parsedDirections } from '../Recipe/reducers/parsedDirectionsReducer';
import { ingredientPicker } from '../Recipe/reducers/ingredientPickerReducer';
import { recipeForm } from '../Recipe/reducers/recipeFormReducer';
import { recipeOptions } from '../Recipe/reducers/recipeOptions';
import { recipeList } from '../Recipe/reducers/recipeListReducer';
import { recipe } from '../Recipe/reducers/recipeReducer';
import { foodOptions, food } from './foodReducer.js';
import { groceryAddList, groceryBuildOptions } from './groceryBuildReducers.js';

//export const reducers = combineReducers({
export default (history) => combineReducers({ 
    auth: authReducer,
    router: connectRouter(history),
    form,
    groceryAddList,
    groceryBuildOptions,
    groceries,
    stores,
    foodOptions,
    food,
    parsedIngredients,
    parsedDirections,
    ingredientPicker,
    recipeOptions,
    recipeList,
    recipe,
    recipeForm
});
