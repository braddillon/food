import React from 'react';
import { connect } from 'react-redux';

import {
    setFilter,
    groceryPopulateAddList,
    setFoodTypeCurrent
} from '../../actions/actions';

const groceryBuildFilterButton = props => {
    return (
        <button
            className={
                'btn btn-primary ' +
                (props.filter === props.name.toLowerCase() ? 'active' : '')
            }
            onClick={() => {
                //props.setFoodTypeCurrent(1)
                props.groceryPopulateAddList(props.name.toLowerCase());
                props.setFilter(props.name.toLowerCase());
            }}
        >
            {props.name}
        </button>
    );
};

const mapDispatchToProps = {
    setFilter,
    groceryPopulateAddList,
    setFoodTypeCurrent
};

const GroceryBuildFilterButtonContainer = connect(null, mapDispatchToProps)(
    groceryBuildFilterButton
);

export default GroceryBuildFilterButtonContainer;
