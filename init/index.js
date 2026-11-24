const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main().then(() => {
  console.log("Connected with DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj, owner: "6b053c921f90d54db4c87184"
  }));
  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};

initDB();