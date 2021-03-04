import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import RegistrationPage from './pages/Register';

import { ROUTE_HOME, ROUTE_SIGNUP, ROUTE_PROFILE } from './constants';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route component={LoginPage} path={ROUTE_HOME} exact />
          <Route component={RegistrationPage} path={ROUTE_SIGNUP} exact />
          <Route component={ProfilePage} path={ROUTE_PROFILE} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
