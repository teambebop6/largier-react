/**
 * Created by Henry Huang.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import TopBar from './common/TopBar/TopBar';

import CrudTemplate from './CrudTemplate/routes';


const AdminHome = ({ match }) => (
  <div>
    <Route path={`${match.url}/crudTemplate/`} component={CrudTemplate} />

    <Route exact path={match.url} render={() =>
      <div>
        <p>
          Welcome to the admin control panel of chantallargier.com.
        </p>
      </div>
    }
    />
  </div>
);


export default AdminHome;
