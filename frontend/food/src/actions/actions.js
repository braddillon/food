import { store } from '../store.js';
import axios from 'axios';
import _ from 'lodash';

import {
    MATCH_GROCERY,
    CLEAR_MATCH_GROCERY,
    SET_FILTER,
    SET_PREV_SEARCH,
    SET_GROCERYSTORES,
    SET_FOODTYPE_CURRENT
} from './types';
import {
    GROCERY_POPULATE_ADDLIST,
    GROCERY_LIST_POPULATE,
    SET_STORESECTION_DEFAULT,
    SET_STORELIST_CHECKED
} from './types';
import {
    GROCERY_ADDLIST_OVERRIDE_ITEM,
    WIPE_GROCERY,
    ADD_GROCERY,
    DELETE_GROCERY,
    GROCERY_ADDLIST_SET_ALL_VISIBLE
} from './types';

export let ROOT_URL;

if (window.location.host.includes('codesoldier')) {
	ROOT_URL = `https://${window.location.host}/api`;
} else {
	let chunks = window.location.host.split(':');
    // ROOT_URL = `http://` + chunks[0] + `:8000/api`;
    ROOT_URL = `http://` + chunks[0] + `/api`;
}







export const matchGroceryItem = g => {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/food?term=${g}`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                let groceries = store.getState().groceries;

                response.data.forEach(value => {
                    value.active = false;
                    if (value.id in groceries) value.visible = false;
                    else value.visible = true;
                });

                if (response.data.length !== 0) {
                    response.data[0].active = true;
                    dispatch({ type: MATCH_GROCERY, payload: response.data });
                } else dispatch({ type: SET_FILTER, payload: 'addFood' });
            });
    };
};

export const setStoreListChecked = g => {
    return function(dispatch) {
        dispatch({ type: SET_STORELIST_CHECKED, payload: g });
    };
};

// export const getFoodTypeDefaultSection = () => {
//     return function (dispatch) {
//         axios.get(`${ROOT_URL}/foodTypeDefaultSectionList`, {
//             headers: { 'Authorization' : 'JWT ' + localStorage.getItem('token') }
//         }).then((response) => {
//             var tmp = response.data.reduce((obj, item) => Object.assign(obj, {[item.foodType + "," + item.store]: {foodType: item.foodType, store: item.store, section: item.section }}) ,{});
//             console.log(tmp)
//             //dispatch({ type: SET_FOODTYPE_DEFAULT_SECTION, payload: tmp })
//         })
//     }
// };

export const getGroceryStores = () => {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/groceryStoreList`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                response.data.forEach(function(element) {
                    //console.log(element)
                    element.sections = element.sections.reduce(
                        (obj, item) =>
                            Object.assign(obj, {
                                [item.id]: {
                                    id: item.id,
                                    sectionName: item.sectionName,
                                    order: item.order
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
                                sections: item.sections
                            }
                        }),
                    {}
                );

                let defaultStoreSection = {};

                _.forEach(tmp, function(value) {
                    let tmpDefaultStoreSection = _.pickBy(
                        value.sections,
                        function(value2) {
                            return value2.sectionName === 'Vegetables';
                        }
                    );

                    if (_.isEmpty(tmpDefaultStoreSection))
                        defaultStoreSection['section' + value.name] = parseInt(
                            Object.keys(value.sections)[0], 10
                        );
                    else
                        defaultStoreSection['section' + value.name] = parseInt(
                            Object.keys(tmpDefaultStoreSection)[0], 10
                        );
                });
                dispatch({ type: SET_GROCERYSTORES, payload: tmp });
                dispatch({
                    type: SET_STORESECTION_DEFAULT,
                    payload: defaultStoreSection
                });
            });
    };
};

export const setFoodTypeCurrent = g => {
    return function(dispatch) {
        dispatch({ type: SET_FOODTYPE_CURRENT, payload: g });
    };
};

export const groceryAddListMoveNext = () => {
    return function(dispatch) {
        let groceryAddList = store.getState().groceryAddList;
        let activeId = groceryAddList
            .map(e => {
                return e.active;
            })
            .indexOf(true);
        let visibleItems = groceryAddList.map(e => {
            return e.visible;
        });
        let nextVisId = visibleItems.indexOf(true, activeId + 1);
        if (nextVisId === -1) {
            nextVisId = visibleItems.indexOf(true);
            if (nextVisId === -1) {
                // No visible matches, fail
                return;
            }
        }

        dispatch({
            type: GROCERY_ADDLIST_OVERRIDE_ITEM,
            payload: { ...groceryAddList[activeId], 'active': false }
        });
        dispatch({
            type: GROCERY_ADDLIST_OVERRIDE_ITEM,
            payload: { ...groceryAddList[nextVisId], 'active': true }
        });
    };
};

export const groceryAddListMovePrev = () => {
    return function(dispatch) {
        let groceryAddList = store.getState().groceryAddList;
        let activeId = groceryAddList
            .map(e => {
                return e.active;
            })
            .indexOf(true);
        let visibleItems = groceryAddList.map(e => {
            return e.visible;
        });
        let nextVisId = visibleItems.lastIndexOf(true, activeId - 1);
        if (nextVisId === -1) {
            nextVisId = visibleItems.lastIndexOf(true);
            if (nextVisId === -1) {
                // No visible matches, fail
                return;
            }
        }

        dispatch({
            type: GROCERY_ADDLIST_OVERRIDE_ITEM,
            payload: { ...groceryAddList[activeId], 'active': false }
        });
        dispatch({
            type: GROCERY_ADDLIST_OVERRIDE_ITEM,
            payload: { ...groceryAddList[nextVisId], 'active': true }
        });
    };
};

