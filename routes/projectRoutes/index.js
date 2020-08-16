const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();
const Project = require('../../models/projectSchema');
const admin = require('../../middleware/admin');

// Router for creating projects
router.post('/create', (req, res) => {
  var project = new Project(req.body);
  project.save(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
    res.end();
  });
});

// Router for getting projects
router.get('/create', (req, res) => {
  Project.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Router for getting a specified project (just one project)
router.get('/create/:id', (req, res) => {
  Project.find({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Router for getting specified projects by employee
router.get('/projectsByEmployee/:userId', (req, res) => {
  Project.find({ user: req.params.userId }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Router for getting specified features by employee
router.get('/featuresByEmployee/:userId', (req, res) => {
  Project.find({ 'feature.featureCreator': req.params.userId }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Router for getting specified projects by department
router.get('/projectsByDepartment/:department', (req, res) => {
  Project.find({ department: req.params.department }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let arr = [];
      for (var i in result) {
        for (var j in result[i].feature) {
          if (
            result[i].feature[j].featureStatus === 'In Progress' &&
            !arr.includes(result[i])
          ) {
            arr.push(result[i]);
          }
        }
      }

      res.send(arr);
    }
  });
});

// Router for getting specified projects by department
router.get('/update/projectsByDepartment/:department', (req, res) => {
  Project.find({ department: req.params.department }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Router for adding features to projects
router.patch('/create/:title', (req, res) => {
  Project.findOneAndUpdate(
    { title: req.params.title },
    { $push: { feature: [req.body] } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Router for updating status of projects features
router.patch('/update/:featureTitle', (req, res) => {
  console.log(req.body);
  Project.findOneAndUpdate(
    { 'feature._id': req.params.featureTitle },
    {
      $set: {
        'feature.$.featureStatus': req.body.featureStatus,
        'feature.$.featureProgress': req.body.featureProgress,
      },
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
// Router for updating status and specifications file of projects features
router.patch('/update/spec/:featureTitle', (req, res) => {
  console.log(req.body);
  Project.findOneAndUpdate(
    { 'feature._id': req.params.featureTitle },
    {
      $set: {
        'feature.$.featureStatus': req.body.featureStatus,
        'feature.$.featureProgress': req.body.featureProgress,
        'feature.$.featureSpecificationsFile':
          req.body.featureSpecificationsFile,
      },
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

// Router for updating status and estimate file of projects features
router.patch('/update/estimate/:featureTitle', (req, res) => {
  console.log(req.body);
  Project.findOneAndUpdate(
    { 'feature._id': req.params.featureTitle },
    {
      $set: {
        'feature.$.featureStatus': req.body.featureStatus,
        'feature.$.featureProgress': req.body.featureProgress,
        'feature.$.featureEstimateFile': req.body.featureEstimateFile,
        'feature.$.featureEstimatedPrice': req.body.featureEstimatedPrice,
      },
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

// Router for filtering methods projects
router.get('/methods', (req, res) => {
  Project.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var arr1 = [];
      var arr2 = [];
      var arr3 = [];
      var arr4 = [];
      for (var i = 0; i < result.length; i++) {
        if (result[i].department === 'Methods') {
          arr1.push(result[i]);
        }
        if (result[i].feature) {
          for (var j in result[i].feature) {
            if (
              result[i].feature[j].featureStatus !== 'Created' &&
              result[i].feature[j].featureProgress !==
                'Sent to the Head of Department'
            ) {
              if (!arr2.includes(result[i])) {
                arr2.push(result[i]);
              }
            }
            if (
              result[i].feature[j].featureProgress ===
                'Estimate Sent back from IT' ||
              result[i].feature[j].featureProgress === 'Sent to CEO'
            ) {
              arr3.push(result[i]);
            }
          }
        }
      }

      arr4.push(arr1);
      arr4.push(arr2);
      arr4.push(arr3);
      res.send(arr4);
    }
  });
});

// Router for filtering IT projects
router.get('/it', (req, res) => {
  Project.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var arr1 = [];
      var arr2 = [];
      var arr3 = [];
      var arr4 = [];
      for (var i = 0; i < result.length; i++) {
        if (result[i].department === 'IT') {
          arr1.push(result[i]);
        }

        for (var j in result[i].feature) {
          if (
            result[i].feature[j].featureProgress === 'Sent to IT Department' ||
            result[i].feature[j].featureProgress ===
              'Estimate Sent back from IT' ||
            result[i].feature[j].featureProgress === 'Sent to CEO'
          ) {
            if (!arr2.includes(result[i])) {
              arr2.push(result[i]);
            }
          }

          if (
            result[i].feature[j].featureProgress ===
            'Validated and planned for production'
          ) {
            if (!arr3.includes(result[i])) {
              arr3.push(result[i]);
            }
          }
        }
      }
      arr4.push(arr1);
      arr4.push(arr2);
      arr4.push(arr3);
      res.send(arr4);
    }
  });
});

router.get('/ceo', (req, res) => {
  Project.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var arr1 = [];
      for (var i = 0; i < result.length; i++) {
        if (result[i].feature) {
          for (var j in result[i].feature) {
            if (
              result[i].feature[j].featureProgress === 'Sent to CEO' ||
              result[i].feature[j].featureProgress ===
                'Validated and planned for production'
            ) {
              if (!arr1.includes(result[i])) {
                arr1.push(result[i]);
              }
            }
          }
        }
      }
      res.send(arr1);
    }
  });
});

module.exports = router;
