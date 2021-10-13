import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Chat from './Chat.jsx';
import ErrorPage from './ErrorPage.jsx';
import Login from './LoginPage.jsx';
import Signup from './SignupPage.jsx';
import Nav from './Nav.jsx';
import authContext from '../contexts/authContext.js';
import useAuth from '../hooks/useAuth.js';

const AuthProvider = ({ children }) => {
  const data = localStorage.getItem('userId');
  const userData = data ? JSON.parse(data) : { username: null, token: null };
  const isLogged = userData.username !== null && userData.token !== null;
  const [loggedIn, setLoggedIn] = useState(isLogged);
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
      <div className="d-flex flex-column h-100 py-0">
        <Nav />
        <Switch>
          <LayoutRoute exact path="/">
            <Chat />
          </LayoutRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
