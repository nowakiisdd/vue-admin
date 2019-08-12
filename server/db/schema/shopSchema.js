

const mongoose = require( 'mongoose' )


// const positionSchema = new mongoose.Schema( options )
const shopSchema = new mongoose.Schema({
  // 定义字段和字段数据类型
  shop_name: String,
  shop_address: String,
  shop_tel: Number,
  shop_info: String,
  shop_slogan: String,
  shop_category: String,
  shop_feture: Object,
  shipping_fee: Number,
  shop_minimum_delivery_amount: Number,
  shop_time_start: String,
  shop_time_end: String,
  shop_logo: String,
  shop_business_license: String,
  shop_license: String,
  shop_youhui: String
})


module.exports = shopSchema