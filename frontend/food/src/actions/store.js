import axios from 'axios';

import { SET_STORES } from './types';

import { ROOT_URL } from './actions';
import _ from 'lodash';

export const getGroceryStores2 = () => {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}/groceryStoreList`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                response.data.forEach(function(element) {
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

                _.forEach(tmp, function(value, key) {
                    let tmpDefaultStoreSection = _.pickBy(
                        value.sections,
                        (value2) => value2.sectionName === 'Vegetables'
                    );

                    if (_.isEmpty(tmpDefaultStoreSection))
                        defaultStoreSection['section' + value.name] = parseInt(
                            Object.keys(value.sections)[0],10
                        );
                    else
                        defaultStoreSection['section' + value.name] = parseInt(
                            Object.keys(tmpDefaultStoreSection)[0], 10
                        );

                    if (_.isEmpty(tmpDefaultStoreSection))
                        tmp[key]['defaultSection'] = parseInt(
                            Object.keys(value.sections)[0], 10
                        );
                    else
                        tmp[key]['defaultSection'] = parseInt(
                            Object.keys(tmpDefaultStoreSection)[0], 10
                        );
                });
                dispatch({ type: SET_STORES, payload: tmp });
            });
    };
};
