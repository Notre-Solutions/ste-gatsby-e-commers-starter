import React, { Fragment, useContext } from 'react';
import Layout from '../components/layout';

function LandingPage() {
  return (
    <Fragment>
      <h1>Landing</h1>
      <p>
        The Landing Page is open to everyone, even though the user
        isn't signed in.
      </p>
    </Fragment>
  );
}

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
