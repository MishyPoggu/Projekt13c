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

module.exports = {
    getAllUsers
}