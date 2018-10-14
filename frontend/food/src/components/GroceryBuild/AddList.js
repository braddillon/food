import React, { Component } from 'react';

import _ from 'lodash';

import GroceryAddItem from './AddItem.js';

class GroceryAddList extends Component {
    renderList() {
        let visibleItems = _.pickBy(this.props.groceryAddList, value => value.visible);

        return _.map(visibleItems, matchItem => (
            <GroceryAddItem
                item={matchItem}
                key={matchItem.id}
                clearPrevSearch={this.props.clearPrevSearch}
                addGroceryItem={this.props.addGroceryItem}
            />
        ));
    }

    render() {
        return (
            <div>
                <ul className="list-group">{this.renderList()}</ul>
            </div>
        );
    }
}

// const mapStateToProps = (state) => ({
//     // groceryAddList: state.groceryAddList,
//     groceries: state.groceries
// });

// const mapDispatchToProps = {};

// const GroceryAddListContainer = connect(mapStateToProps, mapDispatchToProps)(
//     GroceryAddList
// );

export default GroceryAddList;
