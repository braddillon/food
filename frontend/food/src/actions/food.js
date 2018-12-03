import axios from 'axios';
import moment from 'moment';
import { store } from '../store.js';
import { push } from 'connected-react-router';

import { ROOT_URL } from './actions';

import { addGroceryItem } from './actions';
import { disableRecipeFormAddMode } from '../Recipe/actions/recipeFormActions';
import { setAdhocIngredientMatch } from '../Recipe/actions/actions';

import {
    SET_FILTER,
    SET_FOODTYPES,
    SET_FOODTYPE_DEFAULT,
    GET_FOOD_LIST,
    MODIFY_FOOD_ATTRIBUTE,
    DELETE_FOOD_ITEMS,
} from './types';

import _ from 'lodash';

import {ADD_FOOD_FOODBROWSER, ADD_FOOD_GROCERY, ADD_FOOD_RECIPE } from '../components/Food/AddFood'

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const addFoodItem = (gItem, addType) => {
    return function(dispatch) {
        let myId = 0
        let myName = ''
        axios
            .post(
                `${ROOT_URL}/foodCreate`,
                {
                    name: gItem.foodName,
                    foodtype: parseInt(gItem.foodTypeId, 10),
                    staple: gItem.staple
                },
                {
                    headers: {
                        Authorization: 'JWT ' + localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                myId=response.data.id
                myName=response.data.name
                var defaultSections = _.pickBy(gItem, function(value, key) {
                    return _.startsWith(key, 'section');
                });

                _.forEach(defaultSections, function(value) {
                    axios
                        .post(
                            `${ROOT_URL}/foodGrocerySection`,
                            {
                                food: parseInt(response.data.id, 10),
                                section: parseInt(value, 10)
                            },
                            {
                                headers: {
                                    Authorization:
                                        'JWT ' + localStorage.getItem('token')
                                }
                            }
                        )
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            console.log('food default section add error');
                            console.log(err);
                        });
                });
                console.log("addtype");
                console.log(addType);
                console.log(addType === ADD_FOOD_RECIPE);
                console.log(myId);
                console.log(myName);
                if (addType === ADD_FOOD_GROCERY) {
                    dispatch(
                        addGroceryItem({
                            id: response.data.id,
                            name: gItem.foodName,
                            deferred: false,
                            checked: false
                        })
                    );
                    dispatch({ type: SET_FILTER, payload: 'search' });
                } else if (addType === ADD_FOOD_RECIPE) {
                    console.log("RECIPE!")
                    
                    //let tmpId = { ...store.getState().recipeForm.addModeItemId };
                    console.log(store.getState().recipeForm);
                    dispatch(setAdhocIngredientMatch(store.getState().recipeForm.addModeItemId, myId, myName))
                    dispatch(disableRecipeFormAddMode())
                }
                else {
                    dispatch(push('/foodBrowser'));
                }
            })
            .catch(err => {
                // Handle any error that occurred in any of the previous promises in the chain.
                console.log('Error');
                console.log(err);
            });
    };
};

export const resetGroceryBuildFilter = () => {
    return function(dispatch) {
        dispatch({ type: SET_FILTER, payload: 'search' });
    }
}

export const updateFoodItem = gItem => {
    return function(dispatch) {
        console.log(gItem);
        console.log('UPDATE POST');
        axios
            .put(
                `${ROOT_URL}/foodDetail/${gItem.id}/`,
                {
                    name: gItem.foodName,
                    foodtype: parseInt(gItem.foodTypeId, 10),
                    staple: gItem.staple
                },
                {
                    headers: {
                        Authorization: 'JWT ' + localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                axios
                    .post(
                        `${ROOT_URL}/foodGrocerySectionDelete/${parseInt(
                            response.data.id, 10
                        )}/`,
                        {},
                        {
                            headers: {
                                Authorization:
                                    'JWT ' + localStorage.getItem('token')
                            }
                        }
                    )
                    .then(() => {
                        console.log('food delete section success');
                        var defaultSections = _.pickBy(gItem, function(
                            value,
                            key
                        ) {
                            return _.startsWith(key, 'section');
                        });
                        console.log(defaultSections);

                        _.forEach(defaultSections, value => {
                            axios
                                .post(
                                    `${ROOT_URL}/foodGrocerySection`,
                                    {
                                        food: parseInt(gItem.id, 10),
                                        section: parseInt(value, 10)
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                'JWT ' +
                                                localStorage.getItem('token')
                                        }
                                    }
                                )
                                .then(() => {
                                    console.log('food default section success');
                                })
                                .catch(err => {
                                    console.log(
                                        'food default section add error'
                                    );
                                    console.log(err);
                                });
                        });
                        // dispatch(addGroceryItem({ id: response.data.id, name: gItem.foodName,
                        // deferred: false, checked: false }));
                        dispatch({ type: SET_FILTER, payload: 'search' });
                    })
                    .catch(err => {
                        console.log('food default section add error');
                        console.log(err);
                    });
            })
            .catch(err => {
                // Handle any error that occurred in any of the previous promises in the chain.
                console.log('Error');
                console.log(err);
            });
    };
};

