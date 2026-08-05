const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    process.env.MongoDB_URL,
  );
};
module.exports = connectdb;

// mongodb+srv://devtech:cz0Smj5lzXJ4Vodq@myproject.tyvfvsz.mongodb.net/~