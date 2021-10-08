import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Layout from './Layout.jsx';
import ErrorPage from './ErrorPage.jsx';
import Login from './LoginPage.jsx';
import Signup from './SignupPage.jsx';
import authContext from '../contexts/authContext.jsx';
import useAuth from '../hooks/useAuth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const LayoutRoute = ({ children, path }) => {
  const auth = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};
const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <LayoutRoute exact path="/">
          <Layout />
        </LayoutRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
