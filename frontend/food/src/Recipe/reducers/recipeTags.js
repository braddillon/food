import { RECIPE_GET_TAGS } from '../actions/types';

export const recipeTags = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_GET_TAGS:
            return action.payload
        default:
            return state;
    }
};

