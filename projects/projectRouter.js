/* 
Perform CRUD operations on projects and actions. When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
 
Retrieve the list of actions for a project.
*/

const express = require('express');
const Project = require('../data/helpers/projectModel');
const actionRouter = require('../actions/actionRouter.js');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, description } = req.body;
  Project.insert({ name, description })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error creating project' });
    });
});

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error getting projects' });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.project;
  Project.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error deleting project' });
    });
});

router.put('/:id', validateProjectId, (req, res) => {
  const { id } = req.project;
  const { name, description, completed } = req.body;

  Project.update(id, { name, description, completed })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error updating project' });
    });
});

router.get('/:id/projectActions', validateProjectId, (req, res) => {
  const { id } = req.project;
  Project.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error updating project' });
    });
});

router.use('/:id/actions', validateProjectId, actionRouter);

// Middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Project.get(id).then(project => {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ errorMessage: "Project with ID doesn't exist" });
    }
  });
}

module.exports = router;
