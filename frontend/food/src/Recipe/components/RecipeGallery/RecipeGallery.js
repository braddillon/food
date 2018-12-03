import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import RecipeGalleryItem from './RecipeGalleryItem';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }
};

class RecipeGallery extends Component {
    render() {
        const { classes, recipes } = this.props;
        return (
            <div className={classes.root}>
                { _.isEmpty(recipes) ? "Loading" : Object.keys(recipes).map(id => {
                    return <RecipeGalleryItem name={recipes[id].name} id={id} thumbnail={recipes[id].thumbnail} key={id} tags={recipes[id].tags} />;
                })}
            </div>
        );
    }
}

export default withStyles(styles)(RecipeGallery);
