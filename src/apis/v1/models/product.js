const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/512/2927/2927347.png",
  },
	idStore: {
		type: String,
    required: true,
	},
  price:{
    type: Number,
    default:10000
  },
  discount:{
    type: Number,
    default:0,
  },
  tag: {
    type: String,
    required: false,
  },
  sold:{
    type: Number,
    default: 0
  }
});

module.exports =  mongoose.model("products", productSchema)

