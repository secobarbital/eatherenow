var React = require('react');
var { RouteHandler } = require('react-router');

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Eat. Here. Now.</h1>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
