import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import { setFilter, addFoodItem, setPrevSearchTerm } from '../../actions/actions';
import _ from 'lodash';
import classes from './FoodForm.module.css';


let FoodForm2 = props => {
    const { change, handleSubmit, submitting, buildOptions, foodTypes } = props;

    return (
        <form
            className="form-horizontal form-top-spacing"
            onSubmit={handleSubmit}
        >
            <div className="col-sm-10">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Food</label>
                    <div className="col-sm-10">
                        <Field
                            className="form-control"
                            name="foodName"
                            component="input"
                            type="text"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-10">
                        <Field
                            name="foodTypeId"
                            component="select"
                            className="form-control"
                            onChange={e => {
                                _.forOwn(props.stores, value => {
                                    change(
                                        'section' + value.name,
                                        buildOptions.foodTypes[e.target.value]
                                            .defaultSection[value.id].section
                                    );
                                });
                            }}
                        >
                            {_.map(foodTypes, foodType => (
                                <option
                                    value={parseInt(foodType.id, 10)}
                                    key={parseInt(foodType.id, 10)}
                                >
                                    {foodType.name}
                                </option>
                            ))}
                        </Field>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="staple" className="col-sm-2 control-label">
                        Staple
                    </label>
                    <div className="col-sm-1">
                        <Field
                            name="staple"
                            id="staple"
                            component="input"
                            type="checkbox"
                            className={classes.checkboxForm}
                        />
                    </div>
                </div>

                {_.map(props.stores, stores => (
                    <div key={parseInt(stores.id, 10)} className="form-group">
                        <label className="col-sm-2 control-label">
                            {stores.name}
                        </label>
                        <div className="col-sm-10">
                            <Field
                                name={'section' + stores.name}
                                component="select"
                                className="form-control"
                            >
                                {_.map(stores.sections, section => (
                                    <option
                                        value={parseInt(section.id, 10)}
                                        key={section.sectionName + section.id}
                                    >
                                        {section.sectionName}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                ))}

                <div className="btn-toolbar pull-right">
                    <button
                        type="submit"
                        className="btn btn-danger"
                        disabled={submitting}
                        onClick={handleSubmit(values =>
                            props.onSubmit({ ...values, button: 'submit' })
                        )}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleSubmit(values =>
                            props.onSubmit({ ...values, button: 'cancel' })
                        )}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

//<button type="submit" disabled={pristine || submitting} onClick={handleSubmit}>
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()

FoodForm2 = reduxForm({
    form: 'foodForm' // a unique identifier for this form
})(FoodForm2);

export default FoodForm2;
