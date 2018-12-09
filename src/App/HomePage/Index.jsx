import React, { Fragment } from 'react';
import SearchPane from './SearchPane';
import LoginPane from './LogInPane';

function Home() {
  return (
    <Fragment>
      <SearchPane />
      <LoginPane />
    </Fragment>
  );
}

export default Home;
