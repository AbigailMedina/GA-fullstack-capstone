const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // READ all goals
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM goals');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // READ 1 
  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const result = await pool.query('SELECT * FROM goals where id = $1', [id]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // CREATE goal
  router.post('/', async (req, res) => {
    const { description, amount, progress, deadline } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO goals (description, amount, progress, deadline) VALUES ($1, $2, $3, $4) RETURNING *',
        [description, amount, progress, deadline]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //UPDATE GOAL
  router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { description, amount, deadline, progress} = req.body
    try {
      const result = await pool.query(
        'UPDATE goals SET  description=$1,amount=$2,deadline=$3 ,progress=$4 WHERE id=$5',
        [description, amount,  deadline, progress, id]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //DELETE GOAL
  router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const result = await pool.query(
        'DELETE FROM goals WHERE id=$1',
        [id]
      );
      res.status(204).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};


