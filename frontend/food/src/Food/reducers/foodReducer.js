import { SET_FOODTYPES, GET_FOOD_LIST, MODIFY_FOOD_ATTRIBUTE, DELETE_FOOD_ITEMS, UPDATE_FOODTYPE_SECTION_DEFAULTS, UPDATE_FOOD } from '../actions/types';
import _ from 'lodash';

import { createSelector } from 'reselect';

// export const foodOptions = (state = { foodTypes: {} }, action) => {
//     switch (action.type) {
//         case SET_FOODTYPES:
//             return { ...state, foodTypes: action.payload };
//         default:
//             return state;
//     }
// };

export const foodTypes = (state = {}, action) => {
    switch (action.type) {
        case SET_FOODTYPES:
            return action.payload;
        case UPDATE_FOODTYPE_SECTION_DEFAULTS:
            return action.payload;
        default:
            return state;
    }
};

// Selector
export const selectFoodTypeSections = (state, storeId) => {
    if (!storeId) {
        return {}
    }
    let newObject = {}
    Object.keys(state.foodTypes).forEach(item => {
        let sec = state.foodTypes[item].defaultSection[storeId.toString()]
        if (sec) {
            if (!_.has(newObject, sec.section))
                newObject[sec.section] = Array(item)
            else
                newObject[sec.section] = [...newObject[sec.section], item]
        }
    })
    return newObject;
}

// export const selectFoodTypeLookup = (state) => {
//     console.log(state)
//     console.log("select food type")
//     let lookup = Object.keys(state.foodTypes).reduce( (obj, key) => {
//         obj[key] = state.foodTypes[key].name
//         return obj;
//     }, {})

//     return lookup;
// }


export const selectFoodTypeLookup = createSelector(
    state => state.foodTypes,
    (foodTypes) => {
        let lookup = Object.keys(foodTypes).reduce((obj, key) => {
            obj[key] = foodTypes[key].name
            return obj;
        }, {})

        return lookup;
    }
);


export const selectFoodTypeSectionsUnassigned = (state, storeId) => {
    if (!storeId)
        return {}
    let newObject = []
    Object.keys(state.foodTypes).forEach(item => {
        let sec = state.foodTypes[item].defaultSection[storeId.toString()]
        if (!_.has(sec, "section")) {
            newObject = [...newObject, item]
        }
    })
    return newObject;
}



export const food = (state = {}, action) => {
    switch (action.type) {
        case GET_FOOD_LIST:
            return action.payload;
        case MODIFY_FOOD_ATTRIBUTE:
            // let newState = {...state};
            // action.payload.forEach( id => {
            //     newState[id].staple = !state[id].staple;
            // });
            // return newState;
            return { ...state, ...action.payload };
        case UPDATE_FOOD:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    name: action.payload.foodName,
                    foodtype: action.payload.foodTypeId,
                    staple: action.payload.staple,
                    ignore: action.payload.ignore,
                    sections: { ...state[action.payload.id].sections, ...action.payload.grocerySections }
                }
            };
        case DELETE_FOOD_ITEMS:
            let remain = { ...state };
            return _.omit(remain, action.payload);
        // case MODIFY_FOOD_IGNORE:
        //     let newState2 = {...state};
        //     action.payload.forEach( id => {
        //         newState[id].staple = !state[id].staple;
        //     });
        //     return newState;
        default:
            return state;
    }
};

// export const selectFoodInListForBrowser = (state, storeId) => {
//     let newList = Object.keys(state.food).reduce((obj, item) => {
//         let new_obj = {}
//         new_obj['id'] = state.food[item].id
//         new_obj['name'] = state.food[item].name
//         new_obj['staple'] = state.food[item].staple
//         new_obj['ignore'] = state.food[item].ignore
//         new_obj['foodtype'] = state.food[item].foodtype
//         new_obj['section'] = state.food[item].sections[storeId]
//         new_obj['all_sections'] = state.food[item].sections
//         obj.push(new_obj)
//         return obj;
//     }, [])

//     return newList;
// }

// export const selectFoodInListForBrowser = createSelector(
//     getFood,
//     getCartItemIds,
//     (products, itemIds) => itemIds.map(id => products[id])
//   );