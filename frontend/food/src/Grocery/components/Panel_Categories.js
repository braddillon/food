import React, { Component } from 'react';

import GroceryAddList from './AddList.js';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap',
        marginBottom: 40
    }
});

class Categories extends Component {
    componentDidMount() {
        this.props.groceryPopulateAddList('categories');
    }

    render() {
        const { classes } = this.props;

        let foodTypes = this.props.foodTypes;
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="foodtype">Food Type</InputLabel>
                    <Select
                        value={this.props.buildOptions.foodTypeCurrent}
                        onChange={e => {
                            this.props.setFoodTypeCurrent(e.target.value);
                            this.props.groceryPopulateAddList('categories');
                        }}
                        inputProps={{
                            name: 'foodtype',
                            id: 'foodtype'
                        }}
                    >
                        {_.map(foodTypes, (o, i) => (
                            <MenuItem value={i} key={i}>
                                {o.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <GroceryAddList groceryAddList={this.props.groceryAddList} addGroceryItem={this.props.addGroceryItem} />
            </div>
        );
    }
}

export default withStyles(styles)(Categories);
