import React, { Component } from 'react';
// import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

import RecipeFormIngredient from './RecipeFormIngredient';

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

    render() {
        const { classes } = this.props;
        console.log("recipeform");
        console.log(this.props);
        console.log(this.props.changeIngredientMatch);

        return (
            <form>
                <div className={classes.root}>
                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>Name</InputLabel>
                        <TextField
                            name="name"
                            value={this.state.name}
                            type="text"
                            autoComplete="false"
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
                            autoComplete="false"
                            onChange={e =>
                                this.setState({ tags: e.target.value })
                            }
                        />
                    </div>
                    {/* <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>
                            Ingredient Text
                        </InputLabel>
                        {ingred}
                    </div> */}
                    <RecipeFormIngredient
                        ingredientText={this.state.ingredientText}
                        parsedIngredients={this.props.parsedIngredients}
                        onSet={text => this.setState({ ingredientText: text })}
                        onParse={() =>
                            this.props.parseIngredients(
                                this.state.ingredientText
                            )}
                        onReset={this.props.resetIngredients}
                        onChangeMatch={this.props.changeIngredientMatch} 
                    />

                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>
                            Directions
                        </InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                        >
                            Parse
                        </Button>
                        <br />
                        <TextField
                            name="directionText"
                            value={this.state.directionText}
                            type="text"
                            autoComplete="false"
                            multiline
                            fullWidth
                            onChange={e =>
                                this.setState({ directionText: e.target.value })
                            }
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <InputLabel className={classes.label}>
                            Source Link
                        </InputLabel>
                        <TextField
                            name="source"
                            value={this.state.source}
                            type="text"
                            autoComplete="false"
                            fullWidth
                            onChange={e =>
                                this.setState({ source: e.target.value })
                            }
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
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
