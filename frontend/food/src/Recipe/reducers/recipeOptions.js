import { RECIPE_GET_SECTIONS } from '../actions/types';

export const recipeOptions = (state = {sections: {}}, action) => {
    switch (action.type) {
        case RECIPE_GET_SECTIONS:
            return {
                ...state,
                sections: action.payload
            }
        default:
            return state;
    }
};

