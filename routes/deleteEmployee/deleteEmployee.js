const express = require('express');
const deleteEmployee = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();
const db = require('../../models/userSchema').User;
deleteEmployee.post('/', async (req, res) => {
  const email = req.body.email;
  const output = `<div><p>Sir Mr :<h5>${req.body.name}</h5></p>
    Sorry to inform you but we no longer need your services
    <P>Reasons : ${req.body.message}</P>
    </div>
    `;
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CEO_EMAIL,
      pass: process.env.CEO_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let options = {
    from: `"ManageIT CEO :)"`,
    to: req.body.email,
    subject: 'Inform ✔',
    html: output,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log('message failed');
    } else {
      console.log('Message sent: %s', 'done');
    }
  });
  await db.findOne({ email: email }, async (err, user) => {
    if (user) {
      await db.deleteOne(user);
      console.log('User removed!!');
      res.send('User removed!!');
    } else {
      console.log('removing user failed!!');
      res.send('removing user failed!!');
    }
  });
});

module.exports = deleteEmployee;
