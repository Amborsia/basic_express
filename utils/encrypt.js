const bcrypt = require('bcrypt');

const saltRounds = 10;

const encryptPassword = async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

module.exports = {
    encryptPassword, verifyPassword
};