const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const genererToken = (payload, secret, expiresIn = '24h') => {
    return jwt.sign(payload, secret, { expiresIn });
};

const verifierToken = (token, secret) => {
    return jwt.verify(token, secret);
};

const hashagePassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const verifierPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { genererToken, verifierToken, hashagePassword, verifierPassword };
