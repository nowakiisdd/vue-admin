

const mongoose = require( 'mongoose' )


// const positionSchema = new mongoose.Schema( options )
const positionSchema = new mongoose.Schema({
  // 定义字段和字段数据类型
  positionName: String,
  city: String,
  companyName: String
})


module.exports = positionSchema