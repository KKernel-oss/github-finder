import React, { Fragment } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';

function Home() {
  return (
    <Fragment>
      <Search></Search>
      <Users></Users>
    </Fragment>
  );
}

export default Home;
