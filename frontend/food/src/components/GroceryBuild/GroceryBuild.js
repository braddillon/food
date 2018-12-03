import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search.js';
import Generic from './Generic.js';
import Categories from './Panel_Categories.js';
import FilterButton from './FilterButton.js';
import SideGroceryList from './SideGroceryList.js';
import FoodAddItem from '../Food/AddFood.js';
import Grid from '@material-ui/core/Grid';

import {
    groceryAddListMoveNext,
    groceryAddListMovePrev,
    groceryAddListAddActive,
    setFilter,
    groceryPopulateAddList,
    setFoodTypeCurrent,
    addGroceryItem,
    setPrevSearchTerm,
    matchGroceryItem
} from '../../actions/actions';

import { ADD_FOOD_GROCERY } from '../../components/Food/AddFood'


import { getFoodTypes, resetGroceryBuildFilter } from '../../actions/food';

var buttonHeaderStyle = {
    marginBottom: '1em',
    textAlign: 'center'
};

class GroceryBuildList extends Component {
    constructor(props) {
        super(props);

        this.state = { views: ['search', 'staples', 'categories'] };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.keyPressDetect = this.keyPressDetect.bind(this);
        this.moveView = this.moveView.bind(this);
        this.addGroceryItem = this.addGroceryItem.bind(this);
    }

    buildView() {
        const { filter } = this.props.groceryBuildOptions;
        switch (filter) {
            case 'search':
                return (
                    <Search
                        addGroceryItem={this.addGroceryItem}
                        setPrevSearchTerm={this.props.setPrevSearchTerm}
                        matchGroceryItem={this.props.matchGroceryItem}
                        groceryAddList={this.props.groceryAddList}
                        setFilter={this.props.setFilter}
                    />
                );
            case 'categories':
                return (
                    <Categories
                        addGroceryItem={this.addGroceryItem}
                        buildOptions={this.props.groceryBuildOptions}
                        foodOptions={this.props.foodOptions}
                        setFoodTypeCurrent={this.props.setFoodTypeCurrent}
                        groceryPopulateAddList={this.props.groceryPopulateAddList}
                        groceryAddList={this.props.groceryAddList}
                    />
                );
            case 'addFood':
                return <FoodAddItem addType={ADD_FOOD_GROCERY} history={this.props.history} />;
            default:
                return <Generic type={filter} groceryAddList={this.props.groceryAddList} addGroceryItem={this.addGroceryItem} />;
        }
    }

    moveView(forward) {
        let ind = this.state.views.indexOf(this.props.groceryBuildOptions.filter);
        let newFilter = '';
        if (forward === true) {
            if (ind === this.state.views.length - 1) {
                newFilter = this.state.views[0];
            } else {
                newFilter = this.state.views[ind + 1];
            }
        } else {
            if (ind === 0) {
                newFilter = this.state.views[this.state.views.length - 1];
            } else {
                newFilter = this.state.views[ind - 1];
            }
        }

        this.props.setFilter(newFilter);
        this.props.groceryPopulateAddList(newFilter);
    }

    moveCategory(forward) {
        let ind = parseInt(this.props.groceryBuildOptions.foodTypeCurrent, 10);
        let maxCats = Object.keys(this.props.foodOptions.foodTypes).length;
        let newCat = 0;
        if (forward === true) {
            if (ind === maxCats) {
                newCat = 1;
            } else {
                newCat = ind + 1;
            }
        } else {
            if (ind === 1) {
                newCat = maxCats;
            } else {
                newCat = ind - 1;
            }
        }

        this.props.setFoodTypeCurrent(String(newCat));
        this.props.groceryPopulateAddList('categories');
    }

    keyPressDetect(event) {
        switch (event.keyCode) {
            case 38:
                event.preventDefault();
                this.props.groceryAddListMovePrev();
                break;
            case 40:
                event.preventDefault();
                this.props.groceryAddListMoveNext();
                break;
            case 39:
                event.preventDefault();
                if (event.ctrlKey === true) this.moveView(true);
                else if (event.altKey === true && this.props.groceryBuildOptions.filter === 'categories') {
                    this.moveCategory(true);
                } else {
                    this.props.groceryAddListAddActive();
                }
                break;
            case 37:
                event.preventDefault();
                if (event.ctrlKey === true) this.moveView(false);
                else if (event.altKey === true && this.props.groceryBuildOptions.filter === 'categories') {
                    this.moveCategory(false);
                }
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.props.getFoodTypes();
        // this.props.getFoodTypeDefaultSection();
        window.addEventListener('keydown', this.keyPressDetect);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyPressDetect);
    }

    addGroceryItem(item) {
        if (!(item.id in this.props.groceries)) this.props.addGroceryItem(item);
        // onClick(e) {
        //     e.preventDefault();
        //     if (!(this.props.item.id in this.props.groceries))
        //         this.props.addGroceryItem(this.props.item);
        //     // if(typeof this.props !== "undefined" && this.props.clearPrevSearch) {
        //     //   this.props.clearPrevSearch();
        //     //   this.props.clearMatchGroceryList()
        //     // }
        // }
    }

    render() {
        const { filter } = this.props.groceryBuildOptions;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                    <div style={buttonHeaderStyle}>
                        <FilterButton filter={filter} name="Search" />
                        <FilterButton filter={filter} name="Staples" />
                        <FilterButton filter={filter} name="Categories" />
                    </div>
                    {this.buildView()}
                    <br />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SideGroceryList />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    groceryBuildOptions: state.groceryBuildOptions,
    groceryAddList: state.groceryAddList,
    foodOptions: state.foodOptions,
    groceries: state.groceries
});

const mapDispatchToProps = {
    groceryAddListMoveNext,
    groceryAddListMovePrev,
    groceryAddListAddActive,
    setFilter,
    groceryPopulateAddList,
    setFoodTypeCurrent,
    getFoodTypes,
    addGroceryItem,
    setPrevSearchTerm,
    matchGroceryItem,
    resetGroceryBuildFilter
};

const GroceryBuildListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroceryBuildList);

export default GroceryBuildListContainer;
