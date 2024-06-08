const Auth = require('../schemas/auth');
const encryptionService = require("../utils/encrypt");

const registerUser = async (nickname, email, plainPassword) => {
    const newUser = new Auth({ nickname, email });
    await newUser.setPassword(plainPassword, encryptionService);
    await newUser.save();
    return newUser;
};

const validateUser = async (email, plainPassword) => {
    const user = await Auth.findOne({ email });
    if (user) {
        const isValid = await user.validatePassword(plainPassword, encryptionService);
        return isValid ? user : null;
    }
    return null;
};

module.exports = {
    registerUser, validateUser
};