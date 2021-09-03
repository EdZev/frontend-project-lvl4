import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Err from './404.jsx';
import Form from './EntranceForm.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Form />
      </Route>
      <Route path="/login">
        <Form />
      </Route>
      <Route path="*">
        <Err />
      </Route>
    </Switch>
  </Router>
);

export default App;
