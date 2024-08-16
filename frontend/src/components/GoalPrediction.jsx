import React, { useState } from 'react';
// import axios from 'axios';

const GoalPrediction = () => {
    const [currentProgress, setCurrentProgress] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [deadlineDays, setDeadlineDays] = useState('');
    const [monthlySavings, setMonthlySavings] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async () => {
        // const response = await axios.post('http://localhost:5000/predict', {
        //     currentProgress,
        //     goalAmount,
        //     deadlineDays,
        //     monthlySavings
        // });
        // setPrediction(response.data.prediction);
    };

    return (
        <div>
            <h2>Goal Prediction</h2>
            <input
                type="number"
                placeholder="Current Progress"
                value={currentProgress}
                onChange={(e) => setCurrentProgress(e.target.value)}
            />
            <input
                type="number"
                placeholder="Goal Amount"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Days Until Deadline"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(e.target.value)}
            />
            <input
                type="number"
                placeholder="Monthly Savings"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction !== null && <p>Estimated Remaining Amount: ${prediction.toFixed(2)}</p>}
        </div>
    );
};

export default GoalPrediction;
