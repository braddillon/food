import React, { Component } from 'react';
import IngredientMatcherItem from './IngredientMatcherItem';
import IngredientPicker from './IngredientPicker';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 1000,
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
    },
    header: {
        fontSize: '.8em',
        fontWeight: "bold",
        padding: 10,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    button: {
        marginLeft: 20,
    },
  });

class IngredientMatcher extends Component {
    state = {
        openPicker: false,
        callerId: 0
    };


    openPicker = tmpId => {
        this.setState({ openPicker: true, callerId: tmpId });
    };

    closePicker = () => {
        this.props.onResetPossibleIngredients();
        this.setState({ openPicker: false, callerId: 0 });
    };

    render() {
        const { classes } = this.props
        return (
            <div>
                <IngredientPicker
                    open={this.state.openPicker}
                    closePicker={this.closePicker}
                    possibleIngredients={this.props.possibleIngredients}
                    onPickPossibleIngredients={
                        this.props.onPickPossibleIngredients
                    }
                    onResetPossibleIngredients={
                        this.props.onResetPossibleIngredients
                    }
                    onAdhocIngredientMatch={this.props.onAdhocIngredientMatch}
                    callerId={this.state.callerId}
                />
                <Paper className={classes.root}>
                <Table padding='none'>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.header}>Item
                            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={() => {
                this.props.onReset();
              }}
            >
              Reset
            </Button>
            </TableCell>
                            <TableCell className={classes.header}>Ingredient</TableCell>
                            <TableCell className={classes.header}>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.keys(this.props.parsedIngredients).map(item => {
                        return (
                            <IngredientMatcherItem
                                key={'imi' + item}
                                {...this.props.parsedIngredients[item]}
                                onChangeSection={this.props.onChangeSection}
                                onChangeMatch={this.props.onChangeMatch}
                                openPicker={this.openPicker}
                                sections={this.props.sections}
                            />
                        );
                    })}
                    </TableBody>
                </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(IngredientMatcher);
