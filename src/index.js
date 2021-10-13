// @ts-check

import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const socket = io();
  const app = await init(socket);
  ReactDOM.render(
    app,
    document.getElementById('chat'),
  );
};
run();
