/** @jsx React.DOM */
var React = require('react');
var DefaultLayout = require('./layouts/default');

var Page = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title} />
    );
  }
});

module.exports = Page;