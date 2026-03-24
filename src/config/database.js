const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://devtech:adKqpNwKwQDHbcpo@myproject.tyvfvsz.mongodb.net/FirstDatabase"
  );
};
module.exports = connectdb;