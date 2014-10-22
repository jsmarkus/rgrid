/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var keypath = require('keypather')();

var ColumnDef = React.PropTypes.shape({
  key: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  precision: React.PropTypes.number,
  render: React.PropTypes.func,
  className: React.PropTypes.func,
  colSpan: React.PropTypes.func,
  rowSpan: React.PropTypes.func,
  skip: React.PropTypes.func,
});


var Grid = React.createClass({
  propTypes: {
    cols: React.PropTypes.arrayOf(ColumnDef).isRequired,
    rows: React.PropTypes.array,
  },

  _renderHeadCell: function (column) {
    return <th>
      {column.label || column.key}
    </th>;
  },

  _renderHeadRow: function (cols) {
    return <tr>
      {
        _(cols).map(this._renderHeadCell)
          .filter(function (it) {
            return it !== false;
          })
          .value()
      }
    </tr>;
  },

  _renderBodyCell: function (rowValues, rowIndex, col) {
    var key = col.key;
    var value = keypath.get(rowValues, key);
    var rowSpan;
    var colSpan;

    if(_.isFunction(col.skip)) {
      if(col.skip(value, rowValues, col, rowIndex)) {
        return false;
      }
    }

    if(_.isFunction(col.rowSpan)) {
      rowSpan = col.rowSpan(value, rowValues, col, rowIndex);
    }

    if(_.isFunction(col.colSpan)) {
      colSpan = col.colSpan(value, rowValues, col, rowIndex);
    }

    if(_.isFunction(col.render)) {
      value = col.render(value, rowValues, col, rowIndex);
    }
    return <td rowSpan={rowSpan} colSpan={colSpan}>{value}</td>;
  },

  _renderBodyRow: function (cols, rowValues, rowIndex) {
    return <tr>
      {
        _(cols)
          .map(this._renderBodyCell.bind(this, rowValues, rowIndex))
          .filter(function (it) {
            return it !== false;
          })
          .value()
      }
    </tr>;
  },

  _renderHead: function () {
    return <thead>
      {this._renderHeadRow(this.props.cols)}
    </thead>;
  },

  _renderBody: function () {
    return <tbody>
      { _(this.props.rows).map(this._renderBodyRow.bind(this, this.props.cols)).value() }
    </tbody>;
  },


	render: function() {
		var component = <table className="com-grid">
      { this._renderHead() }
      { this._renderBody() }
    </table>;
    return component;
	}

});

module.exports = Grid;