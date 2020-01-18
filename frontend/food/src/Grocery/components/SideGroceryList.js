import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import GroceryItem from './GroceryItem';
import IconDelete from '@material-ui/icons/Delete';
import IconCheckFridge from '@material-ui/icons/Kitchen';
import IconButton from '@material-ui/core/IconButton';

import { groceryList_populate, deleteGroceryItem, deleteGroceryAll, updateGroceryItem } from '../actions/actions';

const styles = theme => ({
    checkFridgeActive: {
        color: 'red',
    },
    checkFridgeInActive: {
        color: 'grey',
    },
    fridgePadding: {
        marginLeft: 20
    }
  });


class GroceryList extends Component {
    state = {
        filterCheck: false
    }

    componentDidMount() {
        this.props.groceryList_populate();
    }

    onDeleteClick(id) {
        this.props.deleteGroceryItem(id);
    }

    onFlipCheck(gItem) {
        let g = { ...gItem, check: !gItem.check }
        this.props.updateGroceryItem(g);
    }

    onDeleteAll() {
        this.props.deleteGroceryAll();
    }

    

    render() {
        const { classes } = this.props;
        let sortedGroceries = _.sortBy(this.props.groceries, ['name']);

        if (this.state.filterCheck === true)
            sortedGroceries = Object.keys(sortedGroceries)
                .filter((key) => (sortedGroceries[key].check === true))
                .reduce((newObj, key) => Object.assign(newObj, { [key]: sortedGroceries[key] }), {})


        return (
            <div>
                <h1>
                    Groceries
                    <IconButton variant="fab" color="secondary" aria-label="Edit" className={classes.fridgePadding} onClick={() => this.setState(prevState => ({filterCheck: !prevState.filterCheck}))}>
                        <IconCheckFridge className={this.state.filterCheck ? classes.checkFridgeActive : classes.checkFridgeInActive} />
                    </IconButton>
                    <IconButton variant="fab" color="secondary" aria-label="Edit" onClick={this.onDeleteAll.bind(this)}>
                        <IconDelete />
                    </IconButton>
                </h1>

                {_.map(sortedGroceries, g => (
                    <GroceryItem item={g} key={g.id} onDelete={() => this.onDeleteClick(g.id)} onFlipCheck={() => this.onFlipCheck(g)} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groceries: state.groceries
});

const mapDispatchToProps = {
    groceryList_populate,
    deleteGroceryItem,
    deleteGroceryAll,
    updateGroceryItem
};

const GroceryListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroceryList);

export default withStyles(styles)(GroceryListContainer);
