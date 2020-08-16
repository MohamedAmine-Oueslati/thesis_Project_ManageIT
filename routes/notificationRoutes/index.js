const express = require("express");
const router = express.Router();
const Notification = require("../../models/notificationSchema.js");
// const Meeting = require("../../models/meetingSchema.js");
// const Project = require('../../models/projectSchema');


router.post('/store', (req, res) => {

    var model = new Notification(req.body);
    model.save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send('done');
        }
        res.end();
    });
});


router.get('/retrieve', (req, res) => {
    Notification.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});




module.exports = router;