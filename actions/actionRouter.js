/* 
Perform CRUD operations on projects and actions. When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
 
Retrieve the list of actions for a project.
*/

const express = require('express');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.post('/', validateActionResources, (req, res) => {
  const { project_id, description, notes } = req.body;
  Actions.insert({ project_id, description, notes })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error creating action' });
    });
});

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error getting actionss' });
    });
});

// Middleware

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id).then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ errorMessage: "Action with ID doesn't exist" });
    }
  });
}

function validateActionResources(req, res, next) {
  if (
    req.body.project_id === undefined ||
    req.body.description === undefined ||
    req.body.notes === undefined
  ) {
    return res.status(400).json({
      errorMessage:
        'Make sure your action has a project_id, description & notes'
    });
  } else if (req.body.description.length > 128) {
    return res.status(400).json({
      errorMessage:
        'Description has too many characters, keep it at or below 128 characters'
    });
  } else {
    next();
  }
}

module.exports = router;
