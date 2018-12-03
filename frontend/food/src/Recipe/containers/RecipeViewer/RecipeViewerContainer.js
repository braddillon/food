import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeViewer from '../../components/RecipeViewer/RecipeViewer';

import { getRecipe, recipeReset } from '../../actions/actions';

class RecipeViewerContainer extends Component {
    componentDidMount() {
        this.props.recipeReset();
        this.props.getRecipe(this.props.match.params._id);
    }

    render() {
        return (
            <div>
                <RecipeViewer recipe={this.props.recipe} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipe: state.recipe
});

const mapDispatchToProps = {
    getRecipe,
    recipeReset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeViewerContainer);
