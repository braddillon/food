import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
      //open: true,
      searchTerm: '',
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    // handleClose = () => {
    //   this.setState({ open: false });
    // };
  
    render() {
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
                value={this.state.searchTerm}
                fullWidth
                onChange={(e) => this.setState({searchTerm: e.target.value})}
              />
              <List>
              {this.props.possibleIngredients.map( (item) => (
                <ListItem button key={'posIng' + item.id} onClick={() => {
                  this.setState({searchTerm: ''})
                  this.props.closePicker()
                  this.props.onAdhocIngredientMatch(this.props.callerId, item.id, item.name)}
                }><ListItemText primary={item.name} /></ListItem>  
              ))}
              </List>
              

            </DialogContent>
            <DialogActions>
<Button onClick={() => {this.props.onPickPossibleIngredients(this.state.searchTerm)}} color="primary">
                Search
              </Button>
              <Button onClick={() => {
                this.setState({searchTerm: ''})
                this.props.closePicker()

              }}
              color="primary">
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
