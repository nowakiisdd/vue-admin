/* 
  用于连接数据库
*/


const mongoose = require('mongoose')

// mongoose.connect( url, callbak )

// mongoose.connect( 'mongodb://127.0.0.1:27017/数据库名称', callbak )

const dbName = 1905



const connect = {
  run () {
    mongoose.connect( `mongodb://127.0.0.1:27017/${ dbName }`, ( error ) => {
      if( error ) console.log( 'error is:' + error ) 
      console.log('The database is connected~~~')
    })

  }
}


module.exports = connect