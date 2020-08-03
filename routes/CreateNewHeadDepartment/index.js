const express = require("express");
const router = express.Router();
const CreateNewHeadDepartment = router;
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { User } = require("../../models/userSchema");
require("dotenv").config();
CreateNewHeadDepartment.post("/", async (req, res) => {
  const email = req.body.email;
  const output = `<div><p>Sir Mr :<h5>${
    req.body.firstName + " " + req.body.lastName
  }</h5></p>
we are happy to tell you that we are proud to have you in the company with us.
  <P>Your password is : ${req.body.password}</P>
  </div>
  `;
  let transporter = await nodemailer.createTransport({
    service: "gmail",
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
    subject: "Inform ✔",
    html: output,
  };
  await transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("message failed");
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });

  const user = req.body;
  if (user) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await User.create(user);
  } else {
    res.send("the user already exists");
  }
});
module.exports = CreateNewHeadDepartment;
