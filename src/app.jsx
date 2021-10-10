import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import '../assets/application.scss';
import ServerContext from './contexts/serverContext.js';
import App from './components/App.jsx';
import store from './redux/store';
import {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/index.js';
import resources from './locales/index.js';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });
  socket.on('removeChannel', (id) => {
    store.dispatch(removeChannel(id));
  });
  const serverContextValues = {
    newMessage: (message, acknowledge) => socket.emit('newMessage', message, acknowledge),
    newChannel: (channel, acknowledge) => socket.emit('newChannel', channel, acknowledge),
    renameChannel: (data, acknowledge) => socket.emit('renameChannel', data, acknowledge),
    removeChannel: (id, acknowledge) => socket.emit('removeChannel', id, acknowledge),
  };
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ServerContext.Provider value={serverContextValues}>
          <App />
        </ServerContext.Provider>
      </Provider>
    </I18nextProvider>,
    document.getElementById('chat'),
  );
};
