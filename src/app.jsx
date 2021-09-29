import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import '../assets/application.scss';
import ServerContext from './contexts/serverContext.jsx';
import App from './components/App.jsx';
import store from './redux/store';
import { addMessages } from './redux/index.js';

export default () => {
  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addMessages(message));
  });
  const serverContextValues = {
    newMessage: (message, acknowledge) => socket.emit('newMessage', message, acknowledge),
  };
  ReactDOM.render(
    <Provider store={store}>
      <ServerContext.Provider value={serverContextValues}>
        <App />
      </ServerContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
