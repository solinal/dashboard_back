const { getUserTypeByEmailUser, updateDataUser, getDataUser } = require('../services/users.js');

const getTypeUserById = async (req, res) => {
    try {
        let { correo } = req.body
        const user = await getUserTypeByEmailUser(correo);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const getDataBillingByUser = async (req, res) => {
    try {
        let { correo } = req.body;
        const userData = await getDataUser(correo);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateDataBilling = async (req, res) => {
    try {
        let { correo, ...data } = req.body;
        const userDataUptated = await updateDataUser(correo, data);
        if (!userDataUptated) {
            return res.status(404).json({ message: 'User not found' })
        }
        console.log(userDataUptated);
        return res.status(200).json({ message: "Data updated successfully", newUserData: userDataUptated });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    getTypeUserById,
    updateDataBilling,
    getDataBillingByUser
}