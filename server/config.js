import envvar from 'envvar';

const EMAIL_ADDRESS = envvar.string('EMAIL_ADDRESS');
const EMAIL_PASSWORD = envvar.string('EMAIL_PASSWORD');
const stripeLiveKey = envvar.string('STRIPE_LIVE_KEY','sk_test_LL97FA8ZQcJub7YqQzAJIpZP');
const stripeTestKey = envvar.string('STRIPE_TEST_KEY','sk_test_LL97FA8ZQcJub7YqQzAJIpZP');

export const mongoConfig = {
  secret: 'SomeSecret',
  db: 'mongodb://localhost/inwest'
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
};

export const stripeKeys = {
  live: stripeLiveKey,
  test: stripeTestKey
};
