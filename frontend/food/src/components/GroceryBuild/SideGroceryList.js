import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';

import {
    groceryList_populate,
    deleteGroceryItem,
    deleteGroceryAll
} from '../../actions/actions';

class GroceryList extends Component {


    componentDidMount() {
        this.props.groceryList_populate();
    }

    onDeleteClick(id) {
        //this.props.deleteTodo(id, () => {this.props.history.push('/')});
        //brad
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
                    <span
                        className="btn btn-danger"
                        onClick={this.onDeleteAll.bind(this)}
                    >
                        <span
                            className="glyphicon glyphicon-trash"
                            aria-hidden="true"
                        />
                    </span>
                </h1>

                <ul className="list-group">
                    {_.map(sortedGroceries, g => (
                        <li className="list-group-item" key={g.id}>
                            {g.name}
                            <span
                                className="pull-right btn btn-xs btn-danger pull-xs-right"
                                onClick={this.onDeleteClick.bind(this, g.id)}
                            >
                                <span
                                    className="glyphicon glyphicon-trash"
                                    aria-hidden="true"
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    groceries: state.groceries
});

const mapDispatchToProps = {
    groceryList_populate,
    deleteGroceryItem,
    deleteGroceryAll
};

const GroceryListContainer = connect(mapStateToProps, mapDispatchToProps)(
    GroceryList
);

export default GroceryListContainer;
