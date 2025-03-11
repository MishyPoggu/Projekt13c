const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./Connections/connections.js");
const app = express();
const cors = require("cors");
const adminRoute = require("./Routes/adminRoute");

require("dotenv").config();

const userRoute = require("./Routes/userRoute");
const tokenRoute = require("./Routes/tokenRoute");

// Konzolok, Arcade gépek, pinball gépek
const consoleRoute = require("./Routes/consoleRoute");
const arcadeMachineRoute = require("./Routes/arcadeMachineRoute");
const pinballMachineRoute = require("./Routes/pinballMachineRoute");

// Cégek
const companyRoutes = require("./Routes/companyRoute");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

sequelize
  .query("DROP TABLE IF EXISTS Advertisements;")
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Addresses;");
  })
  .then(() => {
    return sequelize.query("DROP TABLE IF EXISTS Companies;");
  })

  .then(() => {
    return sequelize.sync({ force: true });
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
);*/

app.use("/users", userRoute);
app.use("/admins", adminRoute);
app.use("/tokens", tokenRoute);

// Konzolok, Arcade gépek, Pinball gépek
app.use("/consoles", consoleRoute);
app.use("/arcade", arcadeMachineRoute);
app.use("/pinball", pinballMachineRoute);

// Cégek
app.use("/companies", companyRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
