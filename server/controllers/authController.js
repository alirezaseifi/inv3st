import User from '../models/user';
import stripePackage from 'stripe';
import moment from 'moment';
import { tokenForUser } from '../helpers/token';
import { sendVerificationEmail } from '../helpers/email';
import { stripeKeys } from '../config';
var request = require('request');
var Client = require('coinbase').Client;

export const login = (req, res, next) => {
  const {
    id,
    first,
    last,
    email,
    hasAccessToken,
    hasCustomerId,
    total,
    numContribs,
    lastContribDate
  } = req.user;

  res.json({
    id,
    token: tokenForUser(req.user),
    first,
    last,
    email,
    hasAccessToken,
    hasCustomerId,
    total,
    numContribs,
    lastContribDate
  });
}

export const signup = (req, res, next) => {
  const { first, last, email, password } = req.body;

  if (!first || !last || !email || !password) {
    return res.status(422).send({ error: "All fields are required." });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: "Email already in use." });
    }

    const user = new User({ first, last, email, password });

    user.save((err) => {
      if (err) { return next(err); }

      sendVerificationEmail(email, first, user.auth.token);
      res.json({ first, last, email });
    });
  });
}

export const verifyAccount = (req, res, next) => {
  const { email, token } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

    if (!user) {
      return res.status(422).send({ error: { message: "User does not exist." } });
    }

    if (user.auth.used) {
      return res.status(422).send({ error: { message: "Link already used", resend: false } });
    }

    if (new Date() > user.auth.expires) {
      return res.status(422).send({ error: { message: "Link already expired.", resend: true } });
    }

    if (token !== user.auth.token) {
      return res.status(422).send({ error: { message: "Something has gone wrong, please sign up again.", resend: false } });
    }

    User.findByIdAndUpdate(user.id, { role: 1, auth: { used: true } }, { new: true }, (err, user) => {
      if (err) { return next(err); }

      const {
        id,
        first,
        last,
        email,
        hasAccessToken,
        hasCustomerId,
        total,
        numContribs,
        lastContribDate
      } = user;

      res.json({
        id,
        token: tokenForUser(user),
        first,
        last,
        email,
        hasAccessToken,
        hasCustomerId,
        total,
        numContribs,
        lastContribDate
      });
    });
  });
}

export const setupPayments = (req, res, next) => {
  console.log(req);
  let stripeKey = ((process.env.NODE_ENV === 'production') ? stripeKeys.live : stripeKeys.test);
  let stripe = stripePackage(stripeKey);
  let user = req.body.user;
  let token = req.body.token;

  stripe.customers.create({ email: user.email })
    .then((customer) => {
      let lastContribDate = null;
      let startedTrackingDate = null;

      if (customer.id && user.hasAccessToken) {
        startedTrackingDate = moment().format('YYYY-MM-DD');
        lastContribDate = moment().format('YYYY-MM-DD');
      }

      User.findOneAndUpdate({ email: user.email }, { customerId: customer.id, hasCustomerId: true, startedTrackingDate, lastContribDate }, (err) => {
        if (err) { return next(err); }
        res.json({ hasCustomerId: true });
      });

      return stripe.customers.createSource(customer.id, { source: token.id });
    })
    .catch((err) => {
      console.log('Error setting up payment: ', err);
    });
}



export const callback = (req, res, next) => {
  // let user = req.body.user;
  // let token = req.body.token;
  if (req.query.state){

    var dataString = 'grant_type=authorization_code&code='+req.query.code+'&client_id=4b953dc5193c8d5842635395fda00c14fe227309b0962b9072f826382864599b&client_secret=9fe124e91c7b0c1569171688a2fcf0a664d16f6d71b279d6d1ac3fe393b9344a&redirect_uri=https://56de0d00.ngrok.io/callback';

    var options = {
        url: 'https://api.coinbase.com/oauth/token',
        method: 'POST',
        body: dataString
    };

      function tokenCallback(error, response, body) {
        console.log(error,response.body,body);
        if (!error && response.statusCode == 200) {
          let startedTrackingDate = moment().format('YYYY-MM-DD');
          let lastContribDate = moment().format('YYYY-MM-DD');
          var result = JSON.parse(response.body)
          if (result.access_token){
            var client = new Client({'accessToken': result.access_token, 'refreshToken': result.refreshToken});

            client.getPaymentMethods({}, function(err, pms) {
              if(err) {
                console.log('Unknown Error');
                return next(err);;
              }

              client.getAccounts({}, function(err, accounts) {
                  //console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
                  User.findOneAndUpdate({_id: req.query.state}, {"coinbase.auth":JSON.parse(response.body),"coinbase.paymentMethods":pms, "coinbase.accounts":accounts, customerId: req.query.code, hasCustomerId: true, startedTrackingDate, lastContribDate }, { new: false }, (err) => {
                    if (err) { console.log(err);return next(err); }

                    res.json({ hasCustomerId: true });
                  });

              });

              console.log(pms);
            });

            // client.getAccounts({}, function(err, accounts) {
            //   accounts.forEach(function(acct) {
            //     console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            //   });
            // });

          }

        }
      }

      request(options, tokenCallback);
  }else{
      console.log("CALLBACK RESULT",req.query);
      return res.status(401).send({ error: { message: "Something went wrong while authenticating with Coinbase" } });
  }
  //   .catch((err) => {
  //     console.log('Error setting up payment: ', err);
  //   });
}