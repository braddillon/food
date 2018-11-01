import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { setFilter, groceryPopulateAddList, setFoodTypeCurrent } from '../../actions/actions';

const styles = theme => ({
    button: {
        margin: 0
    },
    input: {
        display: 'none'
    }
});

const groceryBuildFilterButton = props => {
    const { classes } = props;

    return (
        <Button
            variant={props.filter === props.name.toLowerCase() ? 'contained' : 'outlined'}
            color="primary"
            className={classes.button}
            onClick={() => {
                props.groceryPopulateAddList(props.name.toLowerCase());
                props.setFilter(props.name.toLowerCase());
            }}
        >
            {props.name}
        </Button>
    );
};

const mapDispatchToProps = {
    setFilter,
    groceryPopulateAddList,
    setFoodTypeCurrent
};

const GroceryBuildFilterButtonContainer = connect(
    null,
    mapDispatchToProps
)(groceryBuildFilterButton);

export default withStyles(styles)(GroceryBuildFilterButtonContainer);
