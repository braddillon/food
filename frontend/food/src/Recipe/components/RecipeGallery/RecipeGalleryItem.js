import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

const styles = {
    card: {
      width: 345,
      margin: 3,
    },
    media: {
      height: 225,
    },
    chip: {
      marginRight: 3,
      height: 20,
      marginBottom: 0
    },
    cardContent: {
      minHeight: 20,
      padding: 10
    },
    recipeName: {
      marginBottom: 0
    }
 
  };

const RecipeGalleryItem = props => {
    const { classes } = props;
    let tagArray = props.tags.split(',');
    const tags = tagArray.filter( item => (item !== '')).map( item => (<Chip label={item} color="secondary" className={classes.chip} key={props.id + item} />))

    return (
      <Link to={`/recipe/${props.slug}`}>
        <Card className={classes.card}>
      <CardActionArea>

        <CardMedia
          className={classes.media}
          image={props.thumbnail === "" ? "empty" : props.thumbnail}
          title={props.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="body1" component="h2" className={classes.recipeName}>
            {props.name}
          </Typography>
          {/* {tags} */}
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    );
};

export default withStyles(styles)(RecipeGalleryItem);


// image="https://www.verywellfit.com/thmb/dm_0yG4ovnVTsbNv29FB-pjRMAo=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/fajitas-56a5c2803df78cf77289c87c.jpg"