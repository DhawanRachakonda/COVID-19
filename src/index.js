import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Main from './examples/Main';
import Admin from './components/Admin';

// styles
import './index.css';

// components
import App from './App';

// utils
import registerServiceWorker from './registerServiceWorker';

import {AppProvider} from './components/AppContext';
import Map from './components/Map';
import AppTemplate from './components/AppTemplate';
import AppFilter from './components/AppFilter';

import 'bootstrap/dist/css/bootstrap.min.css';

const defaultPath = process.env.REACT_APP_BASE_PATH;

const Home = () =>  {
  return (
    <React.Fragment>
      <AppFilter />
      <Map/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <Router>
    <AppProvider>
      <AppTemplate>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={`/admin`} component={Admin} />
          <Redirect exact from="*" to={"/"} />
        </Switch>
      </Router>
    </AppTemplate>
    </AppProvider>
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
