
// // TO RUN YOUR SERVER LOCALLY, USE THIS POOL VARIABLE
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost", // MAKE SURE YOU CHANGE THE HOST FOR YOUR DOCKER IMAGE
//   database: "capstone_db",
//   password: "postgres", // FOR DOCKER - CHANGE THIS TO DOCKER
//   port: 5432,
// });

// // TO BUILD YOUR DOCKER IMAGE, USE THIS POOL VARIABLE INSTEAD
// // const pool = new Pool({
// //   user: "postgres",
// //   host: "db-container", // WE'VE CHANGED THE HOST NAME
// //   database: "capstone_db",
// //   password: "docker", // CHANGED PASSWORD TO DOCKER
// //   port: 5432,
// // });

const express = require('express');
const { Pool } = require('pg');
const expensesRoutes = require('./src/routes/expensesRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());

// PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'budget_capstone_app',
//   password: 'password',
//   port: 5432,
// });
const pool = new Pool({
  user: 'postgres',
  host: 'db-container',
  database: 'budget_capstone_app',
  password: 'password',
  port: 5432,
});

app.use('/api/expenses', expensesRoutes(pool));
app.use('/api/goals', goalRoutes(pool));
// app.use('/predict', predictionRoutes);
app.get("/",(req,res)=>{
  res.send("Hi There, budgeter");
})

app.get("/*",(req,res)=>{
  res.send("Go to a real endpoint, silly");
})


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



module.exports = { app, server };
