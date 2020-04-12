import {
    ADD_GROCERY,
    DELETE_GROCERY,
    UPDATE_GROCERY_CHECK,
    WIPE_GROCERY,
    GROCERY_LIST_POPULATE,
    SET_STORELIST_CHECKED
} from '../actions/types';

import { 
    UPDATE_FOOD_GROCERY_ITEM
} from '../../Food/actions/types';

import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_GROCERY:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_GROCERY_CHECK:
            return { ...state, 
                    [action.payload.food]: {
                        ...state[action.payload.food],
                        check: action.payload.check    
                    }
                }
        case UPDATE_FOOD_GROCERY_ITEM:
            return { ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        name: action.payload.foodName,
                        grocerySections: {...state[action.payload.id].grocerySections, ...action.payload.grocerySections}
                    }};
        case DELETE_GROCERY:
            return _.omit(state, action.payload);
        case WIPE_GROCERY:
            return {};
        case GROCERY_LIST_POPULATE:
            return action.payload;
        case SET_STORELIST_CHECKED:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}
