import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className="container-home">
      <div className="video-container"<iframe width="560" height="315" src="https://www.youtube.com/embed/dlXZy7CQtTk" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe></div>

        <h1 className="hdr">every ¢ent counts</h1>
        <div className="btns">
          <Link to="/signup">
            <button className="get-started">Sign Up</button>
          </Link>
          <a href="/faq#what">
            <button className="get-started">How It Works</button>
          </a>
        </div>
      </div>
    );
  }
}
