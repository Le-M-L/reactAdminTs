import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
// 引入store
import store from './store';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  // 2、然后使用react-redux的Provider将props与容器连通起来
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
