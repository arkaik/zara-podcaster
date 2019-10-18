import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from './routes.js';

function App(props) {

  const isLoading = useSelector(({ Loading }) => Loading.active);

  return (
    <Fragment>
      <header className="header">
        <Link to="/">Podcaster</Link>
        <div className={`loadingIndicator ${isLoading? 'active' : ''}`}></div>
      </header>
      <Routes />
    </Fragment>
  );
}

export default App;
