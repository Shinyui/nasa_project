const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = `mongodb+srv://shinyui:${process.env.PASSWORD}@nasa.arc2m.mongodb.net/nasa?retryWrites=true&w=majority`;

mongoose.connection.on("open", () => {
    console.log("MongoDB connection ready!");
})

mongoose.connection.on("error", (err) => {
    console.log(err);
})

const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL);
}

const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
