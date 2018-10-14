import { SET_FOODTYPES, GET_FOOD_LIST, MODIFY_FOOD_ATTRIBUTE, DELETE_FOOD_ITEMS } from '../actions/types';
import _ from 'lodash';

export const foodOptions = (state = { foodTypes: {} }, action) => {
    switch (action.type) {
        case SET_FOODTYPES:
            return { ...state, foodTypes: action.payload };
        default:
            return state;
    }
};

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
            return {...state, ...action.payload};
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
