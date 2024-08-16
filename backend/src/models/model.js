// server/models/model.js

const { exec } = require('child_process');
const path = require('path');

const modelPath = path.join(__dirname, 'model.pkl');

exports.predict = (currentProgress, goalAmount, deadlineDays, monthlySavings) => {
    return new Promise((resolve, reject) => {
        const command = `python ${path.join(__dirname, 'predict.py')} ${currentProgress} ${goalAmount} ${deadlineDays} ${monthlySavings}`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', stderr);
                reject(error);
            } else {
                resolve(parseFloat(stdout.trim()));
            }
        });
    });
};
