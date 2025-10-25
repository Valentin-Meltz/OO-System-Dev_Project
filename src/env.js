require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,

    // Database configuration
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
};