var React = require('react');
var {
  Route,
  DefaultRoute,
  NotFoundRoute
} = require('react-router');

var App = require('./components/App');
var NotFound = require('./components/NotFound');
var Suggest = require('./components/Suggest');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="suggest" handler={Suggest} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;
