const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./Connections/connections.js");
const app = express();
const cors = require("cors");
const fs = require('fs');
const axios = require('axios');

require("dotenv").config();

const userRoute = require("./Routes/userRoute");
const tokenRoute = require("./Routes/tokenRoute");

// Konzolok, Arcade gépek, Pinball gépek
const consoleRoute = require("./Routes/consoleRoute");
const arcadeMachineRoute = require("./Routes/arcadeMachineRoute");
const pinballMachineRoute = require("./Routes/pinballMachineRoute");

// Cégek
const companyRoutes = require("./Routes/companyRoute");

// Posztok és kommentek (új)
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Eredeti tábla droppolás és szinkronizálás megtartása
sequelize
  .query("DROP TABLE IF EXISTS Advertisements;")
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Addresses;");
  })
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Companies;");
  })
  .then(() => {
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("All tables created successfully!");
  })
  .catch((err) => {
    console.error("Failed to create tables:", err.message);
  });

/*
app.use(
  cors({
    origin: "http://localhost:4200/",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
*/

// Meglévő route-ok
app.use("/users", userRoute);
app.use("/tokens", tokenRoute);

// Konzolok, Arcade gépek, Pinball gépek
app.use("/consoles", consoleRoute);
app.use("/arcade", arcadeMachineRoute);
app.use("/pinball", pinballMachineRoute);

// Cégek
app.use("/companies", companyRoutes);

// Új route-ok posztokhoz és kommentekhez
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

// Json betöltése
const loadJsonData = (filePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Attempting to read file: ${filePath}`);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        reject(`Error reading file at ${filePath}: ${err.message}`);
      } else {
        console.log('Raw file data:', data);  // Log raw file content
        try {
          const jsonData = JSON.parse(data);
          console.log("Admin data:", jsonData.username, jsonData.adminPassword);  // Log the admin data
          console.log("Arcade machines:", jsonData.arcadeMachines);  // Log the arcade machines data
          resolve(jsonData.arcadeMachines);  // Only resolve arcade machines data
        } catch (parseError) {
          console.error(`Error parsing JSON data from ${filePath}:`, parseError);
          reject(`Error parsing JSON data from ${filePath}: ${parseError.message}`);
        }
      }
    });    
  });
};



const sendDataToAPI = async (data, url) => {
  console.log(`Sending data to ${url}:`, data.length);
  try {
    const response = await axios.post(url, data);
    console.log('Data inserted successfully:', response.data);
  } catch (error) {
    console.error(`Error inserting data into ${url}:`, error.message);
  }
};

// gépek autómatikus betöltése
const insertDataIntoDB = async () => {
  try {
    // Load JSON files from the Adatbázis/ folder
    console.log('Loading data from JSON files...');
    
    const consoles = await loadJsonData('../Adatbázis/consoles.json');
    console.log(`Loaded ${consoles.length} consoles from JSON.`);
    
    const arcademachines = await loadJsonData('../Adatbázis/arcademachines.json');
    console.log(`Loaded ${arcademachines.length} arcade machines from JSON.`);
    
    const pinballmachines = await loadJsonData('../Adatbázis/flippermachines.json');
    console.log(`Loaded ${pinballmachines.length} pinball machines from JSON.`);

    // Send data to the corresponding API endpoints
    await sendDataToAPI(consoles, 'http://localhost:3004/consoles/addMultiple');
    await sendDataToAPI(arcademachines, 'http://localhost:3004/arcade/addMultiple');
    await sendDataToAPI(pinballmachines, 'http://localhost:3004/pinball/addMultiple');

    console.log('All data inserted successfully!');
  } catch (error) {
    console.error('Error during data insertion:', error.message);
  }
};
insertDataIntoDB();

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
