import { RECIPE_GET_LIST } from '../actions/types';

export const recipes = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_GET_LIST:
            return action.payload
        default:
            return state;
    }
};