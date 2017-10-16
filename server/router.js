import passport from 'passport';
import { getAccessToken, getTransactions } from './controllers/financeController';
import { login, signup, verifyAccount, setupPayments, callback } from './controllers/authController';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.post('/get_access_token', getAccessToken);
  app.post('/signup', signup);
  app.post('/signup/verify-account', verifyAccount);
  app.post('/login', requireLogin, login);
  app.post('/setup-payments', setupPayments);
  app.get('/get_transactions', getTransactions);
  app.get('/callback', callback);

};

export default router;



// curl https://api.coinbase.com/oauth/token \
//   -X POST \
//   -d 'grant_type=authorization_code&code=4c666b5c0c0d9d3140f2e0776cbe245f3143011d82b7a2c2a590cc7e20b79ae8&client_id=1532c63424622b6e9c4654e7f97ed40194a1547e114ca1c682f44283f39dfa49&client_secret=3a21f08c585df35c14c0c43b832640b29a3a3a18e5c54d5401f08c87c8be0b20&redirect_uri=https://56de0d00.ngrok.io/callback'