import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    img: {
        padding: 0,
        display: 'block',
        margin: 'auto',
        maxHeight: '100%',
        maxWidth: '100%'
    },
    ingredients: {
        padding: 10
    },
    directions: {
        padding: 10
    },

};

class RecipeViewer extends Component {
    render() {
        const { classes } = this.props;
        const { directions, ingredients, name, source, image } = this.props.recipe;
        console.log(this.props);
        if (_.isEmpty(this.props.recipe)) {
            return <div>Loading</div>
        }

        return (
            <div>
            <Typography variant="h2">{name}</Typography>
            { source ? <a href={source}>Source</a> : null}

            <div className={classes.ingredients}>
            <Typography variant="h4">Ingredients</Typography>
            <Divider />
            { ingredients.map( item => 
                <div key={"ing" + item.id}>{item.amount} {item.units === 'per' ? '' : item.units} {item.name}{item.notes !== '' ? ', ' + item.notes : ''}</div>
                )}
            </div>
            
            <div className={classes.directions}>
            <Typography variant="h4">Directions</Typography>
            <Divider />
            { directions.sort( (a,b) => { return a.sort - b.sort}).map( (item,index) => (
                <div key={"dir" + item.id}><Typography variant="body1">{index+1}. {item.text}</Typography></div>
            ))}
            </div>


            
            { image !== null ? <img className={classes.img} src={image} alt="foodpic"></img> : null }
            </div>
            
        );
    }
}

export default withStyles(styles)(RecipeViewer);
