import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeForm from '../../components/RecipeForm/RecipeForm';

import {
    parseIngredients, resetIngredients, changeIngredientMatch
} from '../../actions/actions';

class RecipeFormContainer extends Component {
    render() {
        return (
            <div>
                <RecipeForm changeIngredientMatch={this.props.changeIngredientMatch} parsedIngredients={this.props.parsedIngredients} parseIngredients={this.props.parseIngredients} resetIngredients={this.props.resetIngredients} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    parsedIngredients: state.parsedIngredients,
});

const mapDispatchToProps = {
    parseIngredients,
    resetIngredients,
    changeIngredientMatch,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeFormContainer);
