import {
    GROCERY_ADDLIST_OVERRIDE_ITEM,
    CLEAR_MATCH_GROCERY,
    GROCERY_POPULATE_ADDLIST,
    MATCH_GROCERY,
    GROCERY_ADDLIST_SET_ALL_VISIBLE,
    SET_FILTER,
    SET_PREV_SEARCH,
    SET_GROCERYSTORES,
    SET_FOODTYPE_CURRENT,
    SET_FOODTYPE_DEFAULT,
    SET_STORESECTION_DEFAULT
} from '../actions/types';

import {
    SET_FOODTYPES
} from '../../Food/actions/types'

export const groceryAddList = (state = [], action) => {
    let newState = [];
    switch (action.type) {
        case MATCH_GROCERY:
            return action.payload;
        case GROCERY_POPULATE_ADDLIST:
            return action.payload;
        case GROCERY_ADDLIST_OVERRIDE_ITEM:
            newState = [...state]; // clone the array
            newState.forEach((x, key) => {
                if (x.id === action.payload.id) {
                    newState[key] = action.payload;
                }
            });
            return newState;
        case GROCERY_ADDLIST_SET_ALL_VISIBLE:
            newState = [...state]; // clone the array
            newState.forEach((x, key) => {
                newState[key].visible = true;
            });
            return newState;
        case CLEAR_MATCH_GROCERY:
            return [];
        default:
            return state;
    }
};

export const groceryBuildOptions = (
    state = {
        filter: 'search',
        foodTypeCurrent: '1',
        prevSearchTerm: '',
        addFoodDefaults: {}
    },
    action
) => {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, filter: action.payload };
        case SET_PREV_SEARCH:
            return { ...state, prevSearchTerm: action.payload };
        case SET_FOODTYPES:
            return { ...state, foodTypes: action.payload };
        case SET_GROCERYSTORES:
            return { ...state, groceryStores: action.payload };
        case SET_FOODTYPE_CURRENT:
            return { ...state, foodTypeCurrent: action.payload };
        case SET_FOODTYPE_DEFAULT:
            return { ...state, addFoodDefaults: { ...state.addFoodDefaults, ...action.payload } };
        case SET_STORESECTION_DEFAULT:
            return { ...state, addFoodDefaults: { ...state.addFoodDefaults, ...action.payload } };
        default:
            return state;
    }
};
