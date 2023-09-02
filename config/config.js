module.exports = {
    // MongoDB connection string (replace with your actual connection string)
    MONGODB_CONNECTION: "mongodb://localhost:27017/crm",

    // Port on which the server will listen
    PORT: 5009,

    // Secret key for JWT token generation and verification
    JWT_SECRET: 'your-secret-key',

    // JWT token expiration time (1 hour in this example)
    JWT_EXPIRATION: '1h'
}
