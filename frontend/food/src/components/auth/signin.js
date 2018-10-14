import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInUser } from '../../actions/authentication';
import { connect } from 'react-redux';
import UI from '../ui';
import Layout from '../ui/layout';

var buttonStyle = {
    color: 'white',
    margin: '20px 0px 0px 0px',
    float: 'right',
};

class Signin extends Component {
    handleFormSubmit({ username, password }) {
        this.props.signInUser({ username, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Ooops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    renderInput(field) {
        // Define stateless component to render input and errors
        return (
            <div>
                <input
                    {...field.input}
                    className="form-control"
                    type={field.type}
                />
                {field.meta.touched && field.meta.error && (
                    <span className="error">{field.meta.error}</span>
                )}
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        const { Panel } = UI;
        const { Page, Row, Col } = Layout;
        return (
            <Page>
                <Row>
                    <Col size={6}>
                        <Panel title="Login">
                            <form
                                onSubmit={handleSubmit(
                                    this.handleFormSubmit.bind(this)
                                )}
                            >
                                <div className="middle-box loginscreen">
                                    <div>
                                        <fieldset className="form-group">
                                            <label htmlFor="username">
                                                Username
                                            </label>
                                            <Field
                                                name="username"
                                                component={this.renderInput}
                                                type="text"
                                            />
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <Field
                                                name="password"
                                                component={this.renderInput}
                                                type="password"
                                            />
                                            <button
                                                style={buttonStyle}
                                                action="submit"
                                                className="btn btn-primary"
                                            >
                                                Sign in
                                            </button>
                                        </fieldset>
                                    </div>

                                    {this.renderAlert()}
                                </div>
                            </form>
                        </Panel>
                    </Col>
                </Row>
            </Page>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.username) {
        errors.username = 'Required';
    } else if (formProps.username.length < 4) {
        errors.username = 'Must be at least 4 characters long';
    } else if (formProps.username.length > 15) {
        errors.username = 'Cannot be longer than 15 characters';
    }

    return errors;
}

// signInForm =
function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signInUser })(
    reduxForm({
        form: 'SigninForm',
        validate: validate
    })(Signin)
);
