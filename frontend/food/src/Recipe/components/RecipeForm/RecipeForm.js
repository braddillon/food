import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FoodAddItem from '../../../components/Food/AddFood';
import Dropzone from 'react-dropzone';
import Compressor from 'compressorjs';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

import RecipeFormIngredient from './RecipeFormIngredient';
import RecipeFormDirection from './RecipeFormDirection';

import { ADD_FOOD_RECIPE } from '../../../components/Food/AddFood';

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
        prevImage: null
    };

    validateInputs = () => {
        if (this.props.recipeForm.name === '') return false;

        if (_.isEmpty(this.props.parsedIngredients)) return false;

        if (_.isEmpty(this.props.parsedDirections)) return false;

        // check each ingredient has a match
        let missingIng = Object.keys(this.props.parsedIngredients).filter(item => this.props.parsedIngredients[item].selection <= 0);
        if (missingIng.length > 0) return false;

        return true;
    };

    onChange = e => {
        this.props.onSetRecipeFormField('file', e.target.files[0]);
    };

    onImageDrop = (acceptedFiles, rejectedFiles) => {
        // do stuff with files...
        console.log(acceptedFiles);
    };

    render() {
        const { classes } = this.props;
        const submitDisabled = !this.validateInputs();
        console.log('state');
        console.log(this.state);
        return (
            <Fragment>
                {this.props.recipeForm.addMode === true ? (
                    <Fragment>
                        <Typography variant="h4">Recipe Create -- Add Mode</Typography>
                        <FoodAddItem addType={ADD_FOOD_RECIPE} onDisableAddMode={this.props.onDisableRecipeFormAddMode} searchTerm={this.props.recipeForm.addModeTerm} />
                    </Fragment>
                ) : (
                    <form>
                        <div className={classes.root}>
                            <div className={classes.inputGroup}>
                                <InputLabel className={classes.label}>Name</InputLabel>
                                <TextField
                                    name="name"
                                    value={this.props.recipeForm.name}
                                    type="text"
                                    autoComplete="off"
                                    className={classes.textBox}
                                    onChange={e => this.props.onSetRecipeFormField('name', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputGroup}>
                                <InputLabel className={classes.label}>Tags</InputLabel>
                                <TextField
                                    name="tags"
                                    value={this.props.recipeForm.tags}
                                    type="text"
                                    autoComplete="off"
                                    className={classes.textBox}
                                    onChange={e => this.props.onSetRecipeFormField('tags', e.target.value)}
                                />
                            </div>

                            <div className={classes.inputGroup}>
                                <InputLabel className={classes.label}>Source</InputLabel>
                                <TextField
                                    name="source"
                                    value={this.props.recipeForm.source}
                                    type="text"
                                    autoComplete="false"
                                    className={classes.textBox}
                                    onChange={e => this.props.onSetRecipeFormField('source', e.target.value)}
                                />
                            </div>

                            <div className={classes.inputGroup}>
                            {console.log(this.state)}
                                {this.state.prevImage === null ? (
                                    <Dropzone
                                        accept="image/jpeg, image/png"
                                        multiple={false}
                                        onDrop={(accepted, rejected) => {
                                            const thisRecipeForm = this;

                                            new Compressor(accepted[0], {
                                                quality: 0.6,
                                                success(result, extra) {
                                                    console.log(result);
                                                    console.log('this2');
                                                    const fileReader = new FileReader();
                                                    fileReader.addEventListener('load', () => {
                                                        thisRecipeForm.setState({
                                                            prevImage: fileReader.result
                                                        });
                                                    });
                                                    fileReader.readAsDataURL(result);
                                                    thisRecipeForm.props.onSetRecipeFormField('file', result);
                                                }
                                            });
                                            console.log(accepted);
                                        }}
                                    />
                                    
                                ) : (
                                    <img src={this.state.prevImage} height="200" width="200" onClick={()=> {
                                        this.setState({prevImage: null})
                                    }}
                                    />
                                )}
                            </div>
                            <RecipeFormIngredient
                                ingredientText={this.props.recipeForm.ingredientText}
                                parsedIngredients={this.props.parsedIngredients}
                                onSet={text => this.props.onSetRecipeFormField('ingredientText', text)}
                                onParse={() => this.props.parseIngredients(this.props.recipeForm.ingredientText)}
                                onReset={this.props.resetIngredients}
                                sections={this.props.sections}
                            />

                            <RecipeFormDirection
                                directionText={this.props.recipeForm.directionsText}
                                onSet={text => this.props.onSetRecipeFormField('directionsText', text)}
                                parsedDirections={this.props.parsedDirections}
                                onParse={() => this.props.parseDirections(this.props.recipeForm.directionsText, this.props.sections)}
                                onChangeDirectionSection={this.props.onChangeDirectionSection}
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
                                            this.props.recipeForm.name,
                                            this.props.recipeForm.tags,
                                            this.props.recipeForm.source,
                                            this.props.parsedIngredients,
                                            this.props.parsedDirections,
                                            this.props.recipeForm.file,
                                            this.resetForm
                                        )
                                    }
                                >
                                    Submit
                                </Button>
                                <Button variant="contained" color="secondary" autoComplete="off" className={classes.button} onClick={this.props.onResetRecipeForm}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Fragment>
        );
    }
}

export default withStyles(styles)(RecipeForm);
