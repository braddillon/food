import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import IngredientMatcher from "./IngredientMatcher";
//import IngredientMatcherContainer from "../../containers/RecipeForm/IngredientMatcherContainer";

const styles = theme => ({
    button: {
        margin: 1,
        // marginTop: 10
        marginLeft: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1em',
        paddingRight: 25,
        paddingTop: 20,
        flex: 1
    },
    label: {
        fontSize: '1em',
        paddingRight: 25,
        paddingTop: 20,
        flex: 1
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '.5em',
        marginBottom: 10,
        maxWidth: 500
    },
    input: {
        flex: 2
    },
    inputGroup: {
        marginBottom: 30
    },
    paper: {
        border: 1,
        borderStyle: 'dotted',
        padding: 15
    },
    catComboBox: {
        minWidth: 150
    },
    root: {
        width: '100%',
        maxWidth: 1000,
        marginTop: theme.spacing(1),
        overflowX: 'auto'
    },
    header: {
        fontSize: '.8em',
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    }
});

class RecipeFormDirection extends Component {


    render() {
        const { classes, parsedDirections, sections } = this.props;

        let directions = null;
        if (!_.isEmpty(parsedDirections)) {
            directions = (
                <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.header}>
                                Direction
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
                            <TableCell className={classes.header}>
                                Section
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(parsedDirections).map(id => {
                            return (
                                <TableRow key={id}>
                                    <TableCell className={classes.label}>
                                    {id}. {parsedDirections[id].direction}
                                    </TableCell>
                                    <TableCell className={classes.label}>
                                        
                                        <Select
                    value={String(parsedDirections[id].section)}
                    onChange={e =>
                        this.props.onChangeDirectionSection(id, e.target.value)
                    }
                    className={classes.catComboBox}
                >
                    {Object.keys(sections).map(item => (
                        <MenuItem key={item} value={String(item)}>
                            {sections[item].name}
                        </MenuItem>
                    ))}
                </Select>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </Paper>
            );
        }

        return (
            <div className={classes.inputGroup}>
                
                {_.isEmpty(parsedDirections) ? (
                    <Fragment>
                        <InputLabel className={classes.title}>Directions</InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            onClick={this.props.onParse}
                        >
                            Parse
                        </Button>
                        <TextField
                            name="directionText"
                            value={this.props.directionText}
                            type="text"
                            autoComplete="false"
                            multiline
                            fullWidth
                            onChange={e => this.props.onSet(e.target.value)}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        {/* <Button
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
                        <br /> */}
                        {directions}
                    </Fragment>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(RecipeFormDirection);
