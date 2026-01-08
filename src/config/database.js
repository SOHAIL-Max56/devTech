const moongoose = require("mongoose");

const connectdb = async () => {
  await moongoose.connect(
    "mongodb+srv://devtech:JCovl3IX1TandceF@myproject.tyvfvsz.mongodb.net/FirstDatabase"
  );
};
module.exports = connectdb;