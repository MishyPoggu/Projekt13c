const { Users, Token } = require('../Models/index');
const connections = require('../Connections/connections');

const findAllTokens = async (req, res) => {
    try {
        const tokens = await Token.findAll();
        res.status(200).json({
            status: 200,
            data: tokens
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

module.exports = { findAllTokens }
