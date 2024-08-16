// server/controllers/predictionController.js

const { predict } = require('../models/model');

exports.predictGoal = async (req, res) => {
    const { currentProgress, goalAmount, deadlineDays, monthlySavings } = req.body;

    try {
        const prediction = await predict(currentProgress, goalAmount, deadlineDays, monthlySavings);
        res.json({ prediction });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Prediction failed' });
    }
};
