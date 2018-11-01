import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodBrowser from './FoodBrowser';

import {
    getFoodTypes,
    foodListPopulate,
    foodModifyAttribute,
    foodDeleteItems
} from '../../actions/food';

class FoodBrowserContainer extends Component {
    componentDidMount() {
        this.props.getFoodTypes();
        this.props.foodListPopulate('', [], false, false, true);
    }

    render() {
        return (
            <FoodBrowser
                foodOptions={this.props.foodOptions}
                food={this.props.food}
                foodListPopulate={this.props.foodListPopulate}
                foodModifyAttribute={this.props.foodModifyAttribute}
                foodDeleteItems={this.props.foodDeleteItems}
            />
        );
    }
}

const mapStateToProps = state => ({
    foodOptions: state.foodOptions,
    food: state.food
});

const mapDispatchToProps = {
    getFoodTypes,
    foodListPopulate,
    foodModifyAttribute,
    foodDeleteItems
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodBrowserContainer);

//export default FoodBrowserContainer;
