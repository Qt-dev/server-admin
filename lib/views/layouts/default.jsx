/** @jsx React.DOM */

var React = require('react');
var CSS = ['css/style.css'];
var JS = [
    'http://fb.me/react-0.10.0.js',
    'http://code.jquery.com/jquery-1.10.0.min.js',
    'js/output.min.js'
    ];

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <Head css={CSS} js={JS} />
        <body>{this.props.children}</body>
      </html>
    );
  }
})

var Head = React.createClass({
  render: function(){
    var styles = this.props.css.map(function (css) {
      return <link rel="stylesheet" href={css} />;
    });
    var javascripts = this.props.js.map(function (js) {
      return <script src={js} />;
    });
    return (
      <head>
        <title>{this.props.title}</title>
        {styles}
        {javascripts}
      </head>
    )
  }
})

module.exports = DefaultLayout;