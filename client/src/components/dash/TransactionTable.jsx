import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.toggleTable = this.toggleTable.bind(this);
    let transObj = this.props.transactions;
    let numActiveTransactions = transObj.active.length;
    let numContributedTransactions = transObj.contributed.length;
    this.state = {
      numActiveTransactions,
      numContributedTransactions,
      active: transObj.active,
      contributed: transObj.contributed,
      showActive: true
    }
  }

  toggleTable() {
    let showActive = !this.state.showActive;
    this.setState({ showActive: showActive });
  }

  render() {
    let {
      showActive,
      active,
      contributed,
      numActiveTransactions,
      numContributedTransactions
    } = this.state;

    const columns = [{
      Header: 'Date',
      accessor: 'date',
      width: 120
    },
    {
      Header: 'Name',
      accessor: 'name'
    }, {
      id: 'amount',
      Header: 'Amount',
      accessor: d => `$${(d.amount).toFixed(2)}`,
      width: 110
    }, {
      id: 'contribution',
      Header: 'Round off',
      accessor: (d) => {
        return `$${(Math.ceil(d.amount) - d.amount).toFixed(2)}`
      },
      width: 110
    }];

    return (
      <div className="transaction-table">
        <div className="table-hdr">
          <h2 className="table-title">Transactions</h2>
          <div className="table-toggle">
            <button className={`toggle-btn left ${showActive ? 'toggle-selected' : ''}`} onClick={this.toggleTable}>
              Not Invested
            </button>
            <button className={`toggle-btn right ${showActive ? '' : 'toggle-selected'}`} onClick={this.toggleTable}>
              Invested
            </button>
          </div>
        </div>
        {showActive ? (
          <ReactTable
            data={active}
            columns={columns}
            pageSize={numActiveTransactions}
            showPageSizeOptions={false}
            showPageJump={false}
            showPagination={false}
            noDataText="No active transactions to display. (Please use your credit card and come back later)"
          />
        ) : (
          <ReactTable
            data={contributed}
            columns={columns}
            pageSize={numContributedTransactions}
            showPageSizeOptions={false}
            showPageJump={false}
            showPagination={false}
            noDataText="No invested transactions to display."
          />
        )}
      </div>
    );
  }
}
