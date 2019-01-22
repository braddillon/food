import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';


const styles = theme => ({
    root: {
        marginBottom: 20,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    flex: {
        flex: 1
    },
    lastMenuItem: {
        flex: 1,
    },
    title: {
        marginRight: 40
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
});

class Header extends Component {
    state = {
        anchorRecipe: null,
        anchorGrocery: null
    };

    recipeClick = event => {
        this.setState({ anchorRecipe: event.currentTarget });
    };

    recipeClose = () => {
        this.setState({ anchorRecipe: null });
    };

    groceryClick = event => {
        this.setState({ anchorGrocery: event.currentTarget });
    };

    groceryClose = () => {
        this.setState({ anchorGrocery: null });
    };

    render() {
        const { classes, sidebar, authenticated } = this.props;
        const { anchorRecipe, anchorGrocery } = this.state;

        let toolbarButton = null;
        if (!sidebar && authenticated) {
            toolbarButton = (
                <IconButton className={[classes.menuButton, classes.navIconHide].join(' ')} color="inherit" aria-label="Menu" onClick={this.props.clickButton}>
                    <MenuIcon />
                </IconButton>
            );
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        {toolbarButton}
                        <Typography className={classes.title} component={Link} to="/" variant="h3" color="inherit">
                            Food
                        </Typography>

                        <Hidden smDown>
                            <Button color="inherit" aria-owns={anchorRecipe ? 'recipe-menu' : undefined} aria-haspopup="true" onClick={this.recipeClick}>
                                Recipe
                            </Button>
                            <Menu id="recipe-menu" anchorEl={anchorRecipe} open={Boolean(anchorRecipe)} onClose={this.recipeClose}>
                                <MenuItem component={Link} to="/" onClick={this.recipeClose}>Gallery</MenuItem>
                                <MenuItem component={Link} to="/recipeCreate/"  onClick={this.recipeClose}>Create</MenuItem>
                                <MenuItem component={Link} to="/recipeGallery/" onClick={this.recipeClose}>Random</MenuItem>
                            </Menu>

                            <Button color="inherit" aria-owns={anchorGrocery ? 'recipe-menu' : undefined} aria-haspopup="true" onClick={this.groceryClick}>
                                Grocery
                            </Button>
                            <Menu id="recipe-menu" anchorEl={anchorGrocery} open={Boolean(anchorGrocery)} onClose={this.groceryClose}>
                                <MenuItem component={Link} to="/groceryBuild/" onClick={this.groceryClose}>Build List</MenuItem>
                                <MenuItem component={Link} to="/store/" onClick={this.groceryClose}>Store</MenuItem>
                            </Menu>

<div className={classes.lastMenuItem}>
                        <Button color="inherit" component={Link} to="/foodBrowser/">Food</Button>
                        </div>
                            
                        </Hidden>

                        

                        {authenticated ? (
                            <Button color="inherit" onClick={this.props.handleSignOut}>
                                Logout
                            </Button>
                        ) : null}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

// const Header = props => {

// };

export default withStyles(styles)(Header);
