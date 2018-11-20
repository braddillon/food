import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

import RecipeFormIngredient from './RecipeFormIngredient';
import RecipeFormDirection from './RecipeFormDirection';

const styles = theme => ({
    root: {
        maxWidth: 800
    },
    button: {
        margin: 1,
        marginTop: 10
    },
    checkField: {
        padding: 0
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
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 4
    },
    textBox: {
        minWidth: 500
    }
});

class RecipeForm extends Component {
    state = {
        name: '',
        tags: '',
        ingredientText: '',
        directionText: '',
        source: ''
    };

    resetForm = () => {
        console.log('resetting form');
        this.setState({
            name: '',
            tags: '',
            ingredientText: '',
            directionText: '',
            source: ''
        });
    };

    validateInputs = () => {
        if (this.state.name === '') return false;

        if (_.isEmpty(this.props.parsedIngredients)) return false;

        if (_.isEmpty(this.props.parsedDirections)) return false;

        // check each ingredient has a match
        let missingIng = Object.keys(this.props.parsedIngredients).filter(
            item => this.props.parsedIngredients[item].selection <= 0
        );
        if (missingIng.length > 0) return false;

        return true;
    };

    render() {
        const { classes } = this.props;
        const submitDisabled = !this.validateInputs();

        return (
            <form>
                <div className={classes.root}>
                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>Name</InputLabel>
                        <TextField
                            name="name"
                            value={this.state.name}
                            type="text"
                            autoComplete="off"
                            className={classes.textBox}
                            onChange={e =>
                                this.setState({ name: e.target.value })
                            }
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>Tags</InputLabel>
                        <TextField
                            name="tags"
                            value={this.state.tags}
                            type="text"
                            autoComplete="off"
                            className={classes.textBox}
                            onChange={e =>
                                this.setState({ tags: e.target.value })
                            }
                        />
                    </div>

                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>
                            Source
                        </InputLabel>
                        <TextField
                            name="source"
                            value={this.state.source}
                            type="text"
                            autoComplete="false"
                            className={classes.textBox}
                            onChange={e =>
                                this.setState({ source: e.target.value })
                            }
                        />
                    </div>

                    <RecipeFormIngredient
                        ingredientText={this.state.ingredientText}
                        parsedIngredients={this.props.parsedIngredients}
                        onSet={text => this.setState({ ingredientText: text })}
                        onParse={() =>
                            this.props.parseIngredients(
                                this.state.ingredientText
                            )
                        }
                        onReset={this.props.resetIngredients}
                        sections={this.props.sections}
                    />

                    <RecipeFormDirection
                        directionText={this.state.directionText}
                        onSet={text => this.setState({ directionText: text })}
                        parsedDirections={this.props.parsedDirections}
                        onParse={() =>
                            this.props.parseDirections(
                                this.state.directionText,
                                this.props.sections
                            )
                        }
                        onChangeDirectionSection={
                            this.props.onChangeDirectionSection
                        }
                        onReset={this.props.resetDirections}
                        sections={this.props.sections}
                    />

                    
                    <div className={classes.formGroup}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            disabled={submitDisabled}
                            onClick={() =>
                                this.props.onCreateNewRecipe(
                                    this.state.name,
                                    this.state.tags,
                                    this.state.source,
                                    this.props.parsedIngredients,
                                    this.props.parsedDirections,
                                    this.resetForm
                                )
                            }
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            autoComplete="off"
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default withStyles(styles)(RecipeForm);
