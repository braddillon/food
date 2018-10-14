import { SET_STORES } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SET_STORES:
            return action.payload;
        default:
            return state;
    }
}
