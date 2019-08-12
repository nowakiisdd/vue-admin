/* 
  有关商品数据的api接口的打造
    restful api

    增   post
    删   delete
    改   put
    查   get
*/

const express = require( 'express' )
const router = express.Router()
const db = require('../db')
const path = require('path')
var multer  = require('multer')

// 进行磁盘存储，将我们选中的图片存入我们当前目录的uploads目录中
var arr = []

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join( __dirname,'../public/uploads'))
  },
  filename: function (req, file, cb) {
    var index = file.originalname.indexOf('.')
    var type = file.originalname.slice( index )
    var filename = file.fieldname + '-' + Date.now() + type
    arr.push( filename )
    req.filename  = arr
    cb(null, filename )
  }
})

var upload = multer({ storage: storage })

// 通过restful  api  来打造接口

  router.route('/shop')
    .post( upload.any(),  async (req,res,next ) => {

 
      req.body.shop_logo = req.filename[ 0 ]
      req.body.shop_business_license = req.filename[ 1 ]
      req.body.shop_license = req.filename[ 2 ]

      const result = await db.shop.add( {...req.body} )



      res.render('shop',{
        data: JSON.stringify({
          ret: true,
          name: 'gabriel Yan',
          info: result === 1 ? '存储成功': '存储失败',
          result
        })
      })

      arr = []

    })
    .delete( async (req,res,next) => {
      console.log('req.id',req.body) 
      const result = await db.shop.delete({...req.body })
      if ( result.status === 1 ) {
        res.render('shop',{
          data: JSON.stringify({
            status: 1,
            info: '删除成功',
            data: result.data
          })
        })
      } else {
        res.render('shop',{
          data: JSON.stringify({
            status: 0,
            info: '删除失败'
          })
        })
      }
    })
    .put(upload.any(),async (req,res,next) => {
      const result = await db.shop.modify({...req.body} )
      if( result === 0 ) {
        res.render('shop',{
          data: JSON.stringify({
            status: 0,
            info: '修改失败了'
          })
        })
      } else {
        res.render('shop',{
          data: JSON.stringify({
            status: 1,
            info: '修改成功'
          })
        })
      }
      
    })
    .get( async (req,res,next) => {
      // 进行的是数据库的查询
      const result = await db.shop.query()

      if ( result.status === 0 ) {
        // 查询出了问题
        res.render('shop',{
          data: JSON.stringify({
            status: 0, 
            message: '数据请求失败',
            errorMsg: result.error
          })
        })

      } else {
        // 查询成功了
        res.render('shop',{
          data: JSON.stringify({
            status: 1, 
            message: '数据请求成功',
            data: result.data
          })
        })
      }
 
      
    })

module.exports = router 