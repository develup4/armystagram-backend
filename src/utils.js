import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import mgTransfer from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  console.log(randomNumber);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  const option = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransfer(option));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'admin@armystagram.com',
    to: address,
    subject: 'Login Secret for armystagram',
    html: `<h2>Hello! Your login secret is [${secret}].
    </h2><h2>Copy and paste on your app or website</h2>`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
