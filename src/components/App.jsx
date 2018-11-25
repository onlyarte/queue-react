import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Header />

      <Router>
        <Route path="/" component={HomePage} />
      </Router>

      <Footer />
    </div>
  );
}

export default App;
