import React from 'react';
import { Link } from 'react-router-dom';
// import ProgressTracker from './ProgressTracker';

function GoalSummary({ goal }) {
  return (
    <div className="goal-summary">
      <h2>{goal.name}</h2>
      {/* <ProgressTracker goal={goal} /> */}

      <Link to={`/goal/${goal.id}`}>{goal.description}</Link>
    </div>
  );
}

export default GoalSummary;
