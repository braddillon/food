import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { Field, FieldArray, ErrorMessage } from "formik";
import { Select } from 'formik-material-ui';
import { TextField } from 'formik-material-ui';
import { Checkbox } from 'formik-material-ui';

import * as Yup from 'yup';

import _ from 'lodash';

import FoodFormSectionOverrideDialog from './FoodFormSectionOverrideDialog';

const FoodEditSchema = Yup.object().shape({
    foodName: Yup.string()
      .min(2, 'Too Short!')
      .max(40, 'Too Long!')
      .required('Required'),
  });

const useStyles = makeStyles(theme => ({
    button: {
        margin: 1,
        marginTop: 10
    },
    buttonGroup: {
        marginTop: 30
    },
    checkField: {
        padding: 0
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1em',
        paddingRight: 25,
        paddingTop: 10,
        flex: 1,
        display: 'inline-block'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '.5em',
        marginBottom: 1,
        maxWidth: 500,
    },
    formGroupOverride: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 1,
        maxWidth: 500,
    },
    input: {
        flex: 2,
    },
    overrideInput: {
        flex: 2,
        display: 'inline',
        height: 40,
    },
    deleteIcon: {
        fontSize: '25px',
        marginBottom: '10px'
    },
    icon: {
        display: 'inline-block'
    },
    sectionOverrideText: {
        display: 'inline-block'
    }
}));

const FoodForm = (props) => {
    const food = props.object;
    const classes = useStyles(props);
    const [dialog_open, setDialogOpen] = React.useState(false);

    let initialValues = Object.keys(food.sections).reduce((obj, key) => {
        let newObj = {}
        newObj['storeId'] = key
        newObj['sectionId'] = food.sections[key].toString()
        return [...obj, newObj]
    }, [])
    initialValues = { overrides: initialValues, foodName: food.food, foodTypeId: food.foodtype, staple: food.staple }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={FoodEditSchema}
                // onSubmit={(values, { setSubmitting }) => {
                //     setTimeout(() => {
                //         alert(JSON.stringify(values, null, 2));
                //         setSubmitting(false);
                //     }, 400);
                // }}
                onSubmit={(values, { setSubmitting }) => {
                    props.onSubmit({ ...values, button: 'submit' })
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                    /* and other goodies */
                }) => {
                    let usedStores = values.overrides.map(item => item.storeId)
                    let emptyStores = Object.keys(props.stores).filter(item => {
                        return !usedStores.includes(item)
                    }).reduce((obj, item) => {
                        obj[item] = props.stores[item]
                        return obj
                    }, {})

                    return (
                        <React.Fragment>
                            <FoodFormSectionOverrideDialog
                                open={dialog_open}
                                emptyStores={emptyStores}
                                foodType={values.foodTypeId}
                                handleSectionDialogClose={() => setDialogOpen(false)}
                                handleSectionOverrideSubmit={(key, section) => {
                                    setFieldValue('overrides', [...values.overrides, { storeId: key, sectionId: section }])
                                    setDialogOpen(false);
                                }}
                            />
                            <form onSubmit={handleSubmit}>
                                <div className={classes.formGroup}>
                                    <InputLabel className={classes.label}>Food</InputLabel>
                                    <div className={classes.input}>
                                        <Field name="foodName" type="text" component={TextField} fullWidth />
                                    </div>
                                </div>

                                <div className={classes.formGroup}>
                                    <InputLabel className={classes.label}>Type</InputLabel>
                                    <div className={classes.input}>
                                        <Field name="foodTypeId" component={Select} fullWidth>
                                            {Object.keys(props.foodTypes).map(key => (
                                                <MenuItem key={key} value={key}>
                                                    {props.foodTypes[key].name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="foodTypeId" />
                                    </div>
                                </div>

                                <div className={classes.formGroup}>
                                    <InputLabel className={classes.label}>Staple</InputLabel>
                                    <div className={classes.input}>
                                        <Field name="staple" type="checkbox" component={Checkbox} />
                                        <ErrorMessage name="staple" />
                                    </div>
                                </div>

                                <h3 className={classes.sectionOverrideText}>Section Override</h3>
                                {!_.isEmpty(emptyStores) &&
                                    <IconButton aria-label='add override' color="primary" className={classes.icon} onClick={() => setDialogOpen(true)}>
                                        <AddIcon />
                                    </IconButton>
                                }

                                <FieldArray name="overrides"
                                    render={(helpers) => (
                                        <div>
                                            {values.overrides && values.overrides.length > 0 ? (
                                                values.overrides.map((override, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className={classes.formGroupOverride}>
                                                            <InputLabel className={classes.label}>{props.stores[override.storeId].name}</InputLabel>
                                                            <div className={classes.overrideInput}>
                                                                <Field name={`overrides.${index}.sectionId`} component={Select}>
                                                                    {Object.keys(props.stores[override.storeId].sections).map(key => (
                                                                        <MenuItem key={key} value={key}>
                                                                            {props.stores[override.storeId].sections[key].sectionName}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Field>
                                                                <IconButton aria-label='delete' color="primary" onClick={() =>
                                                                    setFieldValue('overrides', values.overrides.filter((item, index2) => index2 !== index))
                                                                } >
                                                                    <DeleteIcon className={classes.deleteIcon} />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                ))
                                            ) : null}
                                        </div>
                                    )} />

                                <div className={classes.buttonGroup}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        disabled={isSubmitting}
                                        type="submit"
                                    // onClick={handleSubmit(values =>
                                    //     props.onSubmit({ ...values, button: 'submit' })
                                    // )}
                                    >
                                        Submit
                </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={values =>
                                            props.onSubmit({ ...values, button: 'cancel' })
                                        }
                                    >
                                        Cancel
                </Button>
                                </div>
                            </form>
                        </React.Fragment>
                    )
                }

                }
            </Formik >
        </div >
    )
};

export default FoodForm;