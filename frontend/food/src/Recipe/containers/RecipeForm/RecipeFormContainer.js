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
} from "../../actions/actions";

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
          sections={this.props.recipeOptions.sections}
          parsedIngredients={this.props.parsedIngredients}         
          parsedDirections={this.props.parsedDirections}   
          onChangeDirectionSection={this.props.changeDirectionSection} 
          onCreateNewRecipe={this.props.createNewRecipe}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parsedIngredients: state.parsedIngredients,
  parsedDirections: state.parsedDirections,
  ingredientPicker: state.ingredientPicker,
  recipeOptions: state.recipeOptions,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeFormContainer);
