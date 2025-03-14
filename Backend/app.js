const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./Connections/connections.js");
const app = express();
const cors = require("cors");
const adminRoute = require("./Routes/adminRoute");

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
app.use("/admins", adminRoute);
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

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});