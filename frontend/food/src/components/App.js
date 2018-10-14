import React, { Component } from 'react';
import GroceryBuild from './GroceryBuild/GroceryBuild.js';
import StoreList from './StoreList/StoreList.js';
import EditFood from './Food/EditFood.js';
import AddFood from './Food/AddFood.js';
import FoodBrowser from './Food/FoodBrowser.js';
import RequireAuth from './auth/require_auth';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Header from './Header';
import { Route, Switch } from 'react-router'; // react-router v4

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/store" component={RequireAuth(StoreList)} />
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
                    
                    <Route path="/" component={RequireAuth(GroceryBuild)} />
                </Switch>
            </div>
        );
    }
}

export default App;
