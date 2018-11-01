import React from 'react';

import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative'
        }
    }
});

const SideDrawer = props => {
    const { classes } = props;

    const drawer = (
        <div
            tabIndex={0}
            role="button"
            onClick={props.toggleDrawer}
            onKeyDown={props.toggleDrawer}
        >
            <div className={classes.list}>
                <List component="nav">
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Build List" />
                    </ListItem>
                    <ListItem button component={Link} to="/store/">
                        <ListItemText primary="Store" />
                    </ListItem>
                    <ListItem button component={Link} to="/foodBrowser/">
                        <ListItemText primary="Food Manager" />
                    </ListItem>
                </List>
            </div>
        </div>
    );

    if (props.authenticated) {
        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={props.sidebar}
                        onClose={props.toggleDrawer}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true,  // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    } else {
        return null;
    }
};

export default withStyles(styles)(SideDrawer);
