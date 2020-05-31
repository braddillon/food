import { createSelector } from 'reselect';

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

export const selectGrocerySections = createSelector(
    state => state.stores,
    (_, storeId) => storeId,
    (stores, storeId) => {
        if (!storeId) {
            return {}
        }

        if (_.isEmpty(stores)) {
            return {}
        }

        let sections = Object.keys(stores[storeId].sections).reduce((obj, key) => {
            obj[key] = stores[storeId].sections[key].sectionName
            return obj
        }, {})
        
        return sections;
    }
  );


export const selectGroceryByPrintGroups = (state, storeId) => {
    const { groceries } = state
    if (!storeId) {
        return []
    }

    if (_.isEmpty(state.stores)) {
        return []
    }


    let target_items = Object.keys(groceries).length / 2
    if (target_items > 45)
        target_items = 45
    let pages = []
    pages.push([])
    pages[0].push([])

    let colNum = 0
    const sections = state.stores[storeId].sections;
    Object.keys(sections).sort((a, b) => sections[a].order - sections[b].order).reduce((total, item) => {
        let item_int = parseInt(item, 10)
        let section_length = Object.keys(groceries).filter(key => groceries[key].grocerySections[storeId] === item_int).length
        if (section_length > 0) {
            if ((total <= target_items)) {
                pages[pages.length - 1][colNum].push(item_int)
            } else {
                if (colNum === 1) {
                    pages.push([])
                    pages[pages.length - 1].push([])
                    colNum = 0
                    pages[pages.length - 1][colNum].push(item_int)
                }
                else {
                    colNum = colNum + 1
                    pages[pages.length - 1].push([])
                    pages[pages.length - 1][colNum].push(item_int)
                }
                total = 0
            }
        }
        return total + section_length
    }, 0)

    return pages;
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
