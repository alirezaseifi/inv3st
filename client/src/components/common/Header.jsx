import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.state = { showBetaAlert: true };
  }

  handleClick() {
    this.props.signOut();
  }

  closeAlert() {
    this.setState({ showBetaAlert: false });
  }

  render() {
    return (
      <header>
        <h1 className="logo">
          <Link to={this.props.authenticated ? '/dashboard' : '/'}>inwest</Link>
        </h1>
        {/*{this.state.showBetaAlert &&
          <div className="beta-alert">
            <span>We're currently in beta!</span>
            <span className="close-alert" onClick={this.closeAlert}>×</span>
          </div>
        }*/}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/faq">FAQ</Link>
          </li>
          {this.props.authenticated ?
            <li className="nav-item login" onClick={this.handleClick}>
              <Link to="#" className="signout-link">Sign Out</Link>
            </li>
          :
            <li className="nav-item login">
              <Link to="/login" className="login-link">Login</Link>
            </li>
          }
        </ul>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
