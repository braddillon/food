import { RECIPE_PARSE_INGREDIENTS, RECIPE_RESET_INGREDIENTS, RECIPE_CHANGE_INGREDIENT_MATCH } from '../actions/types';

export const parsedIngredients = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_PARSE_INGREDIENTS:
            return action.payload;
        case RECIPE_RESET_INGREDIENTS:
            return {};
        case RECIPE_CHANGE_INGREDIENT_MATCH:
            return {
                ...state,
                [action.payload.tmpId]: { ...state[action.payload.tmpId], selection: action.payload.selectionId }
                }
        default:
            return state;
    }
};

