const { Token } = require('../Models/index');
const connections = require('../Connections/connections');

const msg = require('../Response/msg');
const uzn = require('../Response/uzenet');

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
            message: msg.token.failure.fetcherror,
            üzenet: uzn.token.failure.fetcherror
        });
    }
};

module.exports = { findAllTokens }
