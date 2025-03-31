const { Companies, Addresses, Advertisements, CompanyMachines } = require("../Models/index");
const connections = require("../Connections/connections");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("../Middleware/uploadImage");

const ArcadeMachines = require("../Models/arcademachines"); 
const Consoles = require("../Models/consoles"); 
const PinballMachines = require("../Models/pinballmachines"); 

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
    const { companyName, passwordHash, taxNumber, contactEmail } = req.body;
    if (!companyName || !taxNumber || !contactEmail || !passwordHash) {
      return res.status(400).json({
        status: 400,
        message: msg.data.failure.unfilled,
        üzenet: uzn.data.failure.unfilled,
      });
    }
    const existingCompany = await Companies.findOne({ where: { companyName }, transaction });
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
      { companyName, passwordHash: hashedPassword, taxNumber, contactEmail },
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
  const { taxNumber, passwordHash } = req.body;
  if (!taxNumber || !passwordHash) {
    return res.status(400).json({
      status: 400,
      message: msg.company.failure.loginunfilled,
      üzenet: uzn.company.failure.loginunfilled,
    });
  }
  try {
    const company = await Companies.findOne({ where: { taxNumber } });
    if (!company) {
      return res.status(401).json({
        status: 401,
        message: msg.company.failure.logininvalid,
        üzenet: uzn.company.failure.logininvalid,
      });
    }
    const isPasswordValid = await bcrypt.compare(passwordHash, company.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: msg.company.failure.logininvalid,
        üzenet: uzn.company.failure.logininvalid,
      });
    }
    const token = jwt.sign(
      { companyId: company.companyId, companyName: company.companyName, taxNumber: company.taxNumber },
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
    console.error("Login error:", error);
    res.status(500).json({
      status: 500,
      message: msg.company.failure.unknown,
      üzenet: uzn.company.failure.unknown,
    });
  }
};

const updateCompany = async (req, res) => {
  const { companyId, registrationNumber, contactPerson, websiteUrl } = req.body;
  try {
    const company = await Companies.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ status: 404, message: "Company not found" });
    }
    await company.update({ registrationNumber, contactPerson, websiteUrl });
    res.status(200).json({ status: 200, message: "Company updated successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error updating company" });
  }
};

const addAddress = async (req, res) => {
  try {
    const { companyId, streetAddress, city, postalCode, stateOrRegion, country } = req.body;
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

const getCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await Companies.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
        status: 404,
        message: msg.company.failure.notfound,
        üzenet: uzn.company.failure.notfound,
      });
    }
    res.status(200).json({
      status: 200,
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({
      status: 500,
      message: msg.company.failure.fetcherror,
      üzenet: uzn.company.failure.fetcherror,
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
        { companyName, description, addressId, imageUrl, title },
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

const addMachineToCompany = async (req, res) => {
  const { companyId, name, machineType } = req.body;
  if (!companyId || !name || !machineType) {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields",
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
          message: "Invalid machine type",
        });
    }
    if (!machineExists) {
      return res.status(404).json({
        status: 404,
        message: "Machine not found",
      });
    }
    const existingEntry = await CompanyMachines.findOne({
      where: { companyId, name, machineType },
    });
    if (existingEntry) {
      return res.status(409).json({
        status: 409,
        message: "Machine already added to company",
      });
    }
    const companyMachine = await CompanyMachines.create({
      companyId,
      name,
      machineType,
    });
    res.status(201).json({
      status: 201,
      message: "Machine added to company successfully",
      companyMachine,
    });
  } catch (error) {
    console.error("Error adding machine:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getCompanyMachines = async (req, res) => {
  try {
    const companyMachines = await CompanyMachines.findAll({
      where: { companyId: req.params.companyId },
      attributes: ["name", "machineType"],
    });
    const machineGroups = {
      ArcadeMachine: [],
      Console: [],
      PinballMachine: [],
    };
    companyMachines.forEach(({ name, machineType }) => {
      machineGroups[machineType].push(name);
    });
    const [arcadeMachines, consoles, pinballMachines] = await Promise.all([
      machineGroups.ArcadeMachine.length
        ? ArcadeMachines.findAll({ where: { name: machineGroups.ArcadeMachine } })
        : [],
      machineGroups.Console.length
        ? Consoles.findAll({ where: { name: machineGroups.Console } })
        : [],
      machineGroups.PinballMachine.length
        ? PinballMachines.findAll({ where: { name: machineGroups.PinballMachine } })
        : [],
    ]);
    res.status(200).json({
      status: 200,
      machines: { arcadeMachines, consoles, pinballMachines },
    });
  } catch (error) {
    console.error("Error fetching company machines:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const removeMachineFromCompany = async (req, res) => {
  const { companyId, name } = req.body;
  if (!companyId || !name) {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields",
    });
  }
  try {
    const deleted = await CompanyMachines.destroy({
      where: { companyId, name },
    });
    if (deleted) {
      res.status(200).json({
        status: 200,
        message: "Machine removed from company successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Machine not found for this company",
      });
    }
  } catch (error) {
    console.error("Error removing machine:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAddresses,
  getAdvertisements,
  getAllCompanies,
  registerCompany,
  loginCompany,
  addAddress,
  postAdvertisement,
  updateCompany,
  getCompanyById,
  addMachineToCompany,
  getCompanyMachines,
  removeMachineFromCompany,
};