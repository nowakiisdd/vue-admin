<template>
  <el-table :data="new_shop_list" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.shop_address }}</span>
          </el-form-item>
          <el-form-item label="店铺电话">
            <span>{{ props.row.shop_tel }}</span>
          </el-form-item>
          <el-form-item label="店铺简介">
            <span>{{ props.row.shop_info }}</span>
          </el-form-item>
          <el-form-item label="店铺分类">
            <span>{{ props.row.shop_category }}</span>
          </el-form-item>
          <el-form-item label="配送费">
            <span>{{ props.row.shipping_fee }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.shop_minimum_delivery_amount }}</span>
          </el-form-item>
          <el-form-item label="营业时间">
            <span>{{ props.row.shop_time_start }}</span>
            <span>{{ props.row.shop_time_end }}</span>
          </el-form-item>
          <el-form-item label="店铺优惠">
            <span>{{ props.row.shop_youhui }}</span>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span v-if="props.row.shop_fetures_flag_index_1 === 'true'">品牌保证</span>
            <span v-if="props.row.shop_fetures_flag_index_2 === 'true'">蜂鸟专送</span>
            <span v-if="props.row.shop_fetures_flag_index_3 === 'true'">新开店铺</span>
            <span v-if="props.row.shop_fetures_flag_index_4 === 'true'">外卖保</span>
            <span v-if="props.row.shop_fetures_flag_index_5 === 'true'">准时达</span>
            <span v-if="props.row.shop_fetures_flag_index_6 === 'true'">开发票</span>
          </el-form-item>
          <el-form-item label="店铺logo">
            <img :src="'http://localhost:3000/uploads/' + props.row.shop_logo" alt="" class="pic">
          </el-form-item>
          <el-form-item label="店铺营业执照">
            <img :src="'http://localhost'" alt="" class="pic">
          </el-form-item>
          <el-form-item label="店铺餐饮许可证">
            <img :src="'http://localhost'" alt="" class="pic">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品 ID" prop="id"></el-table-column>
    <el-table-column label="商品名称" prop="name"></el-table-column>
    <el-table-column label="描述" prop="desc"></el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>