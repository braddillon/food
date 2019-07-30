import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {},
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    chip: {
        marginRight: 3,
        height: 25,
        marginBottom: 5
    },
    tags: {
        marginTop: 10
    }
});

class RecipeGallerySideBarFilter2 extends Component {
    // toggleFilter = (id) => {
    //     this.setState(prevState => {
    //         if (prevState.activeTags.includes(id))
    //             return { activeTags: prevState.activeTags.filter(item => item !== id)}
    //         else
    //             return { activeTags: [...prevState.activeTags, id] }
    //     })
    // }

    render() {
        const { classes, tags } = this.props;

        let tagFilters = Object.keys(tags)
            .sort((a, b) => {
                let x = tags[a].name.toLowerCase();
                let y = tags[b].name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            })
            .map(key => (
                <Chip key={key} label={tags[key].name} className={classes.chip} color={this.props.activeTags.includes(key) ? 'primary' : 'default'} onClick={() => this.props.onToggleTag(key)} />
            ));

        return (
            <div>
                <TextField
                    id="standard-name"
                    label="Search"
                    className={classes.textField}
                    value={this.props.term}
                    fullWidth
                    onChange={e => {
                        this.props.onSearch(e.target.value);
                    }}
                    margin="normal"
                />
                <div className={classes.tags}>
                    <Typography variant="subtitle1">Tags</Typography>
                    {tagFilters}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RecipeGallerySideBarFilter2);
