import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import IngredientMatcher from './IngredientMatcher';

const styles = theme => ({
    button: {
        margin: 1,
        marginTop: 10
    },
    label: {
        fontWeight: 'bold',
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
    }
});

class RecipeFormIngredient extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.inputGroup}>
                <InputLabel className={classes.label}>
                    Ingredient Text
                </InputLabel>
                {_.isEmpty(this.props.parsedIngredients) ? (
                    <Fragment>
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
                            name="ingredientText"
                            value={this.props.ingredientText}
                            type="text"
                            autoComplete="false"
                            multiline
                            fullWidth
                            onChange={e => this.props.onSet(e.target.value)}
                        />
                    </Fragment>
                ) : (
                    <Fragment>
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
                        <br />
                        <IngredientMatcher parsedIngredients={this.props.parsedIngredients} onChangeMatch={this.props.onChangeMatch} />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(RecipeFormIngredient);
