import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import { setFilter, addFoodItem, setPrevSearchTerm } from '../../actions/actions';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import renderTextField from '../../components/formHelper/renderTextField';
import renderCombobox from '../../components/formHelper/renderCombobox';
import renderCheckbox from '../../components/formHelper/renderCheckbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    button: {
        margin: 1,
        marginTop: 10
    },
    checkField: {
        padding: 0
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1em',
        paddingRight: 25,
        paddingTop: 20,
        flex: 1,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '.5em',
        marginBottom: 10,
        maxWidth: 500,
    },
    input: {
        flex: 2,
    }
});

let FoodForm2 = props => {
    const {
        change,
        handleSubmit,
        submitting,
        buildOptions,
        classes
    } = props;

    return (
        <form
            onSubmit={handleSubmit}
        >
                <div className={classes.formGroup}>
                    <InputLabel className={classes.label}>Food</InputLabel>
                    <div className={classes.input}>
                    <Field
                        name="foodName"
                        label=""
                        type="text"
                        component={renderTextField}
                    />
                    </div>
                </div>
                <div className={classes.formGroup}>
                    <InputLabel className={classes.label}>Type</InputLabel>
                    <div className={classes.input}>
                    <Field
                        name="foodTypeId"
                        label=""
                        component={renderCombobox}
                        fullWidth 
                        onChange={(e,y) => {
                            return Object.keys(props.stores).forEach(id => {
                                change(
                                    'section' + props.stores[id].name, 
                                    String(
                                        buildOptions.foodTypes[y]
                                            .defaultSection[id].section
                                    )
                                );
                            })
                        }}
                    >
                        {Object.keys(props.foodTypes).map(key => (
                            <MenuItem key={key} value={key}>
                                {props.foodTypes[key].name}
                            </MenuItem>
                        ))}
                    </Field>
                    </div>
                </div>

                <div className={classes.formGroup}>
                    <InputLabel className={classes.label}>Staple</InputLabel>
                    <div className={classes.input}>
                    <Field
                        name="staple"
                        type="checkbox"
                        component={renderCheckbox}
                        className={classes.checkField}
                    />
                    </div>
                </div>
                {_.map(props.stores, stores => (
                    <div key={'div' + stores.name} className={classes.formGroup}>
                        <InputLabel className={classes.label}>
                            {stores.name}
                        </InputLabel>
                        <div className={classes.input}>
                        <Field
                            name={'section' + stores.name}
                            component={renderCombobox}
                            fullWidth 
                        >
                            {Object.keys(stores.sections).map(id => (
                                <MenuItem
                                    key={stores.sections[id].sectionName + id}
                                    value={id}
                                >
                                    {stores.sections[id].sectionName}
                                </MenuItem>
                            ))}
                        </Field>
                        </div>
                    </div>
                ))}
                <div className={classes.formGroup}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={submitting}
                    onClick={handleSubmit(values =>
                        props.onSubmit({ ...values, button: 'submit' })
                    )}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleSubmit(values =>
                        props.onSubmit({ ...values, button: 'cancel' })
                    )}
                >
                    Cancel
                </Button>
                </div>
        </form>
    );
};

//<button type="submit" disabled={pristine || submitting} onClick={handleSubmit}>
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()

FoodForm2 = reduxForm({
    form: 'foodForm' // a unique identifier for this form
})(FoodForm2);

export default withStyles(styles)(FoodForm2);
