const express = require( 'express' )

const router = express.Router()

const positionController = require( '../controller/positonController' )


// 通过restful api来暴露接口

/* 

*/

/* 
  post      增
  delete    删
  put       改
  get       查
*/

router
  .route('/position')
  .post(( req,res,next ) => {
    // 为什么要对象传参？
    // 对象无序
    // 按需使用参数
    positionController.add( { req,res,next,...req.body } ) 
  })
  .delete(( req,res,next ) => {
    // 删除
    positionController.del( { req,res,next,...req.query } ) 
  })
  .put(( req,res,next) => {
    positionController.update({req,res,next,...req.query})
  })
  .get(
    ( req,res,next ) => {
      // 删除
      positionController.query( { req,res,next,...req.query } ) 
    } 
  )


module.exports = router