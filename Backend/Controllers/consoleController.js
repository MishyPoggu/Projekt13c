const { Consoles } = require('../Models/index');
const connections = require('../Connections/connections');

const isAdmin = (req) => {
    const { username, adminPassword } = req.body;
    return username === 'admin' && adminPassword === 'admin';
};

const getAllConsoles = async (req, res) => {
    try {
        const consoles = await Consoles.findAll();
        res.status(200).json({
            status: 200,
            data: consoles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while fetching items.',
            üzenet: 'Hiba merült fel az adatok lekérdezése közben.'
        });
    }
};

const addConsole = async (req, res) => {
    const transaction = await connections.transaction();
  
    try {
        if (isAdmin(req)) {
            const { name, release, publisher } = req.body; 
    
            if (!name || !release || !publisher) {
                return res.status(400).json({
                    status: 400,
                    message: 'All fields are required.',
                    üzenet: 'Minden mező kitöltése kötelező.',
                });
            }
        
            console.log("Checking for existing console...");
            const existingName = await Consoles.findOne({where: { name }, transaction});
            if (existingName) {
                return res.status(409).json({
                    status: 409,
                    message: 'A console with that name already exists in the database.',
                    üzenet: 'Az adatbázisban már található konzol ilyen névvel.',
                });
            }
        
            console.log("Creating new console...");
            const newConsole = await Consoles.create(
                {
                    name,
                    release,
                    publisher
                },
                { transaction }
            );
        
            console.log("New console created with ID:", newConsole.id);
        
            await transaction.commit();
        
            console.log("Transaction committed successfully.");
            res.status(201).json({
                status: 201,
                consoleId: newConsole.id,
                message: 'Console added successfully!',
                üzenet: 'Konzol sikeresen létrehozva!',
            });
        }
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

const updateConsole = async (req, res) => {
    const transaction = await connections.transaction();

    try {
        if (isAdmin(req)) {
            const { id, name, release, publisher } = req.body;

            if (!id) {
                return res.status(400).json({
                    status: 400,
                    message: 'Console ID is required.',
                    üzenet: 'A konzol azonosítója kötelező.',
                });
            }

            console.log("Fetching existing console...");
            const existingConsole = await Consoles.findByPk(id, { transaction });

            if (!existingConsole) {
                return res.status(404).json({
                    status: 404,
                    message: 'Console not found.',
                    üzenet: 'Konzol nem található.',
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
                        message: 'A console with that name already exists.',
                        üzenet: 'Egy ilyen nevű konzol már létezik.',
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
                message: 'Console updated successfully!',
                üzenet: 'Konzol sikeresen frissítve!',
            });
        } else {
            return res.status(403).json({
                status: 403,
                message: 'Unauthorized access.',
                üzenet: 'Engedély nélküli hozzáférés.',
            });
        }
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

const addConsoles = async (req, res) => {
    const transaction = await connections.transaction();
  
    try {
        if (isAdmin(req)) {
            const { consoles } = req.body; 
    
            if (!consoles || !Array.isArray(consoles) || consoles.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'No consoles provided or invalid format.',
                    üzenet: 'Nincsenek konzolok megadva vagy hibás formátum.',
                });
            }

            for (const consoleData of consoles) {
                const { name, release, publisher } = consoleData;

                if (!name || !release || !publisher) {
                    await transaction.rollback();
                    return res.status(400).json({
                        status: 400,
                        message: 'Each console must have a name, release year, and publisher.',
                        üzenet: 'Minden konzolhoz szükséges név, kiadási év és kiadó.',
                    });
                }

                console.log(`Checking for existing console with name: ${name}...`);
                const existingConsole = await Consoles.findOne({ where: { name }, transaction });
                if (existingConsole) {
                    await transaction.rollback();
                    return res.status(409).json({
                        status: 409,
                        message: `Console with name "${name}" already exists.`,
                        üzenet: `A "${name}" nevű konzol már létezik.`,
                    });
                }

                console.log(`Creating console: ${name}...`);
                await Consoles.create(
                    { name, release, publisher },
                    { transaction }
                );
            }

            console.log("All consoles added successfully.");
            await transaction.commit();

            res.status(201).json({
                status: 201,
                message: 'Consoles added successfully!',
                üzenet: 'A konzolok sikeresen hozzáadva!',
            });
        } else {
            return res.status(403).json({
                status: 403,
                message: 'Unauthorized. Admin credentials required.',
                üzenet: 'Hozzáférés megtagadva. Admin jogosultság szükséges.',
            });
        }
    } catch (error) {
        console.error('Error deleting console:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while deleting the console.',
            üzenet: 'Hiba merült fel a konzol törlése közben.'
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
                        message: 'Console not found by name.',
                        üzenet: 'Konzol nem található ilyen névvel.'
                    });
                }

                await console.destroy();
                return res.status(200).json({
                    status: 200,
                    message: 'Console deleted successfully by name.',
                    üzenet: 'Konzol sikeresen kitörölve név alapján.'
                });
            } else if (id) {
                const console = await Consoles.findOne({ where: { id } });
                if (!console) {
                    return res.status(404).json({
                        status: 404,
                        message: 'Console not found by ID.',
                        üzenet: 'Nem található konzol ilyen ID-vel.'
                    });
                }

                await console.destroy();
                return res.status(200).json({
                    status: 200,
                    message: 'Console deleted successfully by ID.',
                    üzenet: 'Konzol sikeresen kitörölve ID alapján.'
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Provide either console ID or name.',
                    üzenet: 'Adjon meg azonosítót vagy nevet.'
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
        console.error('Error deleting console:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while deleting the console.',
            üzenet: 'Hiba merült fel a konzol törlése közben.'
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
                    message: 'Console not found by name.',
                    üzenet: 'Konzol nem található ilyen névvel.'
                });
            }

            return res.status(200).json({
                status: 200,
                data: console
            })
        }
        else if (id) {
            const console = await Consoles.findOne({ where: { id } });
            if (!console) {
                return res.status(404).json({
                    status: 404,
                    message: 'Console not found by ID.',
                    üzenet: 'Konzol nem található ilyen ID-vel.'
                });
            }

            return res.status(200).json({
                status: 200,
                data: console
            })
        }
    } catch (error) {
        console.error('Error getting console:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while getting the console.',
            üzenet: 'Hiba merült fel a konzol lekérdezése közben.'
        });
    }
}


module.exports = {
    getAllConsoles,
    getConsole,
    addConsole,
    updateConsole,
    addConsoles,
    removeConsole
}
