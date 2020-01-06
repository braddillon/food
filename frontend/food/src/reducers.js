import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authReducer from './Other/Auth/reducers/authReducer';
import groceries from './Grocery/reducers/groceryReducers.js';
import stores from './Store/reducers/reducers.js';
import { parsedIngredients } from './Recipe/reducers/parsedIngredientsReducer';
import { parsedDirections } from './Recipe/reducers/parsedDirectionsReducer';
import { ingredientPicker } from './Recipe/reducers/ingredientPickerReducer';
import { recipeForm } from './Recipe/reducers/recipeFormReducer';
import { recipeTags } from './Recipe/reducers/recipeTags';
import { recipeSections } from './Recipe/reducers/recipeSections';
import { recipes } from './Recipe/reducers/recipesReducer';
import { recipe } from './Recipe/reducers/recipeReducer';
import { foodTypes, food } from './Food/reducers/foodReducer';
import { groceryAddList, groceryBuildOptions } from './Grocery/reducers/groceryBuildReducers.js';

//export const reducers = combineReducers({
export default (history) => combineReducers({ 
    auth: authReducer,
    router: connectRouter(history),
    form,
    groceryAddList,
    groceryBuildOptions,
    groceries,
    stores,
    foodTypes,
    food,
    parsedIngredients,
    parsedDirections,
    ingredientPicker,
    recipeSections,
    recipeTags,
    recipes,
    recipe,
    recipeForm
});
