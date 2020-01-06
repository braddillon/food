import { SET_STORES } from '../../Grocery/actions/types';
import { STORE_UPDATE_SECTION_ORDER, EDIT_STORE, ADD_STORE, REMOVE_STORE, ADD_STORE_SECTION, EDIT_STORE_SECTION, REMOVE_STORE_SECTION } from '../actions/types';

import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_STORES:
            return action.payload;
        case EDIT_STORE:
            return { ...state, [action.payload.id]: { ...state[action.payload.id], name: [action.payload.name] } };
        case ADD_STORE:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVE_STORE:
            return _.omit(state, [action.payload])
        case STORE_UPDATE_SECTION_ORDER:
            return { ...state, [action.payload.id]: action.payload };
        case ADD_STORE_SECTION:
            return {
                ...state, [action.payload.store_id]: { ...state[action.payload.store_id], sections: { ...state[action.payload.store_id].sections, [action.payload.sec_id]: { id: action.payload.sec_id, sectionName: action.payload.sec_name, order: action.payload.order } } }
            }
        case EDIT_STORE_SECTION:
            return {
                ...state, [action.payload.store_id]: { ...state[action.payload.store_id], sections: { ...state[action.payload.store_id].sections, [action.payload.section_id]: { id: action.payload.section_id, sectionName: action.payload.sectionName, order: action.payload.order } } }
            }
        case REMOVE_STORE_SECTION:
            return {
                ...state, [action.payload.store_id]: { ...state[action.payload.store_id], sections: _.omit(state[action.payload.store_id].sections, action.payload.section_id)}
            }
        default:
            return state;
    }
}

// Selector
// export const selectFirstStore = state => {
//     console.log("selector")
//     console.log(state)
//     console.log(!_.isEmpty(state.stores))
//     return state.stores
//     // if (state && state.stores && (!_.isEmpty(state.stores))) {
//     //     console.log(Object.keys(state.stores[0]))
//     //     return {}
//     //     //return Object.keys(state.stores[0])
        
//     // }
//     // else {
//     //     console.log("EMPTY!")
//     //     return {}
//     // }
// }
