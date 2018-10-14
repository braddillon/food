import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import FoodSideBar from './FoodSideBar';
import FoodBrowserItem from './FoodBrowserItem';

import classes from './FoodBrowser.module.css';

import {
    getFoodTypes,
    foodListPopulate,
    foodModifyAttribute,
    foodDeleteItems
} from '../../actions/food';

class FoodBrowser extends Component {
    constructor(props) {
        super(props);

        this.state = { checkBoxes: {}, food: this.props.food };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.food !== props.food) {
            const peopleArray = Object.keys(props.food).reduce((obj, key) => {
                obj[key] = false;
                return obj;
            }, {});

            return {
                food: props.food,
                checkBoxes: peopleArray
            };
        }
        return null;
    }

    componentDidMount() {
        this.props.getFoodTypes();
    }

    onClickAdd = () => {
        console.log('ADD!');
    };

    onClickDelete = () => {
        const checkedItems = Object.keys(this.state.checkBoxes).filter(
            key => this.state.checkBoxes[key] === true
        );

        this.props.foodDeleteItems(checkedItems);
        this.resetCheckBoxes();
    };

    onClickMoveAisle = () => {
        console.log('MOVE AISLE!');
    };

    resetCheckBoxes = () => {
        let chck = { ...this.state.checkBoxes };
        chck = _.mapValues(chck, () => false);
        this.setState({ checkBoxes: chck });
    };

    onClickStaple = () => {
        const checkedItems = Object.keys(this.state.checkBoxes).filter(
            key => this.state.checkBoxes[key] === true
        );

        this.props.foodModifyAttribute('staple', checkedItems);
        this.resetCheckBoxes();
    };

    onClickIgnore = () => {
        const checkedItems = Object.keys(this.state.checkBoxes).filter(
            key => this.state.checkBoxes[key] === true
        );

        this.props.foodModifyAttribute('ignore', checkedItems);
        this.resetCheckBoxes();
    };

    handleCheckChange(id, checked) {
        this.setState({
            checkBoxes: { ...this.state.checkBoxes, [id]: checked }
        });
    }

    render() {
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Sidebar}>
                    <FoodSideBar
                        foodTypes={this.props.foodOptions.foodTypes}
                        foodListPopulate={this.props.foodListPopulate}
                    />
                </div>

                <div className={classes.main}>
                    <div align="left">
                        <Link to={'/food/add'}>
                            <button
                                className={classes.ActionButton}
                                onClick={this.onClickAdd}
                            >
                                Add
                            </button>
                        </Link>

                        <button
                            className={classes.ActionButton}
                            onClick={this.onClickDelete}
                        >
                            Delete
                        </button>
                        <button
                            className={classes.ActionButton}
                            onClick={this.onClickStaple}
                        >
                            Staple
                        </button>
                        <button
                            className={classes.ActionButton}
                            onClick={this.onClickIgnore}
                        >
                            Ignore
                        </button>
                    </div>
                    <div className={classes.FoodBrowser}>
                        {_.map(this.props.food, food => (
                            <FoodBrowserItem
                                name={food.name}
                                id={food.id}
                                key={'fbi' + food.id}
                                value={this.state.checkBoxes[food.id]}
                                staple={food.staple}
                                ignore={food.ignore}
                                checked={this.handleCheckChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    foodOptions: state.foodOptions,
    food: state.food
});

const mapDispatchToProps = {
    getFoodTypes,
    foodListPopulate,
    foodModifyAttribute,
    foodDeleteItems
};

const FoodBrowserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodBrowser);
export default FoodBrowserContainer;
