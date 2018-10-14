import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodForm from './FoodForm.js';

import { setFilter } from '../../actions/actions';
import { getGroceryStores2 } from '../../actions/store';
import { addFoodItem, getFoodTypes } from '../../actions/food';

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
            this.props.addFoodItem(data, this.props.addToGrocery);
        }
    }

    render() {
        let init = {
            ...this.props.groceryBuildOptions.addFoodDefaults,
            foodName: this.props.groceryBuildOptions.prevSearchTerm,
            staple: false
        };

        Object.keys(this.props.stores).forEach(key => {
            init['section' + this.props.stores[key].name] = this.props.stores[
                key
            ].defaultSection;
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
    addFoodItem
};

const AddFoodContainer = connect(mapStateToProps, mapDispatchToProps)(AddFood);

export default AddFoodContainer;
