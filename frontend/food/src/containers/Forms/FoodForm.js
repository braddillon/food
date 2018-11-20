import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import renderTextField from '../../components/formHelper/renderTextField';
import renderCombobox from "../../components/formHelper/renderCombobox";
import { signInUser } from "../../actions/authentication";

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

class FoodFormContainer extends Component {
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
      <Grid container spacing={16} direction="row" justify="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={10} md={3} lg={2}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary" className={classes.title}>
              Add Food Item
            </Typography>
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Grid container spacing={8} direction="column" justify="center">
                <Grid item>
                  <Field name="food" label="Food" type="text" component={renderTextField} />
                </Grid>
                <Grid item>
                <Field name="section" label="Section" className={classes.combobox} component={renderCombobox} fullWidth >
                    {Object.keys(this.props.foodTypes).map(key => (
                      <MenuItem key={key} value={key}>{this.props.foodTypes[key].name}</MenuItem>  
                    ))}
                  </Field>
                </Grid>
                <Grid item>
                
                {/* {this.renderAlert()} */}
              </Grid>
              <Grid container alignItems="flex-end" direction="column">
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                  Add
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

  if (!formProps.food) {
    errors.food = "Required";
  }
//   } else if (formProps.username.length < 4) {
//     errors.username = "Must be at least 4 characters long";
//   } else if (formProps.username.length > 15) {
//     errors.username = "Cannot be longer than 15 characters";
//   }

  return errors;
}

const FoodForm = reduxForm({
  form: 'AddFoodForm',
  validate: validate
})(FoodFormContainer)

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default withStyles(styles)(connect(mapStateToProps, { signInUser })(FoodForm));