/**
 * @jsx React.DOM
 */

/**
 * @jsx React.DOM
 */

var React = require('react');

var Metric = React.createClass({
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return this.props.value !== nextProps.value;
  // },

  _round: function (value, precision) {
    if (precision === undefined) {
      return value;
    }
    return (1 * value).toFixed(precision);
  },

  render: function() {
    return (
      <span>Metric: {
        this._round(this.props.value, this.props.col.precision)
      }</span>
    );
  }

});

module.exports = Metric;