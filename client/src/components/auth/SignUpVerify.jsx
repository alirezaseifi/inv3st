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
        <h1 className="hdr">Activate your account.</h1>
        <h3 className="verify-text">Your Email has been added to our βeta wait list. As soon as we're ready, we'll Email you instructions for how to get started with Inwest.</h3>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, signup: state.auth.signup };
}

export default connect(mapStateToProps, actions)(SignUpVerify);
