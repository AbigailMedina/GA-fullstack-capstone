import React, { useState, useEffect } from 'react';
import { Container, Button, TextField } from '@mui/material';
import ExpensesTable from './ExpensesTable';
import { fetchExpenses, addExpense, deleteExpense, editExpense } from '../services/api';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    getExpenses()
  }, []);

  async function getExpenses() {
    try {
      const expenseData = await fetchExpenses();
      setExpenses(expenseData)
      console.log("expenseData:",expenseData)
    }
    catch (err) {
      console.log(err)
    }
  }
  async function handleDeleteExpense(id) {
    const expenseData = await deleteExpense(id);
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => {
      return exp.id !== id
    }))
    console.log("expenseData:",expenseData)

  }
  async function handleSaveExpense(row) {
    console.log(row)
    await editExpense(row)
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        return expense.id === row.id ? row : expense
      })
    })

  }
  async function handleAddExpense() {
    const newExpense = { description: description, amount: amount, category: category, date:date };
    try {
      console.log("newExpense"+newExpense)
      const response = await addExpense(newExpense);
      console.log("expenses:",expenses)
      setExpenses( [...expenses, response]);
      
      setDescription('');
      setAmount('');
      setCategory('');
      setDate("")
    } catch (err) {
      console.log(err)
    }
  }


  return (

    <Container>

      <h1>Add an expense</h1>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      />
       <TextField
        type="date"
        name="date"
        value={date}
        data-testid="dateinput"
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddExpense} variant="contained" color="primary" data-testid="add-expense">
        Add Expense
      </Button>
      <ExpensesTable
        handleDeleteExpense={handleDeleteExpense}
        handleSaveExpense={handleSaveExpense}
        data={expenses}></ExpensesTable>
    </Container>
  );
}

export default Expenses;
