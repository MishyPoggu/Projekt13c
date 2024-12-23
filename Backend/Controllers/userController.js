const Users = require('../Models/users');
const connections = require('../Connections/connections');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching users.',
            üzenet: 'Hiba merült fel az adatok lekérése közben.'
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
          message: 'All fields are required.',
          üzenet: 'Minden mező kitöltése kötelező.',
        });
      }
  
      console.log("Checking for existing user...");
      const existingUser = await Users.findOne({ where: { email }, transaction });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          message: 'E-mail already in use.',
          üzenet: 'E-mail már használatban van.',
        });
      }

      const existingUsername = await Users.findOne({where: { username }, transaction});
      if (existingUsername) {
        return res.status(409).json({
          status: 409,
          message: 'Username is already taken.',
          üzenet: 'A felhasználónév már használatban van.',
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
        message: 'User registered successfully!',
        üzenet: 'Felhasználó sikeresen regisztrálva!',
      });
    } catch (error) {
      console.error("Error occurred:", error);
      if (transaction) await transaction.rollback();
      res.status(500).json({
        status: 500,
        message: 'An error occurred. Please try again later.',
        üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.',
      });
    }
};

module.exports = { 
    getAllUsers,
    registerUser
}
