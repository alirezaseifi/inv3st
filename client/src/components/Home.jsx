import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className="container-home">
      <iframe width="392" height="220" src="https://www.youtube.com/embed/dlXZy7CQtTk?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>  

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
