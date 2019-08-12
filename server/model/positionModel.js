
/* 
  model 是数据
    1. 连接数据库，做数据库CURD
    2. 暴露接口
*/

const db = require( '../db' )

const positionModel = {
  async add ( { res,positionName,city,companyName }) {
    const result = await db.position.add( { positionName,city,companyName })
    

    if( result === 1 ){
      //存储成功了
      res.render('position.ejs',{
        data: JSON.stringify({
          ret: true, //这是认证方式 
          info: '添加成功',
          status: 1
        })
      })
    }else{
      //存储失败了
      res.render('position.ejs',{
        data: JSON.stringify({
          ret: true, //这是认证方式 
          info: '添加失败了',
          status: 0
        })
      })
    }

    res.json({
      ret: true,
      status: '增加成功'
    })
  },
  async del ({ res,positionName,city,companyName }) {
    const result = await db.position.del( { positionName,city,companyName } )

    switch ( result ) {
      case 0:
        res.render('position',{
          data: JSON.stringify({
            ret: true,
            info: '数据库没有这条数据',
            status: 0
          })
        })
        break;
      case 1:
        res.render('position',{
          data: JSON.stringify({
            ret: true,
            info: '删除成功',
            status: 1
          })
        })
        break;
      case 2:
        res.render('position',{
          data: JSON.stringify({
            ret: true,
            info: '重复删除',
            status: 2
          })
        })
        break;
    
      default:
        break;
    }
  },
  async updated ( { res,positionName,city,companyName} ) {
    const result = await db.position.update({positionName,city,companyName})
    if( result === 0 ){
      res.render('position',{
        data: JSON.stringify({
          ret: true,
          status: 0,
          info: '修改失败'
        })
      })
    }else{
      res.render('position',{
        data: JSON.stringify({
          ret: true,
          status: 1,
          info: '修改成功'
        })
      })
    }
  },
  async query ({ res,positionName,city,companyName }) {
    const result = await db.position.query({positionName,city,companyName })
    res.render('position',{
      data: JSON.stringify({
        ret: true,
        info: '查询结果',
        data: result 
      })
    })
  }
}

module.exports = positionModel