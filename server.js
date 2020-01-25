/* 
Perform CRUD operations on projects and actions. When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
 
Retrieve the list of actions for a project.
*/

const express = require('express');

const server = express();
server.use(express.json());
server.use(logger);

const projectRouter = require('./projects/projectRouter.js');
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Node API Challenge Sprint</h2>`);
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
