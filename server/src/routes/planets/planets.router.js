const express = require('express');
const planetController = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', planetController.httpGetAllPlanets);

module.exports = planetsRouter