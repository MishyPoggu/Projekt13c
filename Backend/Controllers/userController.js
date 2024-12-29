const { Users, Token } = require('../Models/index');
const connections = require('../Connections/connections');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = '1234';

const isAdmin = (req) => {
    const { username, adminPassword } = req.body;
    return username === 'admin' && adminPassword === 'admin';
};

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
            üzenet: 'Hiba merült fel az adatok lekérdezése közben.'
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

const loginUser = async (req, res) => {
    const { username, email, passwordHash } = req.body;

    if ((!username && !email) || !passwordHash) {
        return res.status(400).json({
            status: 400,
            message: 'Either username or email, and password are required.',
            üzenet: 'Felhasználónév vagy E-mail és jelszó szükséges a bejelentkezéshez.'
        });
    }

    try {
        const user = await Users.findOne({
            where: email ? { email } : { username }
        });

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email/username or password.',
                üzenet: 'Nem megfelelő felhasználónév/E-mail vagy jelszó.'
            });
        }

        const isPasswordValid = await bcrypt.compare(passwordHash, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email/username or password.',
                üzenet: 'Nem megfelelő felhasználónév/E-mail vagy jelszó.'
            });
        }

        const loginTimestamp = new Date().toISOString();

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
                loginAt: loginTimestamp
            },
            SECRET_KEY,
            { expiresIn: '6h' }
        );

        const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);
        await Token.create({
            userId: user.userId,
            token,
            loginAt: loginTimestamp,
            expiresAt
        });

        res.status(200).json({
            status: 200,
            userId: user.userId,
            token,
            loginAt: loginTimestamp,
            message: 'Login successful!',
            üzenet: 'Sikeres bejelentkezés!'
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            üzenet: 'Hiba merült fel. Kérjük, próbálja újra később.'
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
                        message: 'User not found by email.',
                        üzenet: 'Felhasználó nem található email alapján.'
                    });
                }

                await user.destroy();
                return res.status(200).json({
                    status: 200,
                    message: 'User deleted successfully by email.',
                    üzenet: 'Felhasználó sikeresen törölve email alapján.'
                });
            } else if (id) {
                const user = await Users.findOne({ where: { id } });
                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        message: 'User not found by ID.',
                        üzenet: 'Felhasználó nem található azonosító alapján.'
                    });
                }

                await user.destroy();
                return res.status(200).json({
                    status: 200,
                    message: 'User deleted successfully by ID.',
                    üzenet: 'Felhasználó sikeresen törölve azonosító alapján.'
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Provide either user ID or email.',
                    üzenet: 'Adjon meg azonosítót vagy e-mailt.'
                });
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: 'Unauthorized. Admin credentials required.',
                üzenet: 'Hozzáférés megtagadva. Admin jogosultság szükséges.'
            });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while deleting the user.',
            üzenet: 'Hiba merült fel a felhasználó törlése közben.'
        });
    }
};


module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    removeUser
}
