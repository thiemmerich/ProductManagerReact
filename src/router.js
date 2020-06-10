import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Header from './components/Header/Header';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() ?
        (<Component {...props} />)
        :
        (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;