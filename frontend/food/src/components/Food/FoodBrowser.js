import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';
import FoodSideBar from './FoodSideBar';
import FoodBrowserItem from './FoodBrowserItem';

import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import StapleIcon from '@material-ui/icons/Grade';
import IgnoreIcon from '@material-ui/icons/RemoveShoppingCart';

//import classes from './FoodBrowser.module.css';

const styles = theme => ({
    foodBrowser: {
        paddingTop: 20
    },
    button: {
        backgroundColor: '#337ab7',
        borderColor: '#337ab7',
        color: '#fff',
        margin: 5
    },
    iconButton: {
        padding: 0,
        marginLeft: 'auto',
        marginRight: 5
    }
});

class FoodBrowser extends Component {
    state = {
        checkBoxes: {},
        food: this.props.food,
        filterDrawerOpen: false
    };

    static getDerivedStateFromProps(props, state) {
        if (state.food !== props.food) {
            const peopleArray = Object.keys(props.food).reduce((obj, key) => {
                obj[key] = false;
                return obj;
            }, {});

            return {
                food: props.food,
                checkBoxes: peopleArray,
                filterDrawerOpen: false
            };
        }
        return null;
    }

    toggleFilter = () => {
        this.setState(prevState => ({
            filterDrawerOpen: !prevState.filterDrawerOpen
        }));
    };

    resetCheckBoxes = () => {
        let chck = { ...this.state.checkBoxes };
        chck = _.mapValues(chck, () => false);
        this.setState({ checkBoxes: chck });
    };

    handleCheckChange = (id, checked) => {
        this.setState({
            checkBoxes: { ...this.state.checkBoxes, [id]: checked }
        });
    };

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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FoodSideBar
                    open={this.state.filterDrawerOpen}
                    closeSide={() => this.setState({ filterDrawerOpen: false })}
                    foodTypes={this.props.foodOptions.foodTypes}
                    foodListPopulate={this.props.foodListPopulate}
                />

                <div>
                    <Link to={'/food/add'}>
                        <Button
                            variant="fab"
                            color="secondary"
                            aria-label="Add"
                            className={classes.button}
                            // onClick={() => {
                            //     this.setState({ filterDrawerOpen: true });
                            // }}
                        >
                            <AddIcon />
                        </Button>
                    </Link>

                    <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Delete"
                        className={classes.button}
                        onClick={this.onClickDelete}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Staple"
                        className={classes.button}
                        onClick={this.onClickStaple}
                    >
                        <StapleIcon />
                    </Button>
                    <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Ignore"
                        className={classes.button}
                        onClick={this.onClickIgnore}
                    >
                        <IgnoreIcon />
                    </Button>

                    <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Add"
                        className={classes.button}
                        onClick={() => {
                            this.setState({ filterDrawerOpen: true });
                        }}
                    >
                        <FilterIcon />
                    </Button>
                </div>
                <div className={classes.foodBrowser}>
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
        );
    }
}

export default withStyles(styles)(FoodBrowser);
