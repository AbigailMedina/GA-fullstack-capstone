import sendRequest from './send-request';
const BASEURL='api';

export async function getGoals(){
    const response = await sendRequest(`${BASEURL}/goals`,'GET');
    console.log("api.js get goals response: ")
    console.log(response)
    return response
}

export async function fetchExpenses(){
    const response = await sendRequest(`${BASEURL}/expenses`,'GET');
    console.log("api.js get expenses response: ")
    console.log(response)
    return response
}
export async function fetchExpense(id){
    const response = await sendRequest(`${BASEURL}/expenses/${id}`,'GET');
    console.log("api.js get expense response: ")
    console.log(response)
    return response
}
export async function addExpense({description, amount, category, date}){
    const response = await sendRequest(`${BASEURL}/expenses/`,'POST', {"description":description, "amount":amount,"category":category, "date":date});
    console.log("api.js get expense response: ")
    console.log(response)
    return response
}

export async function editExpense({id, description, amount, category, date}){
    const response = await sendRequest(`${BASEURL}/expenses/${id}`,'PUT', {"description":description, "amount":amount,"category":category, "date":date})
    console.log("in api.js editExpense")
    console.log(response)
    return response;
}

export async function deleteExpense(expenseId){
    const response = await sendRequest(`${BASEURL}/expenses/${expenseId}`,'DELETE')
    console.log("in api.js deleteExpense")
    console.log(response)
    return response;
}

// import axios from 'axios';

// // Set up the base URL for axios
// const api = axios.create({
//   baseURL: 'http://localhost:3001', // Adjust this URL to your backend's URL
// });

// // Fetch all expenses
// export const fetchExpenses = () => {
//   return api.get('/api/budget/expenses');
// };

// // Add a new expense
// export const addExpense = (description, amount, category) => {
//   return api.post('/api/budget/expenses', { description, amount, category });
// };


// export function fetchGoals(){
//     app.get('/goals', async (req, res) => {
//         try {
//             const result = await  pool.query('SELECT * FROM FinancialGoals');
//             res.status(200).json(result.rows);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     });
// }


// // Helper function to query the database
// const query = (text, params) => {
//     return pool.query(text, params);
// };

// // Create (POST) a new financial goal
// app.post('/goals', async (req, res) => {
//     const { description, amount, deadline, percent } = req.body;
//     try {
//         const result = await pool.query(
//             'INSERT INTO FinancialGoals (description, amount, deadline, percent) VALUES ($1, $2, $3, $4) RETURNING GoalID',
//             [GoalDescription, TargetAmount, Deadline, ProgressPercent]
//         );
//         res.status(201).json({ id: result.rows[0].goalid });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Read (GET) all financial goals


// // Read (GET) a single financial goal by ID
// app.get('/goals/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await  pool.query('SELECT * FROM FinancialGoals WHERE GoalID = $1', [id]);
//         if (result.rows.length > 0) {
//             res.status(200).json(result.rows[0]);
//         } else {
//             res.status(404).json({ error: 'Goal not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update (PUT) a financial goal by ID
// app.put('/goals/:id', async (req, res) => {
//     const { id } = req.params;
//     const { description, amount, deadline, percent } = req.body;
//     try {
//         const result = await  pool.query(
//             'UPDATE FinancialGoals SET description = $1, amount = $2, deadline = $3, percent = $4 WHERE id = $5 RETURNING id',
//             [description, amount, deadline, percent, id]
//         );
//         if (result.rows.length > 0) {
//             res.status(200).json({ message: 'Goal updated successfully' });
//         } else {
//             res.status(404).json({ error: 'Goal not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete (DELETE) a financial goal by ID
// app.delete('/goals/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await  pool.query('DELETE FROM FinancialGoals WHERE id = $1 RETURNING id', [id]);
//         if (result.rows.length > 0) {
//             res.status(200).json({ message: 'Goal deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'Goal not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });