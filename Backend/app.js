const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./Connections/connections.js");
const app = express();
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

require("dotenv").config();

const userRoute = require("./Routes/userRoute");
const tokenRoute = require("./Routes/tokenRoute");
const consoleRoute = require("./Routes/consoleRoute");
const arcadeMachineRoute = require("./Routes/arcadeMachineRoute");
const pinballMachineRoute = require("./Routes/pinballMachineRoute");
const companyRoutes = require("./Routes/companyRoute");
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");

// Import the CompanyMachines model to ensure it's part of the schema
const CompanyMachines = require("./Models/companyMachines");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize
  .query("DROP TABLE IF EXISTS Advertisements;")
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Addresses;");
  })
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Companies;");
  })
  .then(() => {
    console.log("Dropping foreign key usermachines_ibfk_2...");
    return sequelize.query(
      "ALTER TABLE usermachines DROP FOREIGN KEY usermachines_ibfk_2;"
    );
  })
  .then(() => {
    // Sync all models, including the new CompanyMachines table
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("All tables created successfully, including CompanyMachines!");
  })
  .catch((err) => {
    console.error("Failed to create tables:", err.message);
  });

app.use("/users", userRoute);
app.use("/tokens", tokenRoute);
app.use("/consoles", consoleRoute);
app.use("/arcade", arcadeMachineRoute);
app.use("/pinball", pinballMachineRoute);
app.use("/companies", companyRoutes);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

const loadJsonData = (filePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Attempting to read file: ${filePath}`);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        return reject(`Error reading file: ${err.message}`);
      }
      try {
        const jsonData = JSON.parse(data);
        console.log("Raw file data:", jsonData);
        let key;
        if (filePath.includes("consoles")) key = "consoles";
        else if (filePath.includes("arcademachines")) key = "arcadeMachines";
        else if (filePath.includes("flippermachines")) key = "pinballMachines";
        else return reject(`Unknown JSON format in file: ${filePath}`);
        if (!jsonData[key]) return reject(`Key "${key}" not found in ${filePath}`);
        console.log(`Loaded ${jsonData[key].length} items from ${filePath}`);
        resolve(jsonData[key]);
      } catch (parseError) {
        console.error(`Error parsing JSON from ${filePath}:`, parseError);
        reject(`Error parsing JSON: ${parseError.message}`);
      }
    });
  });
};

const sendDataToAPI = async (data, url) => {
  console.log(`Sending data to ${url}:`, data.length);
  try {
    const response = await axios.put(url, data);
    console.log("Data inserted successfully:", response.data);
  } catch (error) {
    console.error(`Error inserting data into ${url}:`, error.message);
  }
};

const insertDataIntoDB = async () => {
  try {
    console.log("Loading data from JSON files...");
    const consoles = await loadJsonData("../Adatbázis/consoles.json");
    console.log(`Loaded ${consoles.length} consoles from JSON.`);
    const arcademachines = await loadJsonData("../Adatbázis/arcademachines.json");
    console.log(`Loaded ${arcademachines.length} arcade machines from JSON.`);
    const pinballmachines = await loadJsonData("../Adatbázis/flippermachines.json");
    console.log(`Loaded ${pinballmachines.length} pinball machines from JSON.`);

    await sendDataToAPI({ consoles }, "http://localhost:3004/consoles/addMultiple");
    await sendDataToAPI({ arcadeMachines: arcademachines }, "http://localhost:3004/arcade/addMultiple");
    await sendDataToAPI({ pinballMachines: pinballmachines }, "http://localhost:3004/pinball/addMultiple");

    console.log("All data inserted successfully!");
  } catch (error) {
    console.error("Error during data insertion:", error.message);
  }
};

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  insertDataIntoDB();
});