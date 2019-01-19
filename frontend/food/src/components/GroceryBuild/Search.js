import React, { Component } from 'react';

import GroceryAddList from './AddList.js';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textField: {
      marginLeft: 0,
      marginRight: 0,
      height: 35,
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    // button: {
    //     // justifyContent: 'flex-end',
    //     // flex: 2
    //     //float: 'right',
    // }
  });

class GroceryBuildSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '', prevSearch: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.clearPrevSearch = this.clearPrevSearch.bind(this);
    }

    clearPrevSearch() {
        this.setState({ prevSearch: '' });
        this.props.setPrevSearchTerm('');
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.matchGroceryItem(this.state.value);
        this.setState({ prevSearch: this.state.value });
        this.props.setPrevSearchTerm(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <TextField
          id="txtSearchItem"
          className={classes.textField}
          autoComplete="off"
          label=""
          placeholder=""
          fullWidth
          autoFocus
          margin="normal"
          variant="outlined"
          value={this.state.value}
          onChange={e => {
              this.setState({ value: e.target.value });
          }}
        />
        </form>
                <GroceryAddList clearPrevSearch={this.clearPrevSearch} groceryAddList={this.props.groceryAddList} addGroceryItem={this.props.addGroceryItem}/>
                {this.state.prevSearch !== '' ? (
                    <div className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={() => {
                        this.props.setFilter('addFood');
                    }}>
                    Add Food
                  </Button>
                  </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(GroceryBuildSearch);
