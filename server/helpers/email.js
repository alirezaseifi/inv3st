import nodemailer from 'nodemailer';
import { emailConfig } from '../config';

const from = 'Inwest Team';

export function sendVerificationEmail(email, first, token) {
  const transporter = nodemailer.createTransport(emailConfig);
  const baseUrl = ((process.env.NODE_ENV === 'production') ? 'https://inwest.io' : 'http://localhost:3000');
  const html = `<a href="${baseUrl}/verify-account/?email=${email}&token=${token}" style="background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">Activate Account</a>`

  transporter.sendMail({
    from,
    to: email,
    subject: 'Thanks for joining Inwest!',
    html,
  }, (err) => {
    if (err) {
      return err;
    }
  });
}
