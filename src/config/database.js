import dotenv from 'dotenv';

dotenv.config();

var mongourl = process.env.MONGO_URI? process.env.MONGO_URI : 'mongodb://127.0.0.1/bookworm';

module.exports = {
    url : mongourl
};