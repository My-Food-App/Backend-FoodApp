const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = require('./product')

const ordersSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  storeId: {
    type: String,
    required: true,
  },
  shipperId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  products:{
    type: Array,
    default:[]
  },
  shippingfee:{
    type: Number,
    default:0,
  },
  totalPrice:{
    type: Number,
    default:0,
  },
  status: {
    type: String,
    enum: ['Chờ xác nhận','Chờ lấy','Đang giao','Đã giao','Đã hủy'],
    default: 'Chờ xác nhận'
  },
  paymentMethod: {
    type: String,
    default: 'Thanh toán khi nhận hàng'
  },
  receiveAddress:{
    type: String,
  },
  deliveryAddress:{
    type: String,
  },
  created_date: {
    type: Date,
    required: true,
  //  default: Date.now(),
  },
	
});

module.exports = mongoose.model("orders", ordersSchema)

