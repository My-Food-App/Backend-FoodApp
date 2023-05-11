const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require('./categories')

const Products = require("./product")

const storesSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    // required: true,
    default: "",
  },
  image: {
    type: String,
    required: false,
    default: "https://i.pinimg.com/564x/12/86/36/128636a28b06856235a0f1244b0dd249.jpg",
  },
  tag: {
    type: String,
    required: false,
  },
  type: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Array,
    default: []
  },
  userId:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    default: ""
  },
  status:{
    type: Boolean,
    default: true,
  },
  email:{
    type: String,
  },
  phone:{
    type: String,
  },
  created_date: {
    type: Date,
    required: true,
    default:Date.now(),
  },

});

module.exports = mongoose.model("stores", storesSchema)
