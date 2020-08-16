const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  subject: {
    type: String,
  },
  employees: {
    type: Array,
  },
  date: {
    type: String,
  },
  department: {
    type: String,
  },
  fullname: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  deadline: {
    type: String,
  },
  creationDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  progress: {
    type: String,
  },
  featureTitle: { type: String },
  featureDescription: { type: String },
  featureDeadline: { type: String },
  featureStatus: { type: String },
  featureProgress: { type: String },
  singleSelect: { type: String },
  receiveddepartment: { type: String },
  sentdepartment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
