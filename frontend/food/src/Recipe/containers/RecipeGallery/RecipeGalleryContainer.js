import React, { Component } from "react";
import { connect } from "react-redux";

import RecipeGallery from "../../components/RecipeGallery/RecipeGallery";

import {
  getRecipeTags,
  getRecipeList,
} from "../../actions/actions";

class RecipeGalleryContainer extends Component {

  componentDidMount() {
    this.props.getRecipeList()
    this.props.getRecipeTags()
  }

  render() {
    return (
      <div>
        <RecipeGallery
          recipes={this.props.recipeList}
          tags={this.props.tags}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeList: state.recipeList,
  tags: state.recipeOptions.tags
});

const mapDispatchToProps = {
  getRecipeList,
  getRecipeTags,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeGalleryContainer);
