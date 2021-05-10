import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadDevTools } from "jira-dev-tool"
import { AppProviders } from "./context/index"

loadDevTools(() => ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
))



