import React, { Component } from 'react';

import GroceryAddList from './AddList.js';

class GroceryBuildSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '', prevSearch: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.clearPrevSearch = this.clearPrevSearch.bind(this);
    }

    clearPrevSearch() {
        this.setState({ prevSearch: '' });
        this.props.setPrevSearchTerm('');
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.matchGroceryItem(this.state.value);
        this.setState({ prevSearch: this.state.value });
        this.props.setPrevSearchTerm(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        autoFocus
                        autoComplete="off"
                        id="txtSearchItem"
                        className="form-control"
                        value={this.state.value}
                        onChange={e => {
                            this.setState({ value: e.target.value });
                        }}
                    />
                </form>
                <GroceryAddList clearPrevSearch={this.clearPrevSearch} groceryAddList={this.props.groceryAddList} addGroceryItem={this.props.addGroceryItem}/>
                {this.state.prevSearch !== '' ? (
                    <button className="btn btn-danger pull-right">Adhoc</button>
                ) : (
                    <div />
                )}
                {this.state.prevSearch !== '' ? (
                    <button
                        className="btn btn-danger pull-right"
                        onClick={() => {
                            this.props.setFilter('addFood');
                        }}
                    >
                        Add {this.state.prevSearch}
                    </button>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default GroceryBuildSearch;
