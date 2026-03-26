const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://devtech:cz0Smj5lzXJ4Vodq@myproject.tyvfvsz.mongodb.net/FirstDatabase",
  );
};
module.exports = connectdb;

// mongodb+srv://devtech:cz0Smj5lzXJ4Vodq@myproject.tyvfvsz.mongodb.net/~