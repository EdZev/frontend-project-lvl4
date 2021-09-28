import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../assets/application.scss';
import Component from './components/App.jsx';

export default (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('chat'),
  );
};
