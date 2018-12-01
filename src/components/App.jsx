import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';

import Home from './Home/Index';
import Appointments from './Appointments/Index';
import Queues from './Queues/Index';

import Footer from './Footer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  handleUserChange(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />

          <Route
            exact
            path="/"
            component={props => <Home onUserChange={this.handleUserChange} {...props} />}
          />

          <Route path="/queues" component={Queues} />
          <Route path="/appointments" component={Appointments} />
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
