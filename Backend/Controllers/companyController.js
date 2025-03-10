const { Companies, Addresses, Advertisements } = require("../Models/index");
const connections = require("../Connections/connections");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("../Middleware/uploadImage");

const msg = require("../Response/msg");
const uzn = require("../Response/uzenet");

const SECRET_KEY = "1234";

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.status(200).json({
      status: 200,
      data: companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: msg.company.failure.fetcherror,
      üzenet: uzn.company.failure.fetcherror,
    });
  }
};

const registerCompany = async (req, res) => {
  const transaction = await connections.transaction();

  try {
    const {
      companyName,
      passwordHash,
      registrationNumber,
      taxNumber,
      contactPerson,
      contactEmail,
      websiteUrl,
    } = req.body;

    if (
      !companyName ||
      !registrationNumber ||
      !taxNumber ||
      !contactEmail ||
      !passwordHash
    ) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    const existingCompany = await Companies.findOne({
      where: { companyName },
      transaction,
    });

    if (existingCompany) {
      await transaction.rollback();
      return res.status(409).json({
        status: 409,
        message: msg.company.failure.nametaken,
        üzenet: uzn.company.failure.nametaken,
      });
    }

    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const newCompany = await Companies.create(
      {
        companyName,
        passwordHash: hashedPassword,
        registrationNumber,
        taxNumber,
        contactPerson,
        contactEmail,
        websiteUrl,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      status: 201,
      companyId: newCompany.companyId,
      message: msg.company.success.registered,
      üzenet: uzn.company.success.registered,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Registration error:", error);

    res.status(500).json({
      status: 500,
      message: msg.company.failure.unknown,
      üzenet: uzn.company.failure.unknown,
    });
  }
};

const loginCompany = async (req, res) => {
  const { contactEmail, password } = req.body;

  if (!contactEmail || !password) {
    return res.status(400).json({
      status: 400,
      message: msg.company.failure.loginunfilled,
      üzenet: uzn.company.failure.loginunfilled,
    });
  }

  try {
    const company = await Companies.findOne({ where: { contactEmail } });
    if (!company) {
      return res.status(401).json({
        status: 401,
        message: msg.company.failure.logininvalid,
        üzenet: uzn.company.failure.logininvalid,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      company.passwordHash
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: msg.company.failure.logininvalid,
        üzenet: uzn.company.failure.logininvalid,
      });
    }

    const token = jwt.sign(
      {
        companyId: company.companyId,
        companyName: company.companyName,
        contactEmail: company.contactEmail,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      status: 200,
      companyId: company.companyId,
      token,
      message: msg.company.success.loggedin,
      üzenet: uzn.company.success.loggedin,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: msg.company.failure.unknown,
      üzenet: uzn.company.failure.unknown,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { companyId, streetAddress, city, postalCode, stateOrRegion, country } =
      req.body;

    if (!streetAddress || !city || !postalCode || !country) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }

    const newAddress = await Addresses.create({
      companyId,
      streetAddress,
      city,
      postalCode,
      stateOrRegion,
      country,
    });
    res.status(201).json({
      status: 201,
      addressId: newAddress.addressId,
      message: msg.address.success.created,
      üzenet: uzn.address.success.created,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({
      status: 500,
      message: msg.address.failure.unknown,
      üzenet: uzn.address.failure.unknown,
    });
  }
};

const getAddresses = async (req, res) => {
  const { companyId } = req.params;
  try {
    const addresses = await Addresses.findAll({ where: { companyId } });
    res.status(200).json({
      status: 200,
      data: addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      status: 500,
      message: msg.address.failure.fetcherror,
      üzenet: uzn.address.failure.fetcherror,
    });
  }
};

const getAdvertisements = async (req, res) => {
  const { companyId } = req.params;
  try {
    const advertisements = await Advertisements.findAll({ where: { companyId } });
    res.status(200).json({
      status: 200,
      data: advertisements,
    });
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res.status(500).json({
      status: 500,
      message: msg.ad.failure.fetcherror,
      üzenet: uzn.ad.failure.fetcherror,
    });
  }
};

const postAdvertisement = async (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: msg.upload.failure.imguploaderror,
        üzenet: uzn.upload.failure.imguploaderror,
      });
    }

    const transaction = await connections.transaction();
    try {
      const { companyName, description, addressId, title } = req.body;
      if (!companyName || !description || !addressId || !req.file) {
        return res.status(400).json({
          status: 400,
          message: msg.data.failure.unfilled,
          üzenet: uzn.data.failure.unfilled,
        });
      }

      const imageUrl = `/Uploads/Images/${req.file.filename}`;
      const newAd = await Advertisements.create(
        {
          companyName,
          description,
          addressId,
          imageUrl,
          title,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({
        status: 201,
        advertisementId: newAd.advertisementId,
        message: msg.ad.success.posted,
        üzenet: uzn.ad.success.posted,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({
        status: 500,
        message: msg.ad.failure.unknown,
        üzenet: uzn.ad.failure.unknown,
      });
    }
  });
};

module.exports = {
  getAddresses,
  getAdvertisements,
  getAllCompanies,
  registerCompany,
  loginCompany,
  addAddress,
  postAdvertisement,
};
