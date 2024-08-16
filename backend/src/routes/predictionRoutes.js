// server/routes/predictionRoutes.js

const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

router.post('/', predictionController.predictGoal);

module.exports = router;
