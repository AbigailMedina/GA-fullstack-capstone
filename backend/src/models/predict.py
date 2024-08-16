# server/models/predict.py
import sys
import pickle
import pandas as pd

# Load model
model_path = 'model.pkl'
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

# Read command line arguments
current_progress = float(sys.argv[1])
goal_amount = float(sys.argv[2])
deadline_days = int(sys.argv[3])
monthly_savings = float(sys.argv[4])

# Prepare input data
input_data = pd.DataFrame({
    'current_progress': [current_progress],
    'goal_amount': [goal_amount],
    'deadline_days': [deadline_days],
    'monthly_savings': [monthly_savings]
})

# Predict
prediction = model.predict(input_data)
print(prediction[0])
