# server/train_model.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

# Load historical data
data = pd.read_csv('data/historical_expenses.csv') 

# Prepare features and target
X = data[['current_progress', 'goal_amount', 'deadline_days', 'monthly_savings']]
y = data['remaining_amount']  # Assuming this is the target variable

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model (optional)
score = model.score(X_test, y_test)
print("Model R^2 Score: {score:.2f}")

# Save the trained model
with open('models/model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

print("Model training complete and saved to model.pkl")
