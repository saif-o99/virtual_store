import React from 'react';
import LoginPage from '../LoginPage/Login';
import Register from '../registration/registration';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import AddItem from '../addItem/addItem';
import Home from '../home/home';

const AppRoutes = () => {

  return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/login'} component={LoginPage}/>
            <Route exact path='/register' component={Register} redirect={false}/>
            {localStorage.getItem('user') && localStorage.getItem('user') === 'hWGZRo9Zf0QXYUSJGmLAMIAiouD2' ?
                <Route exact path='/add-item' component={AddItem} redirect={false}/>
                :
                <Redirect to='/login'/>
            }
          </Switch>
        </BrowserRouter>
      </main>
  );
};

export default AppRoutes;

