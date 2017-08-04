import React from 'react';
import { Home } from './App.js';
import { Login, Register, Profile, Logout } from './components/auth.js';
import { BucketLists } from './components/bucketlists.js';
import { BrowserRouter, Route } from 'react-router-dom';
import history from './history';

const Routes = () => {
    return(
        <BrowserRouter history={history}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/bucketlists" component={BucketLists} />
                <Route path="/profile" component={Profile} />
                <Route path="/logout" component={Logout} />
            </div>
        </BrowserRouter>
    );
}

export default Routes;