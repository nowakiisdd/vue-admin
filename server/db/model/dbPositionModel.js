/* 
  关于position的模型

*/

const mongoose = require( 'mongoose' )


const dbPositionModel = ({ collectionName, schemaName }) => {
  // mongoose.model( 集合名称,骨架 )
  //一定要注意： 集合名称一定要写成复数
  return mongoose.model( collectionName,schemaName )
}


module.exports = dbPositionModel