import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
    root: {
        marginBottom: 10,
        display: 'flex',
    },
    matchButton: {
      margin: theme.spacing.unit,
      fontSize: 10,
      padding: 1,
    },
    label: {
        fontSize: '1em',
        paddingRight: 25,
        paddingTop: 20,
        flex: 1,
    },
    comboxBox: {
        flex: 2,
    }
  });

const IngredientMatcherItem = (props) => {
    const { classes } = props;
    // console.log(props);

    let selector = (<Button variant="contained" color="secondary" size="small" className={classes.matchButton} onClick={props.togglePicker}>
    Match
  </Button>)

    if (!_.isEmpty(props.potentialMatches)) {
        selector = (
        <Select
        value={String(props.selection)}
        onChange={(e) => props.onChangeMatch(props.tmpId, e.target.value)}

        //onChangeMatch={this.props.changeIngredientMatch} 
        className={classes.comboBox}
      >
        {Object.keys(props.potentialMatches).map( (item) => <MenuItem value={String(item)}>{props.potentialMatches[item]}</MenuItem>)}

        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
      )
    }

    return (
        <div className={classes.root}>
        <InputLabel className={classes.label}>{props.name}</InputLabel>
            
            {selector}
        </div>
    );
};

export default withStyles(styles)(IngredientMatcherItem);