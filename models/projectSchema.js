const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  featureCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featureTitle: { type: String },
  featureDescription: { type: String },
  featureDeadline: { type: String },
  featureStatus: { type: String },
  featureProgress: { type: String },
  featureEstimatedPrice: { type: Number },
  featureSpecificationsFile: { type: String },
  featureEstimateFile: { type: String },
});

const projectSchema = new Schema({
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
  feature: [featuresSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Project = mongoose.model('project', projectSchema);

// Fun to Create a project
async function createProject(department, title, description, status, user) {
  const project = new Project({
    department,
    title,
    description,
    status,
    user,
  });
  const result = await project.save();
  console.log(result);
}
// createProject(
//   'financial',
//   'new test',
//   'new description',
//   'in progress',
//   '5f18b78d794709194c24f790'
// );

module.exports = Project;
