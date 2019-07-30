import { RECIPE_GET_SECTIONS, RECIPE_GET_TAGS } from '../actions/types';

export const recipeOptions = (state = {sections: {}, tags: {}}, action) => {
    switch (action.type) {
        case RECIPE_GET_SECTIONS:
            return {
                ...state,
                sections: action.payload
            }
        case RECIPE_GET_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        default:
            return state;
    }
};

