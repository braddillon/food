import {
    ADD_GROCERY,
    DELETE_GROCERY,
    WIPE_GROCERY,
    GROCERY_LIST_POPULATE,
    SET_STORELIST_CHECKED
} from '../actions/types';

import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_GROCERY:
            return { ...state, [action.payload.id]: action.payload };
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