export const getFoodTypes = () => {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/foodType`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                response.data.forEach(function(element) {
                    //console.log(element)
                    element.defaultSection = element.defaultSection.reduce(
                        (obj, item) =>
                            Object.assign(obj, {
                                [item.store]: {
                                    store: item.store,
                                    section: item.section
                                }
                            }),
                        {}
                    );
                });

                let tmp = response.data.reduce(
                    (obj, item) =>
                        Object.assign(obj, {
                            [item.id]: {
                                id: item.id,
                                name: item.name,
                                defaultSection: item.defaultSection
                            }
                        }),
                    {}
                );
                dispatch({ type: SET_FOODTYPES, payload: tmp });

                let defaultFoodType = _.pickBy(
                    tmp,
                    value => value.name === 'Vegetable'
                );
                if (_.isEmpty(defaultFoodType))
                    dispatch({
                        type: SET_FOODTYPE_DEFAULT,
                        payload: { foodTypeId: Object.keys(tmp)[0] }
                    });
                else
                    dispatch({
                        type: SET_FOODTYPE_DEFAULT,
                        payload: { foodTypeId: Object.keys(defaultFoodType)[0] }
                    });
            });
    };
};

export const foodListPopulate = (
    searchTerm,
    foodTypes,
    staple,
    ignore,
    recentlyModified
) => {
    let mTypes = '';
    let mStaple = '';
    let mIgnore = '';
    let mRecMod = '';
    //let ten_days_ago=(new Date()).setDate((new Date()).getDate()-30);
    //console.log(typeof(ten_days_ago));
    //console.log(ten_days_ago.toISOString());
    //console.log();

    if (foodTypes.length !== 0) mTypes = '&type=' + foodTypes.join(',');

    if (staple === true) mStaple = '&staple=1';

    if (ignore === true) mIgnore = '&ignore=1';

    if (recentlyModified === true)
        mRecMod = `&dateModified=${moment()
            .subtract(30, 'days')
            .format('YYYY-MM-DD')}`;

    return function(dispatch) {
        axios
            .get(
                `${ROOT_URL}/food?term=${searchTerm}${mTypes}${mStaple}${mIgnore}${mRecMod}`,
                {
                    headers: {
                        Authorization: 'JWT ' + localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                var foodObject = response.data.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                dispatch({ type: GET_FOOD_LIST, payload: foodObject });
            });
    };
};

export const foodModifyAttribute = (type, ids) => {
    let mIds = '';
    //let ten_days_ago=(new Date()).setDate((new Date()).getDate()-30);
    //console.log(typeof(ten_days_ago));
    //console.log(ten_days_ago.toISOString());
    //console.log();

    if (ids.length !== 0) mIds = '&ids=' + ids.join(',');

    // if (staple === true)
    //     mStaple = '&staple=1';

    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/foodModifyAttribute?type=${type}${mIds}`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                let food = { ...store.getState().food };
                let filtered = Object.keys(food)
                    .filter(key => ids.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = food[key];
                        return obj;
                    }, {});

                if (type==='staple')
                    Object.keys(filtered).forEach(function(key) {
                        filtered[key].staple = !filtered[key].staple;
                    });
                else if(type==='ignore')
                    Object.keys(filtered).forEach(function(key) {
                        filtered[key].ignore = !filtered[key].ignore;
                    });

                dispatch({ type: MODIFY_FOOD_ATTRIBUTE, payload: filtered });
                //console.log("Modify food staple");
                //console.log(response.data);
            });
    };
};


export const foodDeleteItems = (ids) => {
    let mIds = '';
    //let ten_days_ago=(new Date()).setDate((new Date()).getDate()-30);
    //console.log(typeof(ten_days_ago));
    //console.log(ten_days_ago.toISOString());
    //console.log();

    if (ids.length !== 0) 
        mIds = '?ids=' + ids.join(',');
    else
        return;

    // if (staple === true)
    //     mStaple = '&staple=1';

    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/foodDeleteItems${mIds}`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                dispatch({ type: DELETE_FOOD_ITEMS, payload: ids });
                //console.log("Modify food staple");
                //console.log(response.data);
            });
    };
};
