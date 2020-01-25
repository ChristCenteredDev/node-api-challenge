/* 
Perform CRUD operations on projects and actions. When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
 
Retrieve the list of actions for a project.
*/

const express = require('express');
const Action = require('../data/helpers/actionModel');
const router = express.Router();
