require('dotenv').config();

const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const nodemailer = require('nodemailer');

const welcomeEmail = hbs.compile(
  fs.readFileSync((__dirname, './views/email.hbs'), 'utf8')
);

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENGRID_USERNAME,
    pass: process.env.SENGRID_PASSWORD,
  },
});

exports.confirmAccount = async (to, endpoint) => {
  return await transporter.sendMail({
    from: "'Vegan Vita' <vegan@vita.com>",
    to,
    subject: 'Confirm your account',
    html: welcomeEmail({ endpoint }),
  });
};
