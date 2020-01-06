import React, { Component } from 'react';

import StoreGroceryList from './Store/components/StoreGroceryList.js';
import EditFood from './Food/components/EditFood.js';
import AddFood from './Food/components/AddFood.js';
import FoodBrowser from './Food/components/FoodBrowserContainer.js';
//import RequireAuth from './auth/require_auth';
import RequireAuth from './Other/Auth/containers/require_auth';
// import RecipeGallery from '../Recipe/components/RecipeGallery';
import RecipeForm from './Recipe/containers/RecipeForm/RecipeFormContainer';
import RecipeGallery from './Recipe/containers/RecipeGallery/RecipeGalleryContainer';
import RecipeViewer from './Recipe/containers/RecipeViewer/RecipeViewerContainer';
import GroceryBuild from './Grocery/containers/GroceryBuild.js';
import StoreManager from './Store/containers/StoreManager.js';

import Signin from './Other/Auth/containers/Signin';
import Signout from './Other/Auth/containers/signout';

//import Header from './Header';
import { Route, Switch } from 'react-router'; // react-router v4

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signoutUser } from './Other/Auth/actions/authentication';

import Header from './Other/Layout/Header';
import Drawer from './Other/Layout/Drawer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#003366'
        },
        secondary: {
            main: '#337ab7'
        },
        error: {
            main: '#ff0000'
        }
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    state = {
        mobileSideDrawerOpen: false
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            mobileSideDrawerOpen: !prevState.mobileSideDrawerOpen
        }));
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    {/* <Header /> */}
                    <Header
                        clickButton={this.toggleDrawer}
                        sidebar={this.state.mobileSideDrawerOpen}
                        authenticated={this.props.authenticated}
                        handleSignOut={this.props.signoutUser}
                    />
                    <div
                        style={{
                            flexGrow: 1,
                            height: 430,
                            zIndex: 1,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%'
                        }}
                    >
                        <Drawer
                            toggleDrawer={this.toggleDrawer}
                            sidebar={this.state.mobileSideDrawerOpen}
                            authenticated={true}
                        // authenticated={this.props.authenticated}
                        //account={this.props.account}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                padding: 20
                            }}
                        >
                            <Switch>
                                <Route path="/signin" component={Signin} />
                                <Route path="/signout" component={Signout} />
                                <Route
                                    path="/store/groceryList"
                                    component={RequireAuth(StoreGroceryList)}
                                />
                                <Route
                                    path="/groceryBuild"
                                    component={RequireAuth(GroceryBuild)}
                                />
                                <Route
                                    path="/recipeCreate"
                                    component={RequireAuth(RecipeForm)}
                                />

                                <Route
                                    path="/recipe/:_slug"
                                    component={RecipeViewer}
                                />
                                <Route
                                    path="/foodBrowser"
                                    component={RequireAuth(FoodBrowser)}
                                />
                                <Route
                                    path="/food/add"
                                    component={RequireAuth(AddFood)}
                                />
                                <Route
                                    path="/food/:_id"
                                    component={RequireAuth(EditFood)}
                                />
                                <Route
                                    path="/store/manager"
                                    component={RequireAuth(StoreManager)}
                                />
                                <Route
                                    path="/"
                                    component={RecipeGallery}
                                />


                            </Switch>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

// signInForm =
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        { signoutUser }
    )(App)
);

// export default App;
