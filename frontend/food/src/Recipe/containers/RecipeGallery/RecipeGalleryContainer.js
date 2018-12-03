import React, { Component } from "react";
import { connect } from "react-redux";

import RecipeGallery from "../../components/RecipeGallery/RecipeGallery";

import {
  getRecipeList,
} from "../../actions/actions";

class RecipeGalleryContainer extends Component {

  componentDidMount() {
    this.props.getRecipeList()
  }

  render() {
    return (
      <div>
        <RecipeGallery
          recipes={this.props.recipeList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeList: state.recipeList,
});

const mapDispatchToProps = {
  getRecipeList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeGalleryContainer);
