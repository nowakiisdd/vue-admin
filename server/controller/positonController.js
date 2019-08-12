
/* 
  打造position控制器模块
  控制是用于写逻辑控制的，那么它应该操作数据吗？
*/

const positionModel = require( '../model/positionModel' )

const positionController = {
  add  ( { res,positionName,city,companyName }) { // 增
    positionModel.add( { res,positionName,city,companyName })
  },
  del ({ res,positionName,city,companyName }) { // 删
    positionModel.del( { res,positionName,city,companyName })
  },
  update ( data ) { // 改
    positionModel.updated( data )
  },

  query ({ res,positionName,city,companyName }) { // 查
    positionModel.query( { res,positionName,city,companyName })
  }
}

module.exports = positionController