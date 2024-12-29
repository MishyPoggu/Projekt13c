const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./Connections/connections.js');
const app = express();
const cors = require('cors');
require("dotenv").config();

const userRoute = require('./Routes/userRoute');
const tokenRoute = require('./Routes/tokenRoute');

// Consoles, Arcade Machines, Pinball Machines
const consoleRoute = require('./Routes/consoleRoute');

app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log('All tables created successfully!');
  })
  .catch(err => {
    console.error('Failed to create tables:', err.message);
  });

app.use(cors(
    {
        origin: "http://localhost:4200/", 
        methods: "GET, POST, PUT, DELETE", 
        credentials: true 
    }
));

// Test
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', userRoute);
app.use('/tokens', tokenRoute);

// Consoles, Arcade Machines, Pinball Machines
app.use('/consoles', consoleRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
