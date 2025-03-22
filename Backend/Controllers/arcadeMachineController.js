const { ArcadeMachines } = require("../Models/index");
const connections = require("../Connections/connections");

const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const isAdmin = (req) => {
  const { username, adminPassword } = req.body;
  return username === "admin" && adminPassword === "admin";
};

const getAllArcadeMachines = async (req, res) => {
  try {
    const arcade = await ArcadeMachines.findAll();
    res.status(200).json({
      status: 200,
      data: arcade,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: msg.arcade.failure.fetcherror,
      üzenet: uzn.arcade.failure.fetcherror,
    });
  }
};

const addArcadeMachine = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    if (!name || !release || !genre || !publisher) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    console.log("Checking for existing arcade machine...");
    const existingName = await ArcadeMachines.findOne({
      where: { name },
      transaction,
    });
    if (existingName) {
      return res.status(409).json({
        status: 409,
        message: msg.arcade.failure.nametaken,
        üzenet: uzn.arcade.failure.nametaken,
      });
    }

    console.log("Creating new arcade machine...");
    const newArcadeMachine = await ArcadeMachines.create(
      {
        name,
        release,
        genre,
        publisher,
      },
      { transaction }
    );

    console.log("New arcade machine created with ID:", newArcadeMachine.id);

    await transaction.commit();

    console.log("Transaction committed successfully.");
    res.status(201).json({
      status: 201,
      arcadeMachineId: newArcadeMachine.id,
      message: msg.arcade.success.added,
      üzenet: uzn.arcade.success.added,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.arcade.failure.unknown,
      üzenet: uzn.arcade.failure.unknown,
    });
  }
};

const updateArcadeMachine = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    if (isAdmin(req)) {
      const { id, name, release, genre, publisher } = req.body;

      if (!id) {
        return res.status(400).json({
          status: 400,
          message: msg.arcade.failure.idrequired,
          üzenet: uzn.arcade.failure.idrequired,
        });
      }

      console.log("Fetching existing arcade machine...");
      const existingArcadeMachine = await ArcadeMachines.findByPk(id, {
        transaction,
      });

      if (!existingArcadeMachine) {
        return res.status(404).json({
          status: 404,
          message: msg.arcade.failure.notfound,
          üzenet: uzn.arcade.failure.notfound,
        });
      }

      console.log("Validating new name if provided...");
      if (name) {
        const conflictingArcade = await ArcadeMachines.findOne({
          where: { name },
          transaction,
        });

        if (conflictingArcade && conflictingArcade.id !== id) {
          return res.status(409).json({
            status: 409,
            message: msg.arcade.failure.nametaken,
            üzenet: uzn.arcade.failure.nametaken,
          });
        }
      }

      console.log("Updating arcade machine with provided fields...");
      const fieldsToUpdate = {};

      if (name) fieldsToUpdate.name = name;
      if (release) fieldsToUpdate.release = release;
      if (genre) fieldsToUpdate.genre = genre;
      if (publisher) fieldsToUpdate.publisher = publisher;

      await existingArcadeMachine.update(fieldsToUpdate, { transaction });

      await transaction.commit();

      console.log("Arcade Machine updated successfully.");
      res.status(200).json({
        status: 200,
        arcadeMachineId: existingArcadeMachine.id,
        message: msg.arcade.success.updated,
        üzenet: uzn.arcade.success.updated,
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
      message: msg.arcade.failure.unknown,
      üzenet: uzn.arcade.failure.unknown,
    });
  }
};

const addArcadeMachines = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { arcadeMachines } = req.body;

    if (
      !arcadeMachines ||
      !Array.isArray(arcadeMachines) ||
      arcadeMachines.length === 0
    ) {
      return res.status(400).json({
        status: 400,
        message: msg.arcade.failure.invalidformat,
        üzenet: uzn.arcade.failure.invalidformat,
      });
    }

    for (const arcadeData of arcadeMachines) {
      const { name, release, genre, publisher } = arcadeData;

      if (!name || !release || !publisher) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: msg.arcade.failure.unfilled,
          üzenet: uzn.arcade.failure.unfilled,
        });
      }

      console.log(`Checking for existing arcade machine with name: ${name}...`);
      const existingArcade = await ArcadeMachines.findOne({
        where: { name },
        transaction,
      });
      if (existingArcade) {
        await transaction.rollback();
        return res.status(409).json({
          status: 409,
          message: msg.arcade.failure.thisnametaken(name),
          üzenet: uzn.arcade.failure.thisnametaken(name),
        });
      }

      console.log(`Creating arcade machine: ${name}...`);
      await ArcadeMachines.create(
        { name, release, genre, publisher },
        { transaction }
      );
    }

    console.log("All arcade machines added successfully.");
    await transaction.commit();

    res.status(201).json({
      status: 201,
      message: msg.arcade.success.addedall,
      üzenet: uzn.arcade.success.addedall,
    });
  } catch (error) {
    console.error("Error adding arcade machines:", error);
    res.status(500).json({
      status: 500,
      message: msg.arcade.failure.unknown,
      üzenet: uzn.arcade.failure.unknown,
    });
  }
};

const removeArcadeMachine = async (req, res) => {
  try {
    if (isAdmin(req)) {
      const { id, name } = req.body;

      if (name) {
        const arcadeMachine = await ArcadeMachines.findOne({ where: { name } });
        if (!arcadeMachine) {
          return res.status(404).json({
            status: 404,
            message: msg.arcade.failure.namenotfound,
            üzenet: uzn.arcade.failure.namenotfound,
          });
        }

        await arcadeMachine.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.arcade.success.deleted,
          üzenet: uzn.arcade.success.deleted,
        });
      } else if (id) {
        const arcadeMachine = await ArcadeMachines.findOne({ where: { id } });
        if (!arcadeMachine) {
          return res.status(404).json({
            status: 404,
            message: msg.arcade.failure.idnotfound,
            üzenet: uzn.arcade.failure.idnotfound,
          });
        }

        await arcadeMachine.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.arcade.success.deleted,
          üzenet: uzn.arcade.success.deleted,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: msg.arcade.failure.idorname,
          üzenet: uzn.arcade.failure.idorname,
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
    console.error("Error deleting arcade machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.arcade.failure.unknown,
      üzenet: uzn.arcade.failure.unknown,
    });
  }
};

const getArcadeMachine = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (name) {
      const arcade = await ArcadeMachines.findOne({ where: { name } });
      if (!arcade) {
        return res.status(404).json({
          status: 404,
          message: msg.arcade.failure.namenotfound,
          üzenet: uzn.arcade.failure.namenotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: console,
      });
    } else if (id) {
      const arcade = await ArcadeMachines.findOne({ where: { id } });
      if (!arcade) {
        return res.status(404).json({
          status: 404,
          message: msg.arcade.failure.idnotfound,
          üzenet: uzn.arcade.failure.idnotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: arcade,
      });
    }
  } catch (error) {
    console.error("Error getting arcade machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.arcade.failure.fetcherror,
      üzenet: uzn.arcade.failure.fetcherror,
    });
  }
};

module.exports = {
  getAllArcadeMachines,
  getArcadeMachine,
  addArcadeMachine,
  updateArcadeMachine,
  addArcadeMachines,
  removeArcadeMachine,
};
