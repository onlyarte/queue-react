import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';

import Home from './Home/Index';
import Appointments from './Appointments/Index';
import Queues from './Queues/Index';

import Footer from './Footer';

import UserContext from './UserContext';

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
    const { user } = this.state;

    return (
      <Router>
        <UserContext.Provider value={user}>
          <Header user={user} />

          <main className="mt-5">
            <Route
              exact
              path="/"
              component={props => <Home onUserChange={this.handleUserChange} {...props} />}
            />

            <Route path="/queues" component={Queues} />
            <Route path="/appointments" component={Appointments} />
          </main>

          <Footer />
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
