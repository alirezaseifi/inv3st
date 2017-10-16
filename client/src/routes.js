import React from 'react';
import { Route, IndexRoute } from 'react-router';
import requireAuth from './components/common/RequireAuth.jsx';
import requireNotAuth from './components/common/RequireNotAuth.jsx';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import FAQ from './components/FAQ.jsx';
import SignUp from './components/auth/SignUp.jsx';
import SignUpVerify from './components/auth/SignUpVerify.jsx';
import VerifyAccount from './components/auth/VerifyAccount.jsx';
import Callback from './components/auth/Callback.jsx';
import Login from './components/auth/Login.jsx';
import SetupAccount from './components/account/SetupAccount';
import Dashboard from './components/dash/Dashboard.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireNotAuth(Home)}/>
    <Route path="faq" component={FAQ}/>
    <Route path="signup" component={requireNotAuth(SignUp)}/>
    <Route path="login" component={requireNotAuth(Login)}/>
    <Route path="callback" component={requireAuth(Callback)}/>
    <Route path="signup/verify-account" component={requireNotAuth(SignUpVerify)}/>
    <Route path="verify-account" component={requireNotAuth(VerifyAccount)}/>
    <Route path="setup-account" component={requireAuth(SetupAccount)}/>
    <Route path="dashboard" component={requireAuth(Dashboard)}/>
  </Route>
)
