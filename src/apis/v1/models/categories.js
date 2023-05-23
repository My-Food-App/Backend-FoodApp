const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    
  },
});

module.exports = mongoose.model("categories", categoriesSchema)

