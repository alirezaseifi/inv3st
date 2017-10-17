import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Elements } from 'react-stripe-elements';
import * as actions from '../../actions';
import SelectBank from './SelectBank';
import SetupPayments from './SetupPayments';

class SetupAccount extends Component {
  componentWillMount() {
    const user = this.props.user;
    if (user.hasAccessToken && user.hasCustomerId) {
      browserHistory.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    if (user.hasAccessToken && user.hasCustomerId) {
      browserHistory.push('/dashboard');
    }
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  getAccessToken() {
    this.props.getAccessToken(this.props.user);
  }

  render() {
    const { user } = this.props;

    if (!user.hasCustomerId && !user.hasAccessToken) {
      return (
        <div>
          <div className="payment-container">
            <h2 className="payment-hdr">Connect your coinbase to start investing.</h2>

            <a href={"https://www.coinbase.com/oauth/authorize/oauth_signin?client_id=4b953dc5193c8d5842635395fda00c14fe227309b0962b9072f826382864599b&redirect_uri=https%3A%2F%2Finwest.io%2Fcallback&response_type=code&scope=wallet:deposits:create,wallet:transactions:send,wallet:accounts:read,wallet:payment-methods:read,wallet:orders:read&account=all&referral=5926fed0af2b9403ec411b7f&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day&referral=5926fed0af2b9403ec411b7f&state="+ user.id } target="_blank"><button className="btn btn-bank">Connect Coinbase</button></a>

          </div>
          <SelectBank getAccessToken={this.getAccessToken.bind(this)} />

        </div>
      );
    } else if (user.hasAccessToken && !user.hasCustomerId) {
      return (
        <div className="payment-container solo-payment">
          <h2 className="payment-hdr">Connect your coinbase to start investing.</h2>


          <a href={"https://www.coinbase.com/oauth/authorize/oauth_signin?client_id=4b953dc5193c8d5842635395fda00c14fe227309b0962b9072f826382864599b&redirect_uri=https%3A%2F%2Finwest.io%2Fcallback&response_type=code&scope=wallet:deposits:create,wallet:transactions:send,wallet:accounts:read,wallet:payment-methods:read,wallet:orders:read&account=all&referral=5926fed0af2b9403ec411b7f&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day&referral=5926fed0af2b9403ec411b7f&state="+ user.id } target="_blank"><button className="btn btn-bank">Connect Coinbase</button></a>


        </div>
      );
    } else {
      return (
        <SelectBank
          getAccessToken={this.getAccessToken.bind(this)}
          displaySolo={true}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(SetupAccount);
