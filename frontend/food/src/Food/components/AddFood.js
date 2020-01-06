import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import FoodForm from './FoodForm.js';
import _ from 'lodash';


import { getFoodTypes, addFoodItem, resetGroceryBuildFilter } from '../actions/actions';
import { getGroceryStores } from '../../Grocery/actions/actions';

export const ADD_FOOD_FOODBROWSER = 0;
export const ADD_FOOD_GROCERY = 1;
export const ADD_FOOD_RECIPE = 2;

export default function AddFood(props) {
    const dispatch = useDispatch()
    const stores = useSelector(state => state.stores)
    const foodTypes = useSelector(state => state.foodTypes)
    const groceryBuildOptions = useSelector(state => state.groceryBuildOptions)

    useEffect(() => {
        dispatch(getGroceryStores());
        dispatch(getFoodTypes());
    }, [dispatch])

    const handleSubmit = data => {
        if (data.button === 'submit') {
            dispatch(addFoodItem(data, props.addType));
        } else {
            if (props.addType === ADD_FOOD_GROCERY)
                dispatch(resetGroceryBuildFilter())
            else if (props.addType === ADD_FOOD_RECIPE)
                props.onDisableAddMode()
            else
                props.history.push('/foodBrowser/')
        }
    }

    let term = ""
    if (props.addType === ADD_FOOD_GROCERY)
        term = groceryBuildOptions.prevSearchTerm
    else if (props.addType === ADD_FOOD_RECIPE)
        term = props.searchTerm

    // let init = {
    //     ...groceryBuildOptions.addFoodDefaults,
    //     food: term,
    //     foodType: 6,
    //     staple: false,
    //     sections: {}
    // };

    let object = {
        food: term,
        foodtype: 6,
        staple: false,
        sections: {}
    }



    // Object.keys(stores).forEach(key => {
    //     init['section' + stores[key].name] = String(stores[
    //         key
    //     ].defaultSection);
    // });

    //console.log(init)



    if ((stores === undefined) || (_.isEmpty(stores)))
        return <div>Loading Stores</div>
    else if ((foodTypes === undefined) || (_.isEmpty(foodTypes)))
        return <div>Loading FoodTypes</div>
    else {
        return (
            <div>
                <FoodForm
                    object={object}
                    enableReinitialize={true}
                    buildOptions={groceryBuildOptions}
                    stores={stores}
                    foodTypes={foodTypes}
                    onSubmit={handleSubmit}
                />
            </div>
        );
    }
}

