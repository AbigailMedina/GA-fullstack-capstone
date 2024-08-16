import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GoalDetails() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  async function getGoal() {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/goals/${id}`);
      const goalData = await response.json();
      setGoal(goalData[0])

    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getGoal();
  }, []);
  

  if (!goal) return <div>Loading...</div>;

  return (
    <div className="goal-details">
            <h2>Goal Details</h2>

      <p>Description: {goal.description}</p>
      <p>Amount: {goal.amount}</p>
      <p>Progress: {goal.progress}</p>
      <p>Deadline: {goal.deadline}</p>
    </div>
  );
}

export default GoalDetails;
