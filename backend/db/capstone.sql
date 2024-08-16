DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS goals;

CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS goals (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)  NOT NULL,
  amount NUMERIC NOT NULL,
  deadline DATE NOT NULL,
  progress DECIMAL(5, 2) DEFAULT 0.00
);
INSERT INTO goals (description, amount, deadline, progress) VALUES
('Save for vacation', 5000.00, '2024-12-31',10.00),
('Pay off student loan', 20000.00, '2025-06-30',99.99),
('Emergency fund', 10000.00, '2024-09-15',50.00),
('Buy new laptop', 1200.00, '2024-05-01', 00.00),
('Wedding', 30000.00, '2025-03-31', 90.00);

INSERT INTO expenses (description, amount, category, date) VALUES
('Groceries at Target', 85.00, 'Food', '2024-07-05'),
('Dinner at local Italian restaurant', 45.00, 'Dining', '2024-07-08'),
('Monthly subway pass', 127.00, 'Transportation', '2024-07-01'),
('Coffee shop visit', 4.50, 'Food', '2024-07-10'),
('New yoga mat', 40.00, 'Health & Fitness', '2024-07-12'),
('Grocery delivery fee', 15.00, 'Food', '2024-07-15'),
('Rent payment', 2500.00, 'Housing', '2024-07-01'),
('Electric bill', 75.00, 'Utilities', '2024-07-03'),
('Netflix subscription', 15.99, 'Entertainment', '2024-07-04'),
('Book purchase', 22.00, 'Education', '2024-07-07'),
('Monthly gym membership', 50.00, 'Health & Fitness', '2024-07-05'),
('Dinner with friends', 60.00, 'Dining', '2024-07-18'),
('Weekly cleaning service', 100.00, 'Household', '2024-07-06'),
('Online streaming service', 12.99, 'Entertainment', '2024-07-09'),
('Haircut and styling', 60.00, 'Personal Care', '2024-07-11'),
('Office supplies', 25.00, 'Work', '2024-07-13'),
('New phone case', 20.00, 'Personal Care', '2024-07-14'),
('Lunch at work', 12.00, 'Food', '2024-07-16'),
('Laundry service', 30.00, 'Household', '2024-07-20'),
('Birthday gift for friend', 45.00, 'Gifts', '2024-07-22'),
('Art supplies', 30.00, 'Hobbies', '2024-07-23'),
('Dinner delivery', 35.00, 'Food', '2024-07-24'),
('Monthly internet bill', 60.00, 'Utilities', '2024-07-25'),
('Concert tickets', 120.00, 'Entertainment', '2024-07-26'),
('Transportation ride share', 20.00, 'Transportation', '2024-07-27'),
('Brunch with friends', 50.00, 'Dining', '2024-07-28'),
('Weekend getaway accommodation', 200.00, 'Travel', '2024-07-30'),
('Books for study', 40.00, 'Education', '2024-07-31'),
('Personal training session', 70.00, 'Health & Fitness', '2024-07-21'),
('Dinner party supplies', 25.00, 'Food', '2024-07-26'),
('Phone bill', 85.00, 'Utilities', '2024-07-15'),
('Emergency medical visit', 150.00, 'Health & Fitness', '2024-07-18');


INSERT INTO expenses (description, amount, category, date) VALUES
('Groceries at Whole Foods', 90.00, 'Food', '2024-08-02'),
('Dinner at new Mexican restaurant', 50.00, 'Dining', '2024-08-04'),
('Monthly subway pass', 127.00, 'Transportation', '2024-08-01'),
('Coffee shop visit', 5.00, 'Food', '2024-08-03'),
('Fitness class membership', 80.00, 'Health & Fitness', '2024-08-05'),
('Grocery delivery fee', 18.00, 'Food', '2024-08-06'),
('Rent payment', 2500.00, 'Housing', '2024-08-01'),
('Electric bill', 80.00, 'Utilities', '2024-08-02'),
('Netflix subscription', 15.99, 'Entertainment', '2024-08-04'),
('Book purchase', 25.00, 'Education', '2024-08-07'),
('Monthly gym membership', 50.00, 'Health & Fitness', '2024-08-05'),
('Dinner with colleagues', 55.00, 'Dining', '2024-08-08'),
('Weekly cleaning service', 100.00, 'Household', '2024-08-07'),
('Online streaming service', 12.99, 'Entertainment', '2024-08-09'),
('Haircut and styling', 65.00, 'Personal Care', '2024-08-10'),
('Office supplies', 30.00, 'Work', '2024-08-11'),
('Phone case replacement', 25.00, 'Personal Care', '2024-08-12'),
('Lunch at work', 15.00, 'Food', '2024-08-09'),
('Laundry service', 35.00, 'Household', '2024-08-13'),
('Birthday gift for coworker', 50.00, 'Gifts', '2024-08-14'),
('Art supplies', 35.00, 'Hobbies', '2024-08-12'),
('Dinner delivery', 40.00, 'Food', '2024-08-11'),
('Monthly internet bill', 65.00, 'Utilities', '2024-08-10'),
('Concert tickets', 130.00, 'Entertainment', '2024-08-12'),
('Transportation ride share', 25.00, 'Transportation', '2024-08-13'),
('Brunch with family', 55.00, 'Dining', '2024-08-15'),
('Books for study', 45.00, 'Education', '2024-08-14'),
('Personal training session', 75.00, 'Health & Fitness', '2024-08-13'),
('Dinner party supplies', 30.00, 'Food', '2024-08-14'),
('Phone bill', 90.00, 'Utilities', '2024-08-10'),
('Emergency medical follow-up visit', 160.00, 'Health & Fitness', '2024-08-08');

INSERT INTO expenses (description, amount, category, date) VALUES
-- July savings
('Save for vacation', 150.00, 'Savings', '2024-07-05'),
('Pay off student loan', 200.00, 'Savings', '2024-07-10'),
('Emergency fund', 300.00, 'Savings', '2024-07-15'),

-- August savings
('Buy new laptop', 150.00, 'Savings', '2024-08-02'),
('Wedding', 500.00, 'Savings', '2024-08-08'),
('Save for vacation', 200.00, 'Savings', '2024-08-14'),

--Income
('Paycheck', 3000, 'Income', '2024-07-01'),
('Paycheck', 3000, 'Income', '2024-07-15'),
('Paycheck', 3000, 'Income', '2024-08-15'),
('Paycheck', 3000, 'Income', '2024-08-15');