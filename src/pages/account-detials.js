import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import UserData from '../components/UserData';

const AccountPageBase = () => (
  <Fragment>
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <h2>User ID: {authUser.uid}</h2>
          <h2>User Name: {authUser.username}</h2>
        </div>
      )}
    </AuthUserContext.Consumer>
    <UserData />
  </Fragment>
);

const condition = (authUser) => !!authUser;

const AccountPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPageBase);

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);
