import React, { Component } from 'react';
import { connect } from 'react-redux';

import FoodBrowser from './FoodBrowser';

import {
    getFoodTypes,
    foodListPopulate,
    foodModifyAttribute,
    foodDeleteItems
} from '../actions/actions';

class FoodBrowserContainer extends Component {
    componentDidMount() {
        this.props.getFoodTypes();
        this.props.foodListPopulate('', [], false, false, true);
    }

    render() {
        return (
            <FoodBrowser
                foodTypes={this.props.foodTypes}
                food={this.props.food}
                foodListPopulate={this.props.foodListPopulate}
                foodModifyAttribute={this.props.foodModifyAttribute}
                foodDeleteItems={this.props.foodDeleteItems}
            />
        );
    }
}

const mapStateToProps = state => ({
    foodTypes: state.foodTypes,
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
