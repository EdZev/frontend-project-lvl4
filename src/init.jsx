import React from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import Rollbar from 'rollbar';

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

export default async (socket) => {
  const rollbar = new Rollbar();
  rollbar.configure({
    accessToken: '20ae51a356f144fda5ba19fc97d7c114',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',

      interpolation: {
        escapeValue: false,
      },
    });

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
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ServerContext.Provider value={serverContextValues}>
          <App />
        </ServerContext.Provider>
      </Provider>
    </I18nextProvider>
  );
};
