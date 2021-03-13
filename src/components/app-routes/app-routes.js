import React from 'react'
import LoginPage from "../LoginPage/Login";
import Register from "../registration/registration";
import {Route, Switch, BrowserRouter} from "react-router-dom";

const AppRoutes = () => {

    return (
        <main>
            <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={Register} redirect={false}/>
            </Switch>
            </BrowserRouter>
        </main>
    )
};

export default AppRoutes;

