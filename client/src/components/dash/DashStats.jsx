import React, { Component } from 'react';

export default class DashStats extends Component {
  render() {
    return (
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="stat-content">
            <p className="stat-name">Total invested through Coinbase.</p>
            <p className="stat-number">${this.props.user.total.toFixed(2)}</p>
          </div>
        </div>
        <div className="dash-stat">
          <div className="stat-content">
            <p className="stat-name">Amount raised this month.</p>
            <p className="stat-number">${this.props.savedChange.toFixed(2)}</p>
          </div>
        </div>
        <div className="dash-stat">
          <div className="stat-content">
            <p className="stat-name">Number of contributions.</p>
            <p className="stat-number">{this.props.user.numContribs}</p>
          </div>
        </div>
      </div>
    );
  }
}
