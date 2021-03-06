import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TabPage from './TabPage';
import "../../css/dark.css";


export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <div className="test">
        <TabPage />
      </div>,
      document.getElementById('mountTabContainer')
    );
  }, 100);
}
