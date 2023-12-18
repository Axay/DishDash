const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://akshayshailesh:T5sEc12BjRUydnZh@cluster0.ceqnqjk.mongodb.net/dishdash?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected");
    let fetchedData = mongoose.connection.db.collection("food_items");
    let data = await fetchedData.find({}).toArray();
    let fetchCategoryData = mongoose.connection.db.collection("foodCategory");
    let catData = await fetchCategoryData.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
