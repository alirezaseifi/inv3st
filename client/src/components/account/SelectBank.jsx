import React, { Component } from 'react';

export default class SelectBank extends Component {
  render() {
    return (
      <div className={`bank-container ${this.props.displaySolo ? 'solo-bank' : ''}`}>
        <h2 className="bank-hdr">
          Connect your bank account to start tracking transactions.
        </h2>
        <button className="btn btn-bank" onClick={() => {this.props.getAccessToken()}}>
          Select Account
        </button>
      </div>
    );
  }
}
