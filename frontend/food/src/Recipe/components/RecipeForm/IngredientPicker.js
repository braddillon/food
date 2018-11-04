import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600]
    },
    select: {
        marginLeft: '20px',
        marginRight: '20px'
    },
    textField: {
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '1px',
        marginTop: '1px',
    }
};

class IngredientPicker extends React.Component {
    state = {
      open: true,
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    // handleClose = () => {
    //   this.setState({ open: false });
    // };
  
    render() {
        console.log("ingredientPicker");
      return (
        <div>
          <Dialog
            open={this.props.open}
            // onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Pick Ingredient</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
              </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Search"
                type="text"
                autoComplete="false"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.closePicker} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={this.handleClose} color="primary">
                Subscribe
              </Button> */}
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

export default withStyles(styles)(IngredientPicker);
