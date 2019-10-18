import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Routes from './routes.js';
import LoadingIndicator from './utils/LoadingIndicator.js';

function App(props) {
  return (
    <Fragment>
      <header className="header">
        <Link to="/">Podcaster</Link>
        <LoadingIndicator />
      </header>
      <Routes />
    </Fragment>
  );
}

export default App;
