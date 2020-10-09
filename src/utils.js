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
    from: process.env.ADMIN_MAIL,
    to: address,
    subject: 'Armystagram 가입인증 메일',
    html: `
    <h2>Armystagram 회원가입</h2>
    <h1">인증키값은 아래와 같습니다.<h1>
    <h2></h2>
    <h2>KEY: [ ${secret} ]</h2>
    <h2></h2>
    <a href="www.armystagram.ml">Armystagram으로 이동</a>
    `,
  };
  console.log(`Send secret mail [address:${address}, secret:${secret}]`);
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
