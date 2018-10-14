import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { groceryList_populate, deleteGroceryItem } from '../../actions/actions';
import { getGroceryStores2 } from '../../actions/store';
import StoreSection from './StoreSection.js';

import classes from './StoreList.module.css';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comboValue: 5,
            locked: false
        };

        this.deleteCheckedItems = this.deleteCheckedItems.bind(this);
        this.comboChange = this.comboChange.bind(this);
    }

    componentDidMount() {
        this.props.getGroceryStores2();
        this.props.groceryList_populate();
    }

    deleteCheckedItems(e) {
        let itemsToDelete = _.pickBy(this.props.groceries, function(
            value,
            key
        ) {
            return value.checked === true;
        });
        let delItem = this.props.deleteGroceryItem;
        _.forOwn(itemsToDelete, function(value, key) {
            delItem(key);
        });
    }

    comboChange(e) {
        this.setState({ comboValue: e.target.value });
    }

    buildList() {
        //var result = '';
        if (!_.isEmpty(this.props.stores))
            return _.map(
                this.props.stores[this.state.comboValue].sections,
                section => (
                    <StoreSection
                        key={section.id}
                        id={section.id}
                        name={section.sectionName}
                        storeId={this.state.comboValue}
                        locked={this.state.locked}
                    />
                )
            );
        else return 'empty';
    }

    render() {
        let lockedClasses = 'btn btn-primary';
        if (this.state.locked) {
            lockedClasses = "btn btn-danger";
        }

        return (
            <div className={classes.storeList}>
                <div className="form-group">
                    <select
                        className="form-control"
                        id="sel1"
                        onChange={this.comboChange}
                        value={this.state.comboValue}
                        disabled={this.state.locked}
                    >
                        {_.map(this.props.stores, store => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.deleteCheckedItems}
                    disabled={this.state.locked}
                >
                    Remove Item
                </button>
                <button
                    type="button"
                    className={lockedClasses}
                    onClick={() => this.setState(prevState => ({ locked: !prevState.locked }))}
                >
                    Lock
                </button>

                {this.buildList()}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    groceryBuildOptions: state.groceryBuildOptions,
    groceries: state.groceries,
    stores: state.stores
});

const mapDispatchToProps = {
    getGroceryStores2,
    groceryList_populate,
    deleteGroceryItem
};

const StoreListContainer = connect(mapStateToProps, mapDispatchToProps)(
    StoreList
);
export default StoreListContainer;
