require("dotenv").config({ path: `${__dirname}/../../../.env` });
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_LOCAL_NAME}/${process.env.DB_NAME}`);
    console.log("Connect successfully!");
  } catch (error) {
    console.log("Connect fail!");
  }
}

module.exports = {connect};
