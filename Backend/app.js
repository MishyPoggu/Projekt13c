const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
// require("dotenv").config();

app.use(cors(
    {
      origin: "http://localhost:4200/", 
      methods: "GET, POST, PUT, DELETE", 
      credentials: true 
    }
  ));

const userRoute = require("./Routes/userRoute");

// Test
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
