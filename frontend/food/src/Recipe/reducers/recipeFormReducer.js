import { RECIPE_FORM_EDIT_RECIPE, RECIPE_FORM_SET_FIELD, RECIPE_FORM_RESET_FIELD, RECIPE_FORM_RESET, RECIPE_FORM_ENABLE_ADD_MODE, RECIPE_FORM_DISABLE_ADD_MODE } from '../actions/types';

const initialState = {
    name: '',
    tags: '',
    source: '',
    ingredientText: '',
    directionsText: '',
    image: null,
    file: null,
    addMode: false,
    addModeItemId: 0,
    addModeTerm: '',
    recipeId: 0
};

export const recipeForm = (state = initialState, action) => {
    switch (action.type) {
        case RECIPE_FORM_SET_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case RECIPE_FORM_RESET_FIELD:
            return {
                ...state,
                [action.payload]: ''
            };
        case RECIPE_FORM_EDIT_RECIPE:
            return {
                name: action.payload.name,
                tags: action.payload.tags,
                source: action.payload.source,
                ingredientText: action.payload.ingredientText,
                directionsText: action.payload.directionsText,
                image: action.payload.image,
                file: {},
                addMode: false,
                addModeItemId: 0,
                addModeTerm: '',
                recipeId: action.payload.recipeId
            }
        case RECIPE_FORM_RESET:
            return {
                ...initialState
            };
        case RECIPE_FORM_ENABLE_ADD_MODE:
            return {
                ...state,
                addModeTerm: action.payload.term,
                addMode: true,
                addModeItemId: action.payload.tmpId
            }
        case RECIPE_FORM_DISABLE_ADD_MODE:
            return {
                ...state,
                addModeTerm: '',
                addMode: false,
                addModeItemId: 0
            }
        default:
            return state;
    }
};
