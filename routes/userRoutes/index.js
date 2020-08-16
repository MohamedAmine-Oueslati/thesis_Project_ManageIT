const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../../models/userSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(
    _.pick(req.body, ['email', 'password', 'fullname', 'department', 'role'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
});

// Change user password
router.patch('/changepassword/:id', async (req, res) => {
  // console.log(req.body);
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  console.log(req.params);
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      password: bcrypt.hash(req.body.newPassword, salt),
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        let user = User.findOne({ _id: req.params.id });
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email']));
      }
    }
  );

  // user.password = await bcrypt.hash(user.newPassword, salt);

  // await user.save();
  // const token = user.generateAuthToken();
});

router.get('/', (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get employees by department
router.get('/usersByDepartment/:department', (req, res) => {
  User.find({ department: req.params.department }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// get employees email
router.get('/usersByFullname/:fullname', (req, res) => {
  User.find({ fullname: req.params.fullname }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  User.find({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.patch('/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      position: req.body.position,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      aboutMe: req.body.aboutMe,
      profileImageURL: req.body.profileImageURL,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
module.exports = router;
