import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Header from './Header';

import HomePage from './HomePage/Index';
import SearchPage from './SearchPage/Index';
import MyQueuesPage from './MyQueuesPage/Index';
import MyAppointmentsPage from './MyAppointmentsPage/Index';
import QueuePage from './QueuePage/Index';
import UserPage from './UserPage/Index';

import UserSettingsModal from './UserSettingsModal';

import Footer from './Footer';

import UserContext from './UserContext';

import './Index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.toggleUserSettings = this.toggleUserSettings.bind(this);

    this.state = {
      user: undefined,
      showUserSettings: false,
    };
  }

  handleUser(user) {
    this.setState({ user });
  }

  toggleUserSettings() {
    const { showUserSettings } = this.state;
    this.setState({ showUserSettings: !showUserSettings });
  }

  render() {
    const { user, showUserSettings } = this.state;

    const userContextValue = {
      currentUser: user,
      set: updatedUser => this.handleUser(updatedUser),
      unset: () => this.handleUser(null),
    };

    return (
      <UserContext.Provider value={userContextValue}>
        <Router>
          <Fragment>
            <Header onUserSettingsOpen={this.toggleUserSettings} />

            <main className="main-content">
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/queues/:queueId" component={QueuePage} />
                {user && (<Route path="/queues" exact component={MyQueuesPage} />)}
                {user && (<Route path="/appointments" exact component={MyAppointmentsPage} />)}
                <Route component={HomePage} />
              </Switch>
            </main>

            {user && (
              <UserSettingsModal isOpen={showUserSettings} onToggle={this.toggleUserSettings} />
            )}
            <Footer />
          </Fragment>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