// export const groceryAddListMovePrev = () => {
//     let groceryAddList = store.getState().groceryAddList
//     let setActiveId = [];
//     let setInactiveId = [];

//     for (var i = 0; i < groceryAddList.length; i++) {
//         if (groceryAddList[i].active === true) {
//             setInactiveId.push(groceryAddList[i].id)
//             if (i===0) {
//                 setActiveId.push(groceryAddList[groceryAddList.length-1].id)
//             }
//             else {
//                 setActiveId.push(groceryAddList[i-1].id)
//             }
//         break;
//         }
//     }

//     return ({
//         type: GROCERY_ADDLIST_TOGGLE_ACTIVE,
//         payload: {activeId: setActiveId, inactiveId: setInactiveId}
//     })
// };

export const groceryAddListAddActive = () => {
    return function(dispatch) {
        let groceryAddList = store.getState().groceryAddList;
        let active = 0;

        for (var i = 0; i < groceryAddList.length; i++) {
            if (groceryAddList[i].active === true) {
                active = i;

                axios
                    .post(
                        `${ROOT_URL}/groceryCreate`,
                        { food: groceryAddList[i].id, deferred: false },
                        {
                            headers: {
                                Authorization:
                                    'JWT ' + localStorage.getItem('token')
                            }
                        }
                    )
                    .then(() => {
                        dispatch({
                            type: GROCERY_ADDLIST_OVERRIDE_ITEM,
                            payload: {
                                ...groceryAddList[active],
                                'visible': false
                            }
                        });

                        dispatch({
                            type: ADD_GROCERY,
                            payload: {
                                id: groceryAddList[active].id,
                                name: groceryAddList[active].name,
                                deferred: false
                            }
                        });

                        dispatch(groceryAddListMoveNext());
                    });
            }
        }
    };
};

export const groceryPopulateAddList = type => {
    var endpoint = '';

    switch (type) {
        case 'search':
            return function(dispatch) {
                dispatch({ type: CLEAR_MATCH_GROCERY });
            };
        case 'staples':
            endpoint = `${ROOT_URL}/staples`;
            break;
        case 'fruit':
            endpoint = `${ROOT_URL}/staples`;
            break;
        case 'categories':
            endpoint = `${ROOT_URL}/food?type=${
                store.getState().groceryBuildOptions.foodTypeCurrent
            }`;
            break;
        default:
            break;
    }

    return function(dispatch) {
        axios
            .get(endpoint, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                let groceries = store.getState().groceries;

                response.data.forEach(value => {
                    value.active = false;
                    if (value.id in groceries) value.visible = false;
                    else value.visible = true;
                });

                if (response.data.length !== 0) response.data[0].active = true;

                dispatch({
                    type: GROCERY_POPULATE_ADDLIST,
                    payload: response.data
                });
            });
    };
};

export const clearMatchGroceryList = () => {
    return {
        type: CLEAR_MATCH_GROCERY
    };
};

export const addGroceryItem = gItem => {
    return function(dispatch) {
        axios
            .post(
                `${ROOT_URL}/groceryCreate`,
                { food: gItem.id, deferred: false },
                {
                    headers: {
                        Authorization: 'JWT ' + localStorage.getItem('token')
                    }
                }
            )
            .then((response) => {
                dispatch({
                    type: ADD_GROCERY,
                    payload: response.data
                });
                dispatch({
                    type: GROCERY_ADDLIST_OVERRIDE_ITEM,
                    payload: { ...gItem, 'visible': false }
                });
            });
    };
};

export const deleteGroceryItem = gId => {
    return function(dispatch) {
        axios
            .delete(`${ROOT_URL}/groceryDetail/${gId}/`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                dispatch({ type: DELETE_GROCERY, payload: gId });
                let grcAddList = store.getState().groceryAddList;
                let gItem = grcAddList.filter(x => x.id === gId);

                dispatch({
                    type: GROCERY_ADDLIST_OVERRIDE_ITEM,
                    payload: { ...gItem[0], 'visible': true }
                });
            });
    };
};

export const deleteGroceryAll = () => {
    return function(dispatch) {
        axios
            .post(
                `${ROOT_URL}/wipeGrocery`,
                {},
                {
                    headers: {
                        Authorization: 'JWT ' + localStorage.getItem('token')
                    }
                }
            )
            .then(() => {
                dispatch({ type: WIPE_GROCERY, payload: '' });
                dispatch({
                    type: GROCERY_ADDLIST_SET_ALL_VISIBLE,
                    payload: ''
                });
            });
    };
};

export const groceryList_populate = () => {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/groceryList`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                Object.keys(response.data).forEach(function(key) {
                    response.data[key].checked = false;
                });
                dispatch({
                    type: GROCERY_LIST_POPULATE,
                    payload: response.data
                });
            });
    };
};

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        payload: filter
    };
};

export const setPrevSearchTerm = prevSearch => {
    return {
        type: SET_PREV_SEARCH,
        payload: prevSearch
    };
};
