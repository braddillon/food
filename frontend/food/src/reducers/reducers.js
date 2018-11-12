import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import groceries from './groceryReducers.js';
import stores from './storeReducer.js';
import { parsedIngredients } from '../Recipe/reducers/parsedIngredientsReducer';
import { ingredientPicker } from '../Recipe/reducers/ingredientPickerReducer';
import { foodOptions, food } from './foodReducer.js';
import { groceryAddList, groceryBuildOptions } from './groceryBuildReducers.js';

export const reducers = combineReducers({
    auth: authReducer,
    form,
    groceryAddList,
    groceryBuildOptions,
    groceries,
    stores,
    foodOptions,
    food,
    parsedIngredients,
    ingredientPicker
});
