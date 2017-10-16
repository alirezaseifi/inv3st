import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className="container-home">
        <h1 className="hdr">every ¢ent counts</h1>
        <div className="btns">
          <Link to="/signup">
            <button className="get-started">Get Started</button>
          </Link>
          <a href="/faq#how">
            <button className="get-started">How It Works</button>
          </a>
        </div>
      </div>
    );
  }
}
