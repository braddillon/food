import { RECIPE_PICK_POSSIBLE_INGREDIENTS, RECIPE_RESET_POSSIBLE_INGREDIENTS } from '../actions/types';

export const ingredientPicker = (state = [], action) => {
    switch (action.type) {
        case RECIPE_PICK_POSSIBLE_INGREDIENTS:
            return action.payload;
        case RECIPE_RESET_POSSIBLE_INGREDIENTS:
            return [];
        default:
            return state;
    }
};

