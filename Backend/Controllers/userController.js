const {
  Users,
  Token,
  UserMachines,
  ArcadeMachines,
  Consoles,
  PinballMachines,
} = require("../Models/index");
const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const connections = require("../Connections/connections");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "1234";

const isAdmin = (req) => {
  const { username, adminPassword } = req.body;
  return username === "admin" && adminPassword === "admin";
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.fetcherror,
      üzenet: uzn.user.failure.fetcherror,
    });
  }
};

const getUser = async (req, res) => {
  const { userId, email, username } = req.body;

  try {
    let user;
    if (userId) {
      user = await Users.findOne({ where: { userId: userId } });
    } else if (email) {
      user = await Users.findOne({ where: { email } });
    } else if (username) {
      user = await Users.findOne({ where: { username } });
    }

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: msg.user.failure.idnotfound,
        üzenet: uzn.user.failure.idnotfound,
      });
    }

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const registerUser = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const { username, email, passwordHash } = req.body;

    if (!username || !email || !passwordHash) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    console.log("Checking for existing user...");
    const existingUser = await Users.findOne({ where: { email }, transaction });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: msg.user.failure.emailtaken,
        üzenet: msg.user.failure.emailtaken,
      });
    }

    const existingUsername = await Users.findOne({
      where: { username },
      transaction,
    });
    if (existingUsername) {
      return res.status(409).json({
        status: 409,
        message: msg.user.failure.nametaken,
        üzenet: uzn.user.failure.nametaken,
      });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    console.log("Creating new user...");
    const newUser = await Users.create(
      {
        username,
        email,
        passwordHash: hashedPassword,
      },
      { transaction }
    );

    console.log("New user created with ID:", newUser.id);

    await transaction.commit();

    console.log("Transaction committed successfully.");
    res.status(201).json({
      status: 201,
      userId: newUser.id,
      message: msg.user.success.registered,
      üzenet: uzn.user.success.registered,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, email, passwordHash } = req.body;

  if ((!username && !email) || !passwordHash) {
    return res.status(400).json({
      status: 400,
      message: msg.user.failure.loginunfilled,
      üzenet: uzn.user.failure.loginunfilled,
    });
  }

  try {
    const user = await Users.findOne({
      where: email ? { email } : { username },
    });

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: msg.user.failure.logininvalid,
        üzenet: uzn.user.failure.logininvalid,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      passwordHash,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: msg.user.failure.logininvalid,
        üzenet: uzn.user.failure.logininvalid,
      });
    }

    const loginTimestamp = new Date().toISOString();

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        loginAt: loginTimestamp,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await Token.create({
      userId: user.userId,
      token,
      loginAt: loginTimestamp,
      expiresAt,
    });

    res.status(200).json({
      status: 200,
      userId: user.userId,
      token,
      loginAt: loginTimestamp,
      message: msg.user.success.loggedin,
      üzenet: uzn.user.success.loggedin,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const makeAdmin = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: msg.user.failure.idnotfound,
        üzenet: uzn.user.failure.idnotfound,
      });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({
      status: 200,
      message: msg.user.success.adminUpdated,
      üzenet: uzn.user.success.adminUpdated,
    });
  } catch (error) {
    console.error("Error updating user to admin:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const changeProfile = async (req, res) => {
  const { userId, profile } = req.body;

  try {
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: msg.user.failure.idnotfound,
        üzenet: uzn.user.failure.idnotfound,
      });
    }

    user.profile = profile;
    await user.save();

    res.status(200).json({
      status: 200,
      message: msg.user.success.profileupdated,
      üzenet: uzn.user.success.profileupdated,
    });
  } catch (error) {
    console.error("Error updating user to profile:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    if (isAdmin(req)) {
      const { id, email } = req.body;

      if (email) {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({
            status: 404,
            message: msg.user.failure.emailnotfound,
            üzenet: uzn.user.failure.emailnotfound,
          });
        }

        await user.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.user.success.deleted,
          üzenet: uzn.user.success.deleted,
        });
      } else if (id) {
        const user = await Users.findOne({ where: { id } });
        if (!user) {
          return res.status(404).json({
            status: 404,
            message: msg.user.failure.idnotfound,
            üzenet: uzn.user.failure.idnotfound,
          });
        }

        await user.destroy();
        return res.status(200).json({
          status: 200,
          message: msg.user.success.deleted,
          üzenet: uzn.user.success.deleted,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: msg.user.failure.idoremail,
          üzenet: uzn.user.failure.idoremail,
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
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const updateUser = async (req, res) => {
  const { userId, name, profile, age, phoneNumber } = req.body;

  try {
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: msg.user.failure.idnotfound,
        üzenet: uzn.user.failure.idnotfound,
      });
    }

    await user.update({
      name: name !== undefined ? name : user.name,
      age: age !== undefined ? age : user.age,
      profile: profile !== undefined ? profile : user.profile,
      phoneNumber: phoneNumber !== undefined ? phoneNumber : user.phoneNumber,
    });

    res.status(200).json({
      status: 200,
      message: msg.user.success.updated,
      üzenet: uzn.user.success.updated,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const addMachineToUser = async (req, res) => {
  const { userId, name, machineType } = req.body;

  if (!userId || !name || !machineType) {
    return res.status(400).json({
      status: 400,
      message: msg.user.failure.mfieldmissing,
      üzenet: uzn.user.failure.mfieldmissing,
    });
  }

  try {
    let machineExists = false;

    switch (machineType) {
      case "ArcadeMachine":
        machineExists = await ArcadeMachines.findOne({ where: { name } });
        break;
      case "Console":
        machineExists = await Consoles.findOne({ where: { name } });
        break;
      case "PinballMachine":
        machineExists = await PinballMachines.findOne({ where: { name } });
        break;
      default:
        return res.status(400).json({
          status: 400,
          message: msg.user.failure.invalidType,
          üzenet: uzn.user.failure.invalidType,
        });
    }

    if (!machineExists) {
      return res.status(404).json({
        status: 404,
        message: msg.user.failure.machinenotfound,
        üzenet: uzn.user.failure.machinenotfound,
      });
    }

    const existingEntry = await UserMachines.findOne({
      where: { userId, name, machineType },
    });

    if (existingEntry) {
      return res.status(409).json({
        status: 409,
        message: msg.user.failure.machineexists,
        üzenet: uzn.user.failure.machineexists,
      });
    }

    const userMachine = await UserMachines.create({
      userId,
      name,
      machineType,
    });

    res.status(201).json({
      status: 201,
      message: msg.user.success.machineadded,
      üzenet: uzn.user.success.machineadded,
      userMachine,
    });
  } catch (error) {
    console.error("Error adding machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

const getUserMachines = async (req, res) => {
  try {
    const userMachines = await UserMachines.findAll({
      where: { userId: req.params.id },
      attributes: ["name", "machineType"],
    });

    const machineGroups = {
      ArcadeMachine: [],
      Console: [],
      PinballMachine: [],
    };

    userMachines.forEach(({ name, machineType }) => {
      machineGroups[machineType].push(name);
    });

    const [arcadeMachines, consoles, pinballMachines] = await Promise.all([
      machineGroups.ArcadeMachine.length
        ? ArcadeMachines.findAll({
            where: { name: machineGroups.ArcadeMachine },
          })
        : [],
      machineGroups.Console.length
        ? Consoles.findAll({ where: { name: machineGroups.Console } })
        : [],
      machineGroups.PinballMachine.length
        ? PinballMachines.findAll({
            where: { name: machineGroups.PinballMachine },
          })
        : [],
    ]);

    res.status(200).json({
      status: 200,
      machines: { arcadeMachines, consoles, pinballMachines },
    });
  } catch (error) {
    console.error("Error fetching user machines:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.machinefetcherror,
      üzenet: uzn.user.failure.machinefetcherror,
    });
  }
};

const removeMachineFromUser = async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({
      status: 400,
      message: msg.user.failure.machineunfilled,
      üzenet: uzn.user.failure.machineunfilled,
    });
  }

  try {
    const deleted = await UserMachines.destroy({
      where: { userId, name },
    });

    if (deleted) {
      res.status(200).json({
        status: 200,
        message: msg.user.success.machineremoved,
        üzenet: uzn.user.success.machineremoved,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: msg.user.failure.machinenotfound,
        üzenet: uzn.user.failure.machinenotfound,
      });
    }
  } catch (error) {
    console.error("Error removing machine:", error);
    res.status(500).json({
      status: 500,
      message: msg.user.failure.unknown,
      üzenet: uzn.user.failure.unknown,
    });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  registerUser,
  loginUser,
  removeUser,
  makeAdmin,
  changeProfile,
  updateUser,
  addMachineToUser,
  getUserMachines,
  removeMachineFromUser,
};
