import { RECIPE_PARSE_DIRECTIONS, RECIPE_RESET_DIRECTIONS, RECIPE_CHANGE_DIRECTION_SECTION } from '../actions/types';

export const parsedDirections = (state = {}, action) => {
    switch (action.type) {
        case RECIPE_PARSE_DIRECTIONS:
            return action.payload;
        case RECIPE_RESET_DIRECTIONS:
            return {};
        case RECIPE_CHANGE_DIRECTION_SECTION:
            return {
                ...state,
                [action.payload.tmpId]: { ...state[action.payload.tmpId], section: action.payload.sectionId }
                }
        default:
            return state;
    }
};

