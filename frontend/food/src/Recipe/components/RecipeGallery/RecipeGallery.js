import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

import RecipeGalleryItem from './RecipeGalleryItem';
import RecipeGallerySideBarFilter from './RecipeGallerySideBarFilter';

const styles = {
    root: {
        display: 'flex',
        
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    }
};

class RecipeGallery extends Component {

    state = {
        searchTerm: '',
        activeTags: [],
    }

    toggleTag = (id) => {
        this.setState(prevState => {
            if (prevState.activeTags.includes(id))
                return { activeTags: prevState.activeTags.filter(item => item !== id)}
            else
                return { activeTags: [...prevState.activeTags, id] }
        })
    }

    updateSearch = (term) => {
        this.setState({searchTerm: term})
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyPressDetect);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyPressDetect);
    }

    keyPressDetect = (event) => {
        switch (event.keyCode) {
            case 27:
                event.preventDefault();
                this.setState({ searchTerm: '', activeTags: []})
                // this.props.groceryAddListMoveNext();
                break;
            default:
                break;
        }
    }

    render() {
        const { classes, recipes } = this.props;
        

        let filteredRecipes = Object.keys(recipes);
        // Filtering
        if (this.state.searchTerm !== '')
            filteredRecipes = filteredRecipes
                .filter(id => recipes[id].name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

        if(this.state.activeTags.length > 0) {
            this.state.activeTags.forEach( tagId => {
                filteredRecipes = filteredRecipes
                .filter(id => recipes[id].tags.toLowerCase().includes(this.props.tags[tagId].name.toLowerCase()))
            })
        }

        // Mapping result objectset
        let recipeTags = filteredRecipes
            .map(id => <RecipeGalleryItem name={recipes[id].name} id={id} slug={recipes[id].slug} thumbnail={recipes[id].thumbnail} key={id} tags={recipes[id].tags} />)


        return (
            <div className={classes.root}>
            <Grid container spacing={24}>
        <Grid item sm={2} lg={1}>
        <RecipeGallerySideBarFilter term={this.state.searchTerm} onSearch={this.updateSearch} onToggleTag={this.toggleTag} tags={this.props.tags} activeTags={this.state.activeTags} />
        </Grid>
        <Grid item sm={10} lg={11}>
            <div className={classes.content}>
                { _.isEmpty(recipes) ? "Loading" : recipeTags }
            </div>
        </Grid>
        </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(RecipeGallery);
