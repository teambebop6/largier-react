/**
 * Created by Henry Huang.
 */

import AdminHomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

// Subroutes
import eventsRoutes from './pages/Events/routesConfig';

const path = require('path');

var routes = [
  {
    path: '/admin',
    component: AdminHomePage,
    exact: true,
    admin: true,
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  }
]

// Plugin events subroute
const eventsBaseUrl = '/admin/events/';
eventsRoutes.forEach(function(route, index) {
  eventsRoutes[index].path = path.join(eventsBaseUrl, route.path);
});
routes = routes.concat(eventsRoutes);


export default routes;
