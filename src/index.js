const express = require("express");
const { Sequelize } = require("sequelize");

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const db = require("./models/index");

const app = express();

const prepareAndStartServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      dialectOptions: config.dialectOptions,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.use("/authservice/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server Started Successfully at ${PORT} .`);
    if (DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

prepareAndStartServer();
