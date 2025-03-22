const { Consoles } = require("../Models/index");
const connections = require("../Connections/connections");

const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const isAdmin = (req) => {
  const { username, adminPassword } = req.body;
  return username === "admin" && adminPassword === "admin";
};

const getAllConsoles = async (req, res) => {
  try {
    const consoles = await Consoles.findAll();
    res.status(200).json({
      status: 200,
      data: consoles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: msg.console.failure.fetcherror,
      üzenet: uzn.console.failure.fetcherror,
    });
  }
};

const addConsole = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    if (!name || !release || !publisher) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    console.log("Checking for existing console...");
    const existingName = await Consoles.findOne({
      where: { name },
      transaction,
    });
    if (existingName) {
      return res.status(409).json({
        status: 409,
        message: msg.console.failure.nametaken,
        üzenet: uzn.console.failure.nametaken,
      });
    }

    console.log("Creating new console...");
    const newConsole = await Consoles.create(
      {
        name,
        release,
        publisher,
      },
      { transaction }
    );

    console.log("New console created with ID:", newConsole.id);

    await transaction.commit();

    console.log("Transaction committed successfully.");
    res.status(201).json({
      status: 201,
      consoleId: newConsole.id,
      message: msg.console.success.added,
      üzenet: uzn.console.success.added,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.console.failure.unknown,
      üzenet: uzn.console.failure.unknown,
    });
  }
};

const updateConsole = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    if (isAdmin(req)) {
      const { id, name, release, publisher } = req.body;

      if (!id) {
        return res.status(400).json({
          status: 400,
          message: msg.console.failure.idrequired,
          üzenet: uzn.console.failure.idrequired,
        });
      }

      console.log("Fetching existing console...");
      const existingConsole = await Consoles.findByPk(id, { transaction });

      if (!existingConsole) {
        return res.status(404).json({
          status: 404,
          message: msg.console.failure.notfound,
          üzenet: uzn.console.failure.notfound,
        });
      }

      console.log("Validating new name if provided...");
      if (name) {
        const conflictingConsole = await Consoles.findOne({
          where: { name },
          transaction,
        });

        if (conflictingConsole && conflictingConsole.id !== id) {
          return res.status(409).json({
            status: 409,
            message: msg.console.failure.nametaken,
            üzenet: uzn.console.failure.nametaken,
          });
        }
      }

      console.log("Updating console with provided fields...");
      const fieldsToUpdate = {};

      if (name) fieldsToUpdate.name = name;
      if (release) fieldsToUpdate.release = release;
      if (publisher) fieldsToUpdate.publisher = publisher;

      await existingConsole.update(fieldsToUpdate, { transaction });

      await transaction.commit();

      console.log("Console updated successfully.");
      res.status(200).json({
        status: 200,
        consoleId: existingConsole.id,
        message: msg.console.success.updated,
        üzenet: uzn.console.success.updated,
      });
    } else {
      return res.status(403).json({
        status: 403,
        message: msg.admin.failure.unauthorized,
        üzenet: uzn.admin.failure.unauthorized,
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.console.failure.unknown,
      üzenet: uzn.console.failure.unknown,
    });
  }
};

const addConsoles = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { consoles } = req.body;

    if (!consoles || !Array.isArray(consoles) || consoles.length === 0) {
      return res.status(400).json({
        status: 400,
        message: msg.console.failure.invalidformat,
        üzenet: uzn.console.failure.invalidformat,
      });
    }

    for (const consoleData of consoles) {
      const { name, release, publisher } = consoleData;

      if (!name || !release || !publisher) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: msg.console.failure.unfilled,
          üzenet: uzn.console.failure.unfilled,
        });
      }

      console.log(`Checking for existing console with name: ${name}...`);
      const existingConsole = await Consoles.findOne({
        where: { name },
        transaction,
      });
      if (existingConsole) {
        await transaction.rollback();
        return res.status(409).json({
          status: 409,
          message: msg.console.failure.thisnametaken(name),
          üzenet: uzn.console.failure.thisnametaken(name),
        });
      }

      console.log(`Creating console: ${name}...`);
      await Consoles.create({ name, release, publisher }, { transaction });
    }

    console.log("All consoles added successfully.");
    await transaction.commit();

    res.status(201).json({
      status: 201,
      message: msg.console.success.addedall,
      üzenet: uzn.console.success.addedall,
    });
  } catch (error) {
    console.error("Error adding consoles:", error);
    res.status(500).json({
      status: 500,
      message: msg.console.failure.unknown,
      üzenet: uzn.console.failure.unknown,
    });
  }
};

const removeConsole = async (req, res) => {
  try {
    if (isAdmin(req)) {
      const { id, name } = req.body;

      if (name) {
        const console = await Consoles.findOne({ where: { name } });
        if (!console) {
          return res.status(404).json({
            status: 404,
            message: msg.console.failure.namenotfound,
            üzenet: uzn.console.failure.namenotfound,
          });
        }

        await console.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.console.success.deleted,
          üzenet: uzn.console.success.deleted,
        });
      } else if (id) {
        const console = await Consoles.findOne({ where: { id } });
        if (!console) {
          return res.status(404).json({
            status: 404,
            message: msg.console.failure.idnotfound,
            üzenet: uzn.console.failure.idnotfound,
          });
        }

        await console.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.console.success.deleted,
          üzenet: uzn.console.success.deleted,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: msg.console.failure.idorname,
          üzenet: uzn.console.failure.idorname,
        });
      }
    } else {
      return res.status(403).json({
        status: 403,
        message: msg.admin.failure.unauthorized,
        üzenet: uzn.admin.failure.unauthorized,
      });
    }
  } catch (error) {
    console.error("Error deleting console:", error);
    res.status(500).json({
      status: 500,
      message: msg.console.failure.unknown,
      üzenet: uzn.console.failure.unknown,
    });
  }
};

const getConsole = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (name) {
      const console = await Consoles.findOne({ where: { name } });
      if (!console) {
        return res.status(404).json({
          status: 404,
          message: msg.console.failure.namenotfound,
          üzenet: uzn.console.failure.namenotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: console,
      });
    } else if (id) {
      const console = await Consoles.findOne({ where: { id } });
      if (!console) {
        return res.status(404).json({
          status: 404,
          message: msg.console.failure.idnotfound,
          üzenet: uzn.console.failure.idnotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: console,
      });
    }
  } catch (error) {
    console.error("Error getting console:", error);
    res.status(500).json({
      status: 500,
      message: msg.console.failure.fetcherror,
      üzenet: uzn.console.failure.fetcherror,
    });
  }
};

module.exports = {
  getAllConsoles,
  getConsole,
  addConsole,
  updateConsole,
  addConsoles,
  removeConsole,
};
