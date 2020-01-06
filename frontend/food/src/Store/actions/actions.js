import { HTTP } from "../../Other/HTTP";

import {
    STORE_UPDATE_SECTION_ORDER,
    EDIT_STORE,
    ADD_STORE,
    REMOVE_STORE,
    ADD_STORE_SECTION,
    EDIT_STORE_SECTION,
    REMOVE_STORE_SECTION,
  } from "./types";

export const updateStoreSectionOrder = (store) => {
    return function (dispatch) {
        HTTP
            .put(
                `storeSectionOrderUpdate/${store.id}/`,
                {
                    sections: store.sections,
                }
            )
            .then(response => {
                dispatch({ type: STORE_UPDATE_SECTION_ORDER, payload: store });
            })
            .catch(err => {
                console.log('grocery store section order error');
                console.log(err);
            });
    };
};


export const editStore = (storeId, storeName) => {
    return function (dispatch) {
        HTTP
            .put(`groceryStoreDetail/${storeId}/`,
                {
                    id: storeId,
                    name: storeName
                }
            )
            .then(response => {
                console.log("post");
                dispatch({
                    type: EDIT_STORE,
                    payload: response.data
                })
            })
    };
};

export const addStore = (storeName) => {
    return function (dispatch) {
        HTTP
            .post(`storeCreate`,
                {
                    name: storeName
                }
            )
            .then(response => {
                dispatch({
                    type: ADD_STORE,
                    payload: response.data
                })
            })
    };
};

export const removeStore = (storeId) => {
    return function (dispatch) {
        HTTP
            .delete(`groceryStoreDetail/${storeId}/`)
            .then(response => {
                dispatch({
                    type: REMOVE_STORE,
                    payload: storeId
                })
            })
    };
};


export const addStoreSection = (sectionName, storeId) => {
    return function (dispatch) {
        HTTP
            .post(`storeSectionCreate`,
                {
                    name: sectionName,
                    store_id: storeId
                }
            )
            .then(response => {
                dispatch({
                    type: ADD_STORE_SECTION,
                    payload: response.data
                })
            })
    };
};

export const editStoreSection = (sectionId, sectionName, order, storeId) => {
    console.log("Edit store section");
    return function (dispatch) {
        HTTP
            .put(`groceryStoreSectionDetail/${sectionId}/`,
                {
                    id: sectionId,
                    sectionName: sectionName,
                    order: order
                }
            )
            .then(response => {
                console.log("post");
                console.log(response.data);
                dispatch({
                    type: EDIT_STORE_SECTION,
                    payload: {store_id: storeId, section_id: response.data.id, sectionName: response.data.sectionName, order: response.data.order }
                })
            })
    };
};

export const removeStoreSection = (storeId, sectionId) => {
    return function (dispatch) {
        HTTP
            .delete(`groceryStoreSectionDetail/${sectionId}/`)
            .then(response => {
                dispatch({
                    type: REMOVE_STORE_SECTION,
                    payload: { store_id: storeId, section_id: sectionId }
                })
            })
    };
};

export const editStoreFoodTypeDefaultSection = (storeId, defaults) => {
    console.log("Edit store food type default sections");
    console.log(storeId)
    console.log(defaults);
    return function (dispatch) {
        HTTP
            .put(`storeFoodTypeDefaultSectionUpdate/${storeId}/`,
                { 'foodtypedefaultsections': defaults }
            )
            .then(response => {
                console.log("post");
                console.log(response.data);
                // dispatch({
                //     type: EDIT_STORE_FOODTYPE_DEFAULT_SECTIONS,
                //     payload: {store_id: storeId, section_id: response.data.id, sectionName: response.data.sectionName, order: response.data.order }
                // })
            })
    };
};