module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URL: process.env.MONGODB_URL || ' mongodb://127.0.0.1:27017/rest_api'
}