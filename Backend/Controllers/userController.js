const { Users, Token } = require("../Models/index");
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
        üzenet: "E-mail már használatban van.",
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
  const { userId, username, age, phoneNumber } = req.body;

  try {
    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    if (username && username !== user.username) {
      const existingUser = await Users.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          message: "Username is already taken",
        });
      }
    }

    await user.update({
      username: username !== undefined ? username : user.username,
      age: age !== undefined ? age : user.age,
      phoneNumber: phoneNumber !== undefined ? phoneNumber : user.phoneNumber,
    });

    res.status(200).json({
      status: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the user",
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
  updateUser,
};
