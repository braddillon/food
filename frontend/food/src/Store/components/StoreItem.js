import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { setStoreListChecked } from '../../Grocery/actions/actions';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    formControl: {
        margin: 1,
        marginLeft: 10
    },
    formControlLabel: {
        margin: 3
    },
    link: {
        fontSize: 25
    },
    checkBox: {
        padding: 0,
        fontSize: 25
    },
    checkBoxSizeIcon: {
        fontSize: 40
    }
});

class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.grocery.checked };

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }

    onChangeCheckbox(e) {
        this.setState({ checked: e.target.checked });
        this.props.setStoreListChecked({
            ...this.props.grocery,
            checked: e.target.checked
        });
    }

    render() {
        const { classes } = this.props;

        let g = this.props.grocery;
        let link = (
            <Link className={classes.link} to={'/food/' + g.id}>
                {g.name}
            </Link>
        );
        if (this.props.locked) {
            link = g.name;
        }

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                        <Checkbox
                            key={'check' + g.id}
                            checked={this.state.checked}
                            onChange={this.onChangeCheckbox}
                            disabled={this.props.locked}
                            className={classes.checkBox}
                            icon={<CheckBoxOutlineBlankIcon className={classes.checkBoxSizeIcon} />}
                            checkedIcon={<CheckBoxIcon className={classes.checkBoxSizeIcon} />}
                        />
                    }
                    label={link}
                />
            </FormControl>
        );
    }
}

const mapDispatchToProps = {
    setStoreListChecked
};

const StoreItemContainer = connect(
    null,
    mapDispatchToProps
)(StoreItem);
export default withStyles(styles)(StoreItemContainer);
