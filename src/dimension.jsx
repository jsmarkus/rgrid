/**
 * @jsx React.DOM
 */

var React = require('react');

var Dimension = React.createClass({
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return this.props.value.id !== nextProps.value.id;
  // },

  render: function() {
    return (
      <span>Dimension: <a href={this.props.value.id}>{this.props.value.name}</a></span>
    );
  }

});

module.exports = Dimension;