import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 20,
    },
    flex: {
        flex: 1
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

const Header = props => {
    const { classes } = props;

    let toolbarButton = null;
    if (!props.sidebar && props.authenticated) {
        toolbarButton = (
            <IconButton className={[classes.menuButton, classes.navIconHide].join(' ')} color="inherit" aria-label="Menu" onClick={props.clickButton}>
                <MenuIcon />
            </IconButton>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {toolbarButton}
                    <Typography variant="display2" color="inherit" className={classes.flex}>
                        Food
                    </Typography>
                    {props.authenticated ? (
                        <Button color="inherit" onClick={props.handleSignOut}>
                            Logout
                        </Button>
                    ) : null}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(Header);
