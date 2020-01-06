import { RECIPE_GET_SECTIONS } from '../actions/types';

export const recipeSections = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_GET_SECTIONS:
            return action.payload
        default:
            return state;
    }
};

