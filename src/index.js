import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

// examples:
import Home from './Home';
import Main from './examples/Main';
import Heatmap from './examples/Heatmap';
import SearchBox from './examples/Searchbox';
import Autocomplete from './examples/Autocomplete';
import MarkerInfoWindow from './examples/MarkerInfoWindow';
import MarkerInfoWindowGmapsObj from './examples/MarkerInfoWindowGmapsObj';

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

ReactDOM.render(
  <Router>
    <App>
      <AppProvider>
        <AppTemplate>
          <AppFilter />
          <Map/>
        </AppTemplate>
        
      </AppProvider>
    </App>
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
