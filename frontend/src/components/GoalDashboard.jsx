import React, { useState, useEffect } from 'react';
import GoalSummary from './GoalSummary';
import { Card, CardContent, CardActionArea, Grid, Typography, Box, LinearProgress } from '@mui/material';
import GoalPrediction from './GoalPrediction';

import * as Service from '../services/api.js';
function GoalDashboard() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from API
  async function getGoals() {
    try {
      const goalData = await Service.getGoals();
      setGoals(goalData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom align="center">
        Financial Goals Dashboard
      </Typography>
      {/* <GoalPrediction /> */}

      <Grid container spacing={4}>
        {goals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardActionArea>
                {/* <GoalSummary goal={goal} /> */}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {goal.description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Amount:</strong> ${goal.amount}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Progress:</strong>
                  </Typography>
                  <Box sx={{ width: '100%', marginBottom: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Deadline:</strong> {new Date(goal.deadline).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <HuggingFaceComponent></HuggingFaceComponent> */}
    </Box>
  );
}

export default GoalDashboard;
