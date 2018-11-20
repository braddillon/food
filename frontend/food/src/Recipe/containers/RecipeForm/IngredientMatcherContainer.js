import React, { Component } from "react";
import { connect } from "react-redux";

import IngredientMatcher from "../../components/RecipeForm/IngredientMatcher";

import {
  changeIngredientMatch,
  changeIngredientSection,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
  resetIngredients,
} from "../../actions/actions"

class IngredientMatcherContainer extends Component {

  render() {
    return (
      <div>
        <IngredientMatcher
          parsedIngredients={this.props.parsedIngredients}
          possibleIngredients={this.props.ingredientPicker}
          sections={this.props.recipeOptions.sections}

          onPickPossibleIngredients={this.props.pickPossibleIngredients}
          onResetPossibleIngredients={this.props.resetPossibleIngredients}
          onAdhocIngredientMatch={this.props.setAdhocIngredientMatch}
          onChangeMatch={this.props.changeIngredientMatch}   
          onChangeSection={this.props.changeIngredientSection}  
          onReset={this.props.resetIngredients}     
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parsedIngredients: state.parsedIngredients,
  ingredientPicker: state.ingredientPicker,
  recipeOptions: state.recipeOptions,
});

const mapDispatchToProps = {
  changeIngredientMatch,
  changeIngredientSection,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
  resetIngredients,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientMatcherContainer);
