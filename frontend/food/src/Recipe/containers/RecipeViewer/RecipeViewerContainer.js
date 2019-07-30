import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeViewer from '../../components/RecipeViewer/RecipeViewer';

import { getRecipe, recipeReset  } from '../../actions/actions';
import { editRecipe } from '../../actions/recipeFormActions';

class RecipeViewerContainer extends Component {
    componentDidMount() {
        this.props.recipeReset();
        this.props.getRecipe(this.props.match.params._slug);
    }

    render() {
        return (
            <div>
                <RecipeViewer recipe={this.props.recipe} onEdit={this.props.editRecipe} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipe: state.recipe
});

const mapDispatchToProps = {
    getRecipe,
    recipeReset,
    editRecipe
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeViewerContainer);
