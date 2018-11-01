import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';
import GroceryItem from './GroceryItem';
import IconDelete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { groceryList_populate, deleteGroceryItem, deleteGroceryAll } from '../../actions/actions';

class GroceryList extends Component {
    componentDidMount() {
        this.props.groceryList_populate();
    }

    onDeleteClick(id) {
        this.props.deleteGroceryItem(id);
    }

    onDeleteAll() {
        this.props.deleteGroceryAll();
    }

    render() {
        let sortedGroceries = _.sortBy(this.props.groceries, ['name']);
        return (
            <div>
                <h1>
                    Groceries
                    <IconButton variant="fab" color="secondary" aria-label="Edit" onClick={this.onDeleteAll.bind(this)}>
                        <IconDelete />
                    </IconButton>
                </h1>

                {_.map(sortedGroceries, g => (
                    <GroceryItem item={g} key={g.id} onDelete={() => this.onDeleteClick(g.id)} />
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
    deleteGroceryAll
};

const GroceryListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroceryList);

export default GroceryListContainer;
