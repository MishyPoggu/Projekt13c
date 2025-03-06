const { Administrators, Token } = require("../Models/index");
const connections = require("../Connections/connections");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const SECRET_KEY = "1234";

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Administrators.findAll();
    res.status(200).json({
      status: 200,
      data: admins,
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

const registerAdmin = async (req, res) => {
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

    console.log("Checking for existing admin...");
    const existingAdmin = await Administrators.findOne({
      where: { email },
      transaction,
    });
    if (existingAdmin) {
      return res.status(409).json({
        status: 409,
        message: msg.user.failure.emailtaken,
        üzenet: "E-mail már használatban van.",
      });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    console.log("Creating new admin...");
    const newAdmin = await Administrators.create(
      {
        username,
        email,
        passwordHash: hashedPassword,
      },
      { transaction }
    );

    console.log("New admin created with ID:", newAdmin.id);

    await transaction.commit();

    console.log("Transaction committed successfully.");
    res.status(201).json({
      status: 201,
      adminId: newAdmin.id,
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

const loginAdmin = async (req, res) => {
  const { username, email, passwordHash } = req.body;

  if ((!username && !email) || !passwordHash) {
    return res.status(400).json({
      status: 400,
      message: msg.user.failure.loginunfilled,
      üzenet: uzn.user.failure.loginunfilled,
    });
  }

  try {
    const admin = await Administrators.findOne({
      where: email ? { email } : { username },
    });

    if (!admin) {
      return res.status(401).json({
        status: 401,
        message: msg.user.failure.logininvalid,
        üzenet: uzn.user.failure.logininvalid,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      passwordHash,
      admin.passwordHash
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
        adminId: admin.id,
        username: admin.username,
        email: admin.email,
        loginAt: loginTimestamp,
      },
      SECRET_KEY,
      { expiresIn: "6h" }
    );

    const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);
    await Token.create({
      userId: admin.adminId,
      token,
      loginAt: loginTimestamp,
      expiresAt,
    });

    res.status(200).json({
      status: 200,
      adminId: admin.adminId,
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

const removeAdmin = async (req, res) => {
  // Implement admin removal logic if needed
};

module.exports = {
  getAllAdmins,
  registerAdmin,
  loginAdmin,
  removeAdmin,
};
