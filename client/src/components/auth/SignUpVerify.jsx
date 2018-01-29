import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions';

class SignUpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = { resend: false };
  }

  componentWillMount() {
    this.email = this.props.location.query.email;

    if (!this.props.signup || !this.email) {
      browserHistory.push('/signup');
    }
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resendVerification(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="hdr">You're all set!</h1>
        <h3 className="verify-text">Please <a href="https://inwest.io/login">login</a> to add your bank account and coinbase account.</h3>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, signup: state.auth.signup };
}

export default connect(mapStateToProps, actions)(SignUpVerify);
