import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

import renderTextField from '../../formHelper/renderTextField';
import { signInUser } from "../actions/authentication";

const styles = theme => ({
  title: {
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'white',
  },
  paper: {
    padding: 10
  }

});

class SignInFormContainer extends Component {
  submitForm = ({ username, password }) => {
    this.props.signInUser({ username, password });
  };

  renderAlert = () => {
    const { errorMessage, classes } = this.props;
    if (this.props.errorMessage) {
      return (
        <Paper style={{ padding: 10, marginTop: 10, backgroundColor: "red" }}>
          <Typography variant="h6" className={classes.errorMessage}>
            Oooops! {errorMessage}
          </Typography>
        </Paper>
      );
    }
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <Grid container spacing={2} direction="row" justify="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={10} md={3} lg={2}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary" className={classes.title}>
              Sign-in
            </Typography>
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Grid container spacing={1} direction="column" justify="center">
                <Grid item>
                  <Field name="username" label="Username" type="text" component={renderTextField} />
                </Grid>
                <Grid item>
                  <Field name="password" label="Password" component={renderTextField} type="password" fullWidth />
                </Grid>
                {this.renderAlert()}
              </Grid>
              <Grid container alignItems="flex-end" direction="column">
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                  Submit
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = "Required";
  } else if (formProps.username.length < 4) {
    errors.username = "Must be at least 4 characters long";
  } else if (formProps.username.length > 15) {
    errors.username = "Cannot be longer than 15 characters";
  }

  return errors;
}

const SignInForm = reduxForm({
  form: 'SigninForm',
  validate: validate
})(SignInFormContainer)

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default withStyles(styles)(connect(mapStateToProps, { signInUser })(SignInForm));