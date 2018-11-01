import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import StapleIcon from '@material-ui/icons/Grade';
import IgnoreIcon from '@material-ui/icons/RemoveShoppingCart';


const styles = theme => ({
    formControl: {
        margin: 1,
        marginLeft: 10,
        display: 'flex',
        direction: 'column'
    },
    formControlLabel: {
        margin: 2
    },
    link: {
        fontSize: 25
    },
    checkBox: {
        padding: 1,
        fontSize: 25
    },
    checkBoxSizeIcon: {
        fontSize: 30,
        padding: 1
    },
    icon: {
        marginLeft: theme.spacing.unit,
    }
});

const FoodBrowserItem = props => {
    const { classes } = props;
    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormControlLabel
                className={classes.formControlLabel}
                control={
                    <Checkbox
                        key={'check' + props.id}
                        checked={props.value}
                        onChange={event =>
                            props.checked(props.id, event.target.checked)
                        }
                        className={classes.checkBox}
                        icon={
                            <CheckBoxOutlineBlankIcon
                                className={classes.checkBoxSizeIcon}
                            />
                        }
                        checkedIcon={
                            <CheckBoxIcon
                                className={classes.checkBoxSizeIcon}
                            />
                        }
                    />
                }
                label={
                    <Link className={classes.link} to={'/food/' + props.id}>
                        {props.name}
                        { props.staple ? <StapleIcon className={classes.icon} color="primary" /> : "" }
                        { props.ignore ? <IgnoreIcon className={classes.icon} color="error" /> : "" }
                    </Link>
                }
            />
        </FormControl>
    );
};

export default withStyles(styles)(FoodBrowserItem);
