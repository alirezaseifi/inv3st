import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { resend: false };
  }

  componentWillMount() {
    const { code, state } =  this.props.location.query;
    this.user = {};
    this.user.code = code;
    this.user.state = state;
    this.props.callback({ code, state });
  }


  render() {
    return (
      <div className="container">
        {
          this.props.errorMessage && this.props.errorMessage.verifyAccount &&
            <div>
              <h1>Failure</h1>
              <p>{ this.props.errorMessage.verifyAccount.message }</p>
            </div>
        }
        {
          this.props.errorMessage && this.props.errorMessage.verifyAccount && this.props.errorMessage.verifyAccount.resend && !this.state.resend &&
            <p className="resend" onClick={this.resendEmail.bind(this, this.user)}>
              Resend verification code
            </p>
          }
        {
          this.state.resend &&
            <p className="resended">
              Email verification code has been resended
            </p>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(VerifyAccount);
