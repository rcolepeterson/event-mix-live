import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as Constants from './constants';

//import {Loader} from './components/loader';
import Page404 from './pages/404';
import {CssBaseline, Container} from '@material-ui/core';

import './App.css';

import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';

const App = ({store}) => {
  return (
    <div className="App">
      <Container
        justify="center"
        maxWidth={false}
        align="left"
        disableGutters={true}
        component="main">
        <CssBaseline />
        <Router>
          <Switch>
            <Route path={Constants.HOME} exact component={HomePage} />
            <Route path={Constants.DASH} component={DashboardPage} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
};

export default App;
