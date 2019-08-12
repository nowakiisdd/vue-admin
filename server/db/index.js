/* 
  // 数据库操作
*/

// 1. 连接数据库
const connect = require( './connect' )

connect.run()

// 2. 创建骨架

const { positionSchema,shopSchema } = require( './schema/index.js' )

// 3. 创建模型

const { dbPositionModel,shopModel } = require( './model/index.js' )



const position_model = dbPositionModel( {
  collectionName: 'positions',
  schemaName: positionSchema
})


const shop_model = shopModel( {
  collectionName: 'shops',
  schemaName: shopSchema
})



const db = {
  position: {
    add ( data ) {
      
      // 做数据库操作 ， 添加一条数据进入数据库 
      // 4. 创建实体 【 实例化模型得到实体 】

      return new Promise(( resolve,reject ) => {

        const position = new position_model( data ) 
        // 将数据保存在了数据库
        position.save( error => {
          if( error ) {
            // 存储失败
            resolve( 0 )
          }else{
            // 表示存储成功
            resolve( 1 )
            console.log( '存储成功' ) 
          }
        }) 

      })
      

      
    },
    del ( data ) {
      return new Promise(( resolve,reject ) => {

        position_model.find( data, ( error,docs ) => {
          // [
          //   {
          //     _id: 5d36621c3d2ac544d03f3eab,
          //     positionName: 'ui',
          //     city: '北京',
          //     companyName: '千锋教育',
          //     __v: 0
          //   },
          //   {
          //     _id: 5d36627d3d2ac544d03f3eac,
          //     positionName: 'ui',
          //     city: '北京',
          //     companyName: '千锋教育',
          //     __v: 0
          //   }
          // ]
  
  
          // 一定是以一个数据 
          console.log('====================================');
          console.log( 'docs',docs );
          console.log('====================================');
  
          if( !(docs.length === 0) ) {
            //找到匹配的数据了 ， 开始删除
  
            position_model.findById( docs[0]._id, ( error,result ) => {
              if( result ){
                //可以删除 
                resolve( 1 )
                result.remove()
              }else{
                // 没必要删除了
                resolve( 2 )
              }
            })
  
          }else{
            // 没有找到匹配的条件，不用删除
            resolve( 0 )
          }
          
  
        })
      })
    },
    update ( data ) {
      return new Promise(( resolve,reject ) => {

        position_model.find( data, ( error, docs ) => {
          if( !( docs.length === 0 ) ){
            //证明找到那条数据了
            position_model.findById( docs[0]._id, ( error,result ) => {
              result.city = data.city
              result.save( error => {
                if( error ) {
                  resolve( 0 )
                }else{
                  resolve( 1 )
                }
              })
            })
          }else{
            // 没有找到
          }
        })
      })
    },
    query ( data ) {
      return new Promise(( resolve,reject ) => {

        if( data ){
          // 精确查找某一条
          position_model.find( data, ( error,docs ) => {
            resolve( docs )
          })
        }else{
          // 查所有的
          position_model.find({},( error,docs ) => {
            resolve( docs )
          })
        }

      })
    }
  },
  user: {
    add () {

    },
    del () {

    },
    update () {

    },
    query () {

    }
  },
  shop: {
    add ( data ) { //增
      

      data.shop_feture = {
        shop_fetures_flag_index_1: data.shop_fetures_flag_index_1,
        shop_fetures_flag_index_2: data.shop_fetures_flag_index_2,
        shop_fetures_flag_index_3: data.shop_fetures_flag_index_3,
        shop_fetures_flag_index_4: data.shop_fetures_flag_index_4,
        shop_fetures_flag_index_5: data.shop_fetures_flag_index_5,
        shop_fetures_flag_index_6: data.shop_fetures_flag_index_6
      }

      delete data.shop_fetures_flag_index_1
      delete data.shop_fetures_flag_index_2
      delete data.shop_fetures_flag_index_3
      delete data.shop_fetures_flag_index_4
      delete data.shop_fetures_flag_index_5
      delete data.shop_fetures_flag_index_6

      console.log( data )

      return new Promise(( resolve,reject ) => {
        const shop = new shop_model( data ) 
        shop_model.find({},( error,docs ) => {
          let flag = true
          docs.forEach( item => {
            if( (item.shop_name === data.shop_name) && ( item.shop_address === data.shop_address ) && ( item.shop_tel == data.shop_tel ) ){
              flag = false 
              return 
            }
          })  
          
          if( flag ) {

            //条件成立 ，没有找到数据，可以存储
            
            // 将数据保存在了数据库
            shop.save( error => {
              if( error ) {
                // 存储失败
                resolve( 0 )
              }else{
                // 表示存储成功
                resolve( 1 )
              }
            }) 

          }else{
            //如果这个不成立，找到了数据，不可以存储
            resolve( 2 )
          }
        })

      })
    },
    delete ( data ) { // 删
      new Promise((resolve,reject) => {

        shop_model.findById( data.id,( error,docs ) => {
          docs.remove((error) => { 
            if ( error ) {
              //删除失败 
              resolve({
                status: 0
              })
            } else {
              // 删除成功
              shop_model.find({},(error,data) => {
                resolve({
                  status: 1,
                  data
                })
              })
            }
          })
        })

      })
    },
    modify ( data ) { // 改
      return new Promise((resolve,reject) => {
        shop_model.findById( data._id,( error, docs ) => {
          docs.shop_name = data.shop_name 
          docs.shop_tel = data.shop_tel
          docs.save(( error ) => {
            if ( error ) {
              //修改失败了
              resolve( 0 )
            } else {
              resolve( 1 )
            }
          })
        })
      })
    },
    query () { // 查
      return new Promise(( resolve,reject ) => {

        shop_model.find({},( error,docs ) => {
          if ( error ) {
            // 查询出了问题 
            resolve({
              status: 0,
              errorInfo: error
            })
  
          } else {
            //查询没问题，没问题就返回结果
            resolve({
              status: 1,
              data: docs
            })
          }
        })

      })
    }
  }
  
}

module.exports = db