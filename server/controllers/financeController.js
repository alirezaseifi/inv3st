import plaid from 'plaid';
import envvar from 'envvar';
import moment from 'moment';
import stripePackage from 'stripe';
import { stripeKeys } from '../config';
import User from '../models/user';
var request = require('request');
var Coinbase = require('coinbase').Client;

const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID','59c978684e95b85652804e44');
const PLAID_SECRET = envvar.string('PLAID_SECRET','a1515e257144e081740b8813b2ee59');
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY','8a0543c35a121b228af0600fafa796');
//const PLAID_ENV = 'sandbox';
const PLAID_ENV = 'development';

let client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

export const getAccessToken = (req, res, next) => {
  const PUBLIC_TOKEN = req.body.public_token;
  let u = req.body.user;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) { 
      console.log(`Could not exchange public_token: ${error}.`);
      return res.json({error: error});
    }

    const ACCESS_TOKEN = tokenResponse.access_token;
    const ITEM_ID = tokenResponse.item_id;
    let lastContribDate = null;
    let startedTrackingDate = null;

    if (ACCESS_TOKEN && u.hasCustomerId) {
      startedTrackingDate = moment().format('YYYY-MM-DD');
      lastContribDate = moment().format('YYYY-MM-DD');
    }

    User.findOneAndUpdate({ email: u.email }, { access_token: ACCESS_TOKEN, hasAccessToken: true, startedTrackingDate, lastContribDate }, (err) => {
      if (err) { return next(err); }
      res.json({ hasAccessToken: true });
    });
  });
}

export const getTransactions = (req, res, next) => {
  const user = JSON.parse(req.query.user);

  User.findOne({ email: user.email }, (error, u) => {
    const today = moment().format('YYYY-MM-DD');
    const threeWeeksAgo = moment().subtract(4, 'weeks').format('YYYY-MM-DD');
    const accessToken = u.access_token;
    let startDate;

    if (moment(threeWeeksAgo, 'YYYY-MM-DD').isBefore(u.startedTrackingDate)) {
      startDate = u.startedTrackingDate
    } else {
      startDate = threeWeeksAgo;
    }

    client.getTransactions(accessToken, startDate, today, { count: 250, offset: 0 }, (err, result) => {
      if (err != null) {
        console.log(err);
        console.log('Error in fetching transactions.');
        return res.json({ error: err });
      }

      let transactions = filterTransactions(result.transactions);
      let transObj = splitTransactions(transactions, u.lastContribDate);
      const savedChange = calculateSavedChange(transObj.active);
      res.json({ transactions: transObj, savedChange });
    });
  });
}

export const chargeUsers = () => {
  let stripeKey = ((process.env.NODE_ENV === 'production') ? stripeKeys.live : stripeKeys.test);
  let stripe = stripePackage(stripeKey);
  let today = moment().subtract(1, 'days').format('YYYY-MM-DD');



  User.find({}, (err, users) => {
    users.map((u) => {
      if (u.customerId && u.access_token && u.coinbase) {
        client.getTransactions(u.access_token, u.lastContribDate, today, { count: 250, offset: 0 }, (err, result) => {
          if (err == null) {
            let transactions = filterTransactions(result.transactions);
            let savedChangeRaw = calculateSavedChange(transactions);
            let savedChange = calculateSavedChange(transactions);
            savedChange = 100 * savedChange.toFixed(2);
            console.log("REFRESHHH TOKEN",u.coinbase.auth.refresh_token);
            if (savedChange >= 50) {
              var dataString = 'grant_type=refresh_token&refresh_token='+u.coinbase.auth.refresh_token+'&client_id=4b953dc5193c8d5842635395fda00c14fe227309b0962b9072f826382864599b&client_secret=9fe124e91c7b0c1569171688a2fcf0a664d16f6d71b279d6d1ac3fe393b9344a&redirect_uri=https://inwest.io/callback';

              var options = {
                  url: 'https://api.coinbase.com/oauth/token',
                  method: 'POST',
                  body: dataString
              };

              request(options, tokenCallback);

              function tokenCallback(error, response, body) {
                console.log(error,response.body,body);
                if (!error && response.statusCode == 200) {
                  var result = JSON.parse(response.body)
                  if (result.access_token){
                      User.findOneAndUpdate({_id: u.id}, {"coinbase.auth":JSON.parse(response.body)}, (err) => {
                        if (err) { console.log(err);return next(err); }
                      });

                      var coinbase = new Coinbase({'accessToken': result.access_token, 'refreshToken': result.refreshToken});
                      console.log(u.coinbase.accounts);
                      var coinbaseObj = u.coinbase
                      var account =  coinbaseObj.accounts.find(
                         (it) => {
                           return it.currency.code === 'BTC';
                         }
                      );

                      //console.log("account: " + JSON.stringify(account));

                      coinbase.getAccount('primary', function(err, account) {
                        account.buy({"amount": savedChangeRaw,
                                     "currency": "USD",
                                     "payment_method": coinbaseObj.paymentMethods[0].id}, function(err, tx) {
                          console.log("BOUGHT BTC", tx);
                        });
                      });

                  }
                }
              }

              // stripe.charges.create({
              //   amount: savedChange,
              //   currency: "usd",
              //   customer: u.customerId
              // });

              const total = u.total + (savedChange/100);
              const numContribs = u.numContribs + transactions.length;
              const lastContribDate = moment().format('YYYY-MM-DD');
              User.findOneAndUpdate({ email: u.email }, { total, numContribs, lastContribDate }, (err, result) => {
                if (err != null) { console.log('There was an error:', err); }
                console.log("Successfully charged user.");
              });
            }
          } else {
            console.log(err);
          }
        });
      }
    });
  });
}

function calculateSavedChange(transactions) {
  return transactions.reduce((acc, item) => {
    if (item.amount > 0) {
      return acc + (Math.ceil(item.amount) - item.amount);
    }
    return acc;
  }, 0);
}

function filterTransactions(transactions) {
  return transactions.filter((item) => {
    if (item.amount > 0 && (Math.ceil(item.amount) - item.amount) !== 0 && !item.name.toUpperCase().includes('BLUECENT')) {
      return true;
    }
    return false;
  });
}

function splitTransactions(transactions, lastContribDate) {
  let active = [];
  let contributed = [];
  transactions.forEach((item) => {
    if (moment(item.date, 'YYYY-MM-DD').isBefore(lastContribDate)) {
      contributed.push(item);
    } else {
      active.push(item);
    }
  });
  return { active, contributed };
}
