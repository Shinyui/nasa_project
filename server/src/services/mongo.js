const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on("open", () => {
    console.log("MongoDB connection ready!");
})

mongoose.connection.on("error", (err) => {
    console.log(err);
})

const mongoConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
