import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { groceryList_populate, deleteGroceryItem, getGroceryStores } from '../../Grocery/actions/actions';
import StoreGrocerySection from './StoreGrocerySection.js';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap',
        marginBottom: 25
    },
    button: {
        margin: 2,
        textTransform: 'none'
    },
    locked: {
        backgroundColor: 'red',
        hover: {
            backgroundColor: 'red'
        }
    },
    storeList: {
        textAlign: 'left',
        marginLeft: '1em',
    }
});

class StoreGroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comboValue: 4,
            locked: false
        };

        this.deleteCheckedItems = this.deleteCheckedItems.bind(this);
        this.comboChange = this.comboChange.bind(this);
    }

    componentDidMount() {
        this.props.getGroceryStores();
        this.props.groceryList_populate();
    }

    deleteCheckedItems(e) {
        let itemsToDelete = _.pickBy(this.props.groceries, function (value, key) {
            return value.checked === true;
        });
        let delItem = this.props.deleteGroceryItem;
        _.forOwn(itemsToDelete, function (value, key) {
            delItem(key);
        });
    }

    comboChange(e) {
        this.setState({ comboValue: e.target.value });
    }

    buildList() {
        const sections = this.props.stores[this.state.comboValue].sections;

        if (!_.isEmpty(this.props.stores))
            return Object.keys(this.props.stores[this.state.comboValue].sections)
                .sort((a, b) => sections[a].order - sections[b].order)
                .map(section => (
                    <StoreGrocerySection key={sections[section].id} id={sections[section].id} name={sections[section].sectionName} storeId={this.state.comboValue} locked={this.state.locked} />
                ));
        else return 'empty';
    }

    render() {
        const { classes } = this.props;

        let lockedClasses = classes.button;
        if (this.state.locked) {
            lockedClasses = [classes.button, classes.locked].join(' ');
        }

        if (_.isEmpty(this.props.stores))
            return <div></div>

        return (
            <div className={classes.storeList}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="stores">Store:</InputLabel>
                    <Select
                        value={this.state.comboValue}
                        onChange={this.comboChange}
                        disabled={this.state.locked}
                        inputProps={{
                            name: 'stores',
                            id: 'stores'
                        }}
                    >
                        {_.map(this.props.stores, store => (
                            <MenuItem value={store.id} key={store.id}>
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Button variant="contained" color="secondary" className={classes.button} onClick={this.deleteCheckedItems} disabled={this.state.locked}>
                    Remove Item
                </Button>
                <Button variant="contained" color="secondary" className={lockedClasses} onClick={() => this.setState(prevState => ({ locked: !prevState.locked }))}>
                    Lock
                </Button>
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
    getGroceryStores,
    groceryList_populate,
    deleteGroceryItem
};

const StoreGroceryListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreGroceryList);
export default withStyles(styles)(StoreGroceryListContainer);
