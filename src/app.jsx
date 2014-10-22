/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Grid = require('./grid.jsx');
var Metric = require('./metric.jsx');
var Dimension = require('./dimension.jsx');


var App = React.createClass({
  componentDidMount: function() {
    this._runTests();
  },

  _onRunTestsClick: function () {
    this._runTests();
  },

  _runTests: function () {
    console.profile();
    setTimeout(this._onChangeCellClick, 500);
    setTimeout(this._onChangeRowClick, 1000);
    setTimeout(this._onRefreshClick, 1500);
    setTimeout(console.profileEnd.bind(console), 2000);    
  },


  _onChangeCellClick: function () {
    this.setState({
      rows: React.addons.update(
        this.state.rows, {
          9: {
            col0: {
              $set: Math.random() * 1000
            }
          }
        }
      )
    });
  },

  _onChangeRowClick: function () {
    this.setState({
      rows: React.addons.update(this.state.rows, {
        9: {
          $set: this._getFakeRow()
        }
      })
    });
  },

  _onRefreshClick: function () {
    this.setState({
      rows: this._getFakeRows()
    });
  },

  _getFakeRow: function() {
    return {
      foo: Math.random() * 1000,
      bar: Math.random() * 1000,
      col0: Math.random() * 1000,
      col1: Math.random() * 1000,
      col2: Math.random() * 1000,
      col3: Math.random() * 1000,
      person: {
        id: Math.floor(Math.random() * 1e9).toString(36),
        name: Math.floor(Math.random() * 1e9).toString(36),
      }
    };
  },

  _getFakeRows: function() {
    var rows = [];
    for (var i = 0; i < 500; i++) {
      rows.push(this._getFakeRow());
    }
    return rows;
  },

  _getColumnDefs: function() {
    return [{
      key: 'person',
      label: 'Person',
      render: function (val, row, col) {
        return <Dimension value={val} col={col}></Dimension>;
      }
    }, {
      key: 'col0',
    }, {
      key: 'col1',
      precision: 2,
      // rowSpan: function (val, row, col, rowIndex) {return 2},
      // skip: function (val, row, col, rowIndex) {
      //   return !!(rowIndex % 2);
      // },
      render: function (val, row, col, rowIndex) {
        return <Metric value={val} col={col}></Metric>;
      },
    }, {
      key: 'col2',
      precision: 3,
      render: function (val, row, col) {
        return <Metric value={val} col={col}></Metric>;
      },
    }, {
      key: 'col3',
      precision: 4,
      render: function (val, row, col) {
        return <Metric value={val} col={col}></Metric>;
      },
    }, {
      key: 'foo',
      precision: 5,
      render: function (val, row, col) {
        return <Metric value={val} col={col}></Metric>;
      },
    }, {
      key: 'bar',
      precision: 6,
      render: function (val, row, col) {
        return <Metric value={val} col={col}></Metric>;
      },
    }]
  },

  getInitialState: function() {
    var state = {
      rows: this._getFakeRows(),
      cols: this._getColumnDefs(),
    };


    return state;
  },

	render: function() {
		return <div>
      <button onClick={this._onRunTestsClick}>RunTests</button>
      <button onClick={this._onRefreshClick}>Refresh</button>
      <button onClick={this._onChangeCellClick}>Change Cell</button>
      <button onClick={this._onChangeRowClick}>Change Row</button>
      <Grid rows={this.state.rows} cols={this.state.cols}></Grid>
    </div>;
	}

});

module.exports = App;