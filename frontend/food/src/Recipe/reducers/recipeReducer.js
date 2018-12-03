import { RECIPE_DETAIL, RECIPE_RESET } from '../actions/types';

export const recipe = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_DETAIL:
            return action.payload
        case RECIPE_RESET:
            return {}
        default:
            return state;
    }
};