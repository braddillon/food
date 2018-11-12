import React, { Component } from "react";
import { connect } from "react-redux";

import RecipeForm from "../../components/RecipeForm/RecipeForm";

import {
  parseIngredients,
  resetIngredients,
  changeIngredientMatch,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
} from "../../actions/actions";

class RecipeFormContainer extends Component {
  render() {
    return (
      <div>
        <RecipeForm
          parsedIngredients={this.props.parsedIngredients}
          possibleIngredients={this.props.ingredientPicker}
          changeIngredientMatch={this.props.changeIngredientMatch}
          parseIngredients={this.props.parseIngredients}
          resetIngredients={this.props.resetIngredients}
          onPickPossibleIngredients={this.props.pickPossibleIngredients}
          onResetPossibleIngredients={this.props.resetPossibleIngredients}
          onAdhocIngredientMatch={this.props.setAdhocIngredientMatch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parsedIngredients: state.parsedIngredients,
  ingredientPicker: state.ingredientPicker
});

const mapDispatchToProps = {
  parseIngredients,
  resetIngredients,
  changeIngredientMatch,
  pickPossibleIngredients,
  resetPossibleIngredients,
  setAdhocIngredientMatch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeFormContainer);
