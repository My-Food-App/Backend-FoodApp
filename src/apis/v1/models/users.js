const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password required at least 6 character"],
    required: true,
  },
  role: {
    type: String,
    // enum: ["admin", "user"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  avatar: {
    type: String,
    default:
      "https://banner2.cleanpng.com/20180619/iui/kisspng-user-profile-aurangabad-computer-icons-great-value-5b299da7d8ea44.3103164415294539918885.jpg",
  },
  cover: {
    type: String,
    default:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "none"],
    default: "none",
  },
  created_date: {
    type: Date,
    required: true,
    default:Date.now(),
  },
  status: {
    type: String,
    enum: ["public", "block"],
    default: "public",
  },
  fullname: {
    type: String,
    required: true,
    default: "No name",
  },
  phone: {
    type: String,
    default: null,
    unique: true,
  },
  birthday: {
    type: Date,
    default: null,
  },
  code: {
    type: String,
    default: null,
  },
  address:{
    type: String,
    default: "",
  },
  wallet: {
    type: Number,
    default:0
  }
});

module.exports = {
  users: mongoose.model("user", userSchema),
  usersNotAuth: mongoose.model("usersNotAuth", userSchema.clone())
}
