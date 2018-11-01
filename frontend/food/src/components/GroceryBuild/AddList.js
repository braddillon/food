import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import GroceryAddItem from './AddItem.js';


const styles = theme => ({
    listGroup: {
        padding: 0
    },
});


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
        const { classes } = this.props;
        return (
            <div>
                <ul className={classes.listGroup}>{this.renderList()}</ul>
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

export default withStyles(styles)(GroceryAddList);
