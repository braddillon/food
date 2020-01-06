import React, { Component } from "react";
import { connect } from "react-redux";

import RecipeForm from "../../components/RecipeForm/RecipeForm";

import {
  parseIngredients,
  resetIngredients,
  parseDirections,
  resetDirections,
  changeIngredientMatch,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
  getRecipeSections,
  changeDirectionSection,
  createNewRecipe,
  uploadRecipeImage,
} from "../../actions/actions";

import {
setRecipeFormField,
resetRecipeFormField,
resetRecipeForm,
disableRecipeFormAddMode
} from '../../actions/recipeFormActions.js';

class RecipeFormContainer extends Component {

  componentDidMount() {
    this.props.getRecipeSections()
  }

  render() {
    return (
      <div>
        <RecipeForm
          parseIngredients={this.props.parseIngredients}
          resetIngredients={this.props.resetIngredients}
          parseDirections={this.props.parseDirections}
          resetDirections={this.props.resetDirections}
          sections={this.props.recipeSections}
          parsedIngredients={this.props.parsedIngredients}         
          parsedDirections={this.props.parsedDirections}
          recipeForm={this.props.recipeForm}
          onChangeDirectionSection={this.props.changeDirectionSection} 
          onCreateNewRecipe={this.props.createNewRecipe}
          onUpload={this.props.uploadRecipeImage}
          onSetRecipeFormField={this.props.setRecipeFormField}
          onResetRecipeFormField={this.props.resetRecipeFormField}
          onResetRecipeForm={this.props.resetRecipeForm}
          onDisableRecipeFormAddMode={this.props.disableRecipeFormAddMode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parsedIngredients: state.parsedIngredients,
  parsedDirections: state.parsedDirections,
  ingredientPicker: state.ingredientPicker,
  recipeSections: state.recipeSections,
  recipeForm: state.recipeForm,
});

const mapDispatchToProps = {
  parseIngredients,
  resetIngredients,
  parseDirections,
  resetDirections,
  changeIngredientMatch,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
  getRecipeSections,
  changeDirectionSection,
  createNewRecipe,
  uploadRecipeImage,
  setRecipeFormField,
  resetRecipeFormField,
  resetRecipeForm,
  disableRecipeFormAddMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeFormContainer);
