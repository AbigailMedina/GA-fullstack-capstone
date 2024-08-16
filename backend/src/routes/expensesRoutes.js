const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // READ all expenses
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM expenses');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // READ 1 expense
  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query('SELECT * FROM expenses where id=$1', [id]);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // CREATE expense
  router.post('/', async (req, res) => {
    const { description, amount, category, date } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO expenses (description, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *',
        [description, amount, category, date]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  //UPDATE EXPENSE
  router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { description, amount, category, date } = req.body
    try {
      const result = await pool.query(
        'UPDATE expenses SET  description=$1,amount=$2,category=$3, date=$4 WHERE id=$5',
        [description, amount, category,date, id]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //DELETE EXPENSE
  router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query(
        'DELETE FROM expenses WHERE id=$1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: `Expense with ID:${id} not found.` });
      }

      res.status(200).json({ message: `Expense with ID:${id} successfully deleted.` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
