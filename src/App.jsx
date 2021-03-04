import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import RegistrationPage from './pages/Register';

import { ROUTE_HOME, ROUTE_SIGNUP, ROUTE_PROFILE } from './constants';
import ProfilePage from './pages/Profile';

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}
    >
      <div className='app-container'>
        <Router>
          <Switch>
            <Route component={LoginPage} path={ROUTE_HOME} exact />
            <Route component={RegistrationPage} path={ROUTE_SIGNUP} exact />
            <Route component={ProfilePage} path={ROUTE_PROFILE} exact />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
