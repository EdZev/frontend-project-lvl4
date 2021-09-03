import React from 'react';
import ReactDom from 'react-dom';

import '../assets/application.scss';
import App from './components/App.jsx';

export default () => ReactDom.render(
  <App />,
  document.querySelector('#chat'),
);
