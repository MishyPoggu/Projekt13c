const { PinballMachines } = require("../Models/index");
const connections = require("../Connections/connections");

const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const getAllPinballMachines = async (req, res) => {
  try {
    const pinballs = await PinballMachines.findAll();
    res.status(200).json({
      status: 200,
      data: pinballs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.fetcherror,
      üzenet: uzn.pinball.failure.fetcherror,
    });
  }
};

const addPinballMachine = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { name, release, publisher } = req.body;

    if (!name || !release || !publisher) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    console.log("Checking for existing pinball machine...");
    const existingName = await PinballMachines.findOne({
      where: { name },
      transaction,
    });
    if (existingName) {
      return res.status(409).json({
        status: 409,
        message: msg.pinball.failure.nametaken,
        üzenet: uzn.pinball.failure.nametaken,
      });
    }

    console.log("Creating new pinball machine...");
    const newPinballMachine = await PinballMachines.create(
      {
        name,
        release,
        publisher,
      },
      { transaction }
    );

    console.log("New pinball machine created with ID:", newPinballMachine.id);

    await transaction.commit();

    console.log("Transaction committed successfully.");
    res.status(201).json({
      status: 201,
      pinballId: newPinballMachine.id,
      message: msg.pinball.success.added,
      üzenet: uzn.pinball.success.added,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.unknown,
      üzenet: uzn.pinball.failure.unknown,
    });
  }
};

const updatePinballMachine = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { id, name, release, publisher } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: msg.pinball.failure.idrequired,
        üzenet: uzn.pinball.failure.idrequired,
      });
    }

    console.log("Fetching existing pinball machine...");
    const existingPinballMachine = await PinballMachines.findByPk(id, {
      transaction,
    });

    if (!existingPinballMachine) {
      return res.status(404).json({
        status: 404,
        message: msg.pinball.failure.notfound,
        üzenet: uzn.pinball.failure.notfound,
      });
    }

    console.log("Validating new name if provided...");
    if (name) {
      const conflictingPinballMachine = await PinballMachines.findOne({
        where: { name },
        transaction,
      });

      if (conflictingPinballMachine && conflictingPinballMachine.id !== id) {
        return res.status(409).json({
          status: 409,
          message: msg.pinball.failure.nametaken,
          üzenet: uzn.pinball.failure.nametaken,
        });
      }
    }

    console.log("Updating pinball machine with provided fields...");
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = name;
    if (release) fieldsToUpdate.release = release;
    if (publisher) fieldsToUpdate.publisher = publisher;

    await existingPinballMachine.update(fieldsToUpdate, { transaction });

    await transaction.commit();

    console.log("Pinball machine updated successfully.");
    res.status(200).json({
      status: 200,
      pinballId: existingPinballMachine.id,
      message: msg.pinball.success.updated,
      üzenet: uzn.pinball.success.updated,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.unknown,
      üzenet: uzn.pinball.failure.unknown,
    });
  }
};

const addPinballMachines = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { pinballMachines } = req.body;

    if (
      !pinballMachines ||
      !Array.isArray(pinballMachines) ||
      pinballMachines.length === 0
    ) {
      return res.status(400).json({
        status: 400,
        message: msg.pinball.failure.invalidformat,
        üzenet: uzn.pinball.failure.invalidformat,
      });
    }

    for (const pinballData of pinballMachines) {
      const { name, release, publisher } = pinballData;

      if (!name || !release || !publisher) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: msg.pinball.failure.unfilled,
          üzenet: uzn.pinball.failure.unfilled,
        });
      }

      console.log(
        `Checking for existing pinball machine with name: ${name}...`
      );
      const existingPinballMachine = await PinballMachines.findOne({
        where: { name },
        transaction,
      });
      if (existingPinballMachine) {
        await transaction.rollback();
        return res.status(409).json({
          status: 409,
          message: msg.pinball.failure.thisnametaken(name),
          üzenet: uzn.pinball.failure.thisnametaken(name),
        });
      }

      console.log(`Creating pinball machine: ${name}...`);
      await PinballMachines.create(
        { name, release, publisher },
        { transaction }
      );
    }

    console.log("All pinball machines added successfully.");
    await transaction.commit();

    res.status(201).json({
      status: 201,
      message: msg.pinball.success.addedall,
      üzenet: uzn.pinball.success.addedall,
    });
  } catch (error) {
    console.error("Error adding pinball machines:", error);
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.unknown,
      üzenet: uzn.pinball.failure.unknown,
    });
  }
};

const removePinballMachine = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (name) {
      const pinball = await PinballMachines.findOne({ where: { name } });
      if (!pinball) {
        return res.status(404).json({
          status: 404,
          message: msg.pinball.failure.namenotfound,
          üzenet: uzn.pinball.failure.namenotfound,
        });
      }

      await pinball.destroy();
      return res.status(200).json({
        status: 200,
        message: msg.pinball.success.deleted,
        üzenet: uzn.pinball.success.deleted,
      });
    } else if (id) {
      const pinball = await PinballMachines.findOne({ where: { id } });
      if (!pinball) {
        return res.status(404).json({
          status: 404,
          message: msg.pinball.failure.idnotfound,
          üzenet: uzn.pinball.failure.idnotfound,
        });
      }

      await pinball.destroy();
      return res.status(200).json({
        status: 200,
        message: msg.pinball.success.deleted,
        üzenet: uzn.pinball.success.deleted,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: msg.pinball.failure.idorname,
        üzenet: uzn.pinball.failure.idorname,
      });
    }
  } catch (error) {
    console.error("Error deleting pinball machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.unknown,
      üzenet: uzn.pinball.failure.unknown,
    });
  }
};

const getPinballMachine = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (name) {
      const pinball = await PinballMachines.findOne({ where: { name } });
      if (!pinball) {
        return res.status(404).json({
          status: 404,
          message: msg.pinball.failure.namenotfound,
          üzenet: uzn.pinball.failure.namenotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: pinball,
      });
    } else if (id) {
      const pinball = await PinballMachines.findOne({ where: { id } });
      if (!pinball) {
        return res.status(404).json({
          status: 404,
          message: msg.pinball.failure.idnotfound,
          üzenet: uzn.pinball.failure.idnotfound,
        });
      }

      return res.status(200).json({
        status: 200,
        data: pinball,
      });
    }
  } catch (error) {
    console.error("Error getting pinball machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.pinball.failure.fetcherror,
      üzenet: uzn.pinball.failure.fetcherror,
    });
  }
};

module.exports = {
  getAllPinballMachines,
  getPinballMachine,
  addPinballMachine,
  updatePinballMachine,
  addPinballMachines,
  removePinballMachine,
};
