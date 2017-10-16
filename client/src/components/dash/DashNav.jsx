import React, { Component } from 'react';

export default class DashNav extends Component {
  render() {
    return (
      <ul className="dash-nav">
        <li className={`dash-item ${this.props.dashState === 'transaction' ? 'active-item' : ''}`}
          onClick={() => {this.props.onClick('transaction')}}>
          Transactions
        </li>
        <li className={`dash-item ${this.props.dashState === 'candidates' ? 'active-item' : ''}`}
          onClick={() => {this.props.onClick('candidates')}}>
          Candidates
        </li>
        <li className={`dash-item ${this.props.dashState === 'settings' ? 'active-item' : ''}`}
          onClick={() => {this.props.onClick('settings')}}>
          Settings
        </li>
      </ul>
    );
  }
}
