import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm.js';

import { setFilter } from '../../actions/actions';
import { getGroceryStores2 } from '../../actions/store';
import { addFoodItem, getFoodTypes, resetGroceryBuildFilter } from '../../actions/food';


export const ADD_FOOD_FOODBROWSER = 0;
export const ADD_FOOD_GROCERY = 1;
export const ADD_FOOD_RECIPE = 2;

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = { addToGrocery: this.props.addToGrocery};
    }

    componentDidMount() {
        this.props.getFoodTypes();
        this.props.getGroceryStores2();
    }

    handleSubmit(data) {
        if (data.button === 'submit') {
            this.props.addFoodItem(data, this.props.addType);
        } else {
            if (this.props.addType === ADD_FOOD_GROCERY)
                this.props.resetGroceryBuildFilter()
            else if (this.props.addType === ADD_FOOD_RECIPE)
                this.props.onDisableAddMode()
            else
                this.props.history.push('/foodBrowser/')
        }
    }

    render() {
        let term = ""
        if (this.props.addType === ADD_FOOD_GROCERY)
            term = this.props.groceryBuildOptions.prevSearchTerm
        else if (this.props.addType === ADD_FOOD_RECIPE)
            term = this.props.searchTerm

        let init = {
            ...this.props.groceryBuildOptions.addFoodDefaults,
            foodName: term,
            staple: false
        };

        

        Object.keys(this.props.stores).forEach(key => {
            init['section' + this.props.stores[key].name] = String(this.props.stores[
                key
            ].defaultSection);
        });

        return (
            <div>
                <FoodForm
                    initialValues={init}
                    enableReinitialize={true}
                    buildOptions={this.props.groceryBuildOptions}
                    stores={this.props.stores}
                    foodTypes={this.props.foodOptions.foodTypes}
                    onSubmit={this.handleSubmit.bind(this)}
                />
                {/* <FoodForm2 foodTypes={this.props.foodOptions.foodTypes} /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    groceries: state.groceries,
    groceryBuildOptions: state.groceryBuildOptions,
    stores: state.stores,
    foodOptions: state.foodOptions
});

const mapDispatchToProps = {
    getGroceryStores2,
    getFoodTypes,
    setFilter,
    addFoodItem,
    resetGroceryBuildFilter
};

const AddFoodContainer = connect(mapStateToProps, mapDispatchToProps)(AddFood);

export default AddFoodContainer;
