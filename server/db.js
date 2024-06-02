const mongoose = require('mongoose');
require('dotenv').config();

const MDB_URL = process.env.MONGO_URL;

const dbConn = async () => {
    try {
        await mongoose.connect(MDB_URL);
        console.log("Connection Success");
    } catch (error) {
        console.log("DB connection fail --> ", error);
    }
};

module.exports = dbConn
