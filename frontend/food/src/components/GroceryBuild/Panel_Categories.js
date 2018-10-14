import React, { Component } from 'react';

import GroceryAddList from './AddList.js';
import _ from 'lodash';

class Categories extends Component {
    componentDidMount() {
        //this.props.getFoodTypes();
        this.props.groceryPopulateAddList('categories');
    }

    render() {
        let foodTypes = this.props.foodOptions.foodTypes;
        return (
            <div>
                <div className="form-group">
                    <label>Food Type:</label>
                    <select
                        className="form-control"
                        value={this.props.buildOptions.foodTypeCurrent}
                        id="sel1"
                        onChange={e => {
                            this.props.setFoodTypeCurrent(e.target.value);
                            this.props.groceryPopulateAddList('categories');
                        }}
                    >
                        {_.map(foodTypes, (o, i) => (
                            <option key={i} value={i}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </div>
                <GroceryAddList groceryAddList={this.props.groceryAddList} addGroceryItem={this.props.addGroceryItem}/>
            </div>
        );
    }
}

export default Categories;
