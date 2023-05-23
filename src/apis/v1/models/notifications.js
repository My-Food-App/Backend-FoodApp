const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:'Chưa xem'
  },
  userId: {
  //  type: mongoose.Schema.Types.ObjectId,
     type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("notifications", notificationsSchema);
