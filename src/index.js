import './index.css'



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import App from './App';
import './config';
import store from './redux/store'

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);