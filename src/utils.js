import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import mgTransfer from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
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
    from: 'admin@armystagram.ml',
    to: address,
    subject: 'Armystagram 가입인증 메일',
    html: `
    <h2>안녕하세요? 이 문구를 앱 혹은 웹페이지에 입력하여주세요.</h2>
    <h2>[ ${secret} ]</h2>
    `,
  };
  console.log(`Send secret mail [address:${address}, secret:${secret}]`);
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
