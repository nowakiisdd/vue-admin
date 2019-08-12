<template>
  <div class="add_shop_box">
    <el-form 
      :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" 
      class="demo-ruleForm upForm"
      action = "http://localhost:3000/shop"
      method = "POST"
      ectype = "multipart/form-data"
      @click.native = "addressFlag = false"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" name = "shop_name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address" name = "shop_address"
          @input = "addressHandler"
        ></el-input>
        <el-card class="box-card" v-if = "addressFlag">
          <div v-for="o in addressLists" 
            @click = "getAddress( o.address )"
            :key="o.geohash" class="text item"
          >
            {{ o.address }}
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="ruleForm.tel" name = "shop_tel"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="shop_info">
        <el-input v-model="ruleForm.shop_info" name = "shop_info"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="shop_slogan">
        <el-input v-model="ruleForm.shop_slogan" name = "shop_slogan"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" prop="shop_category">
        <Cascader :data="data" name = "shop_category"></Cascader>
      </el-form-item>
      <el-form-item label="店铺特点" prop="shop_feature">

        <div  
          v-for = " item in fetures "
          :key = "item.id"
        >
          <span :class = "{ 'feture': item.flag }"> {{ item.text }} </span>
          <iv-switch v-model = "item.flag" :name = "'shop_fetures_flag_index_' + item.id"></iv-switch>
        </div>
      
      </el-form-item>

      <el-form-item label = "配送费">
          <el-input-number name = "shipping_fee" v-model="shipping_fee" :precision="1" :step="0.1" :max="10"></el-input-number>
      </el-form-item>

      <el-form-item label = "起送价">
          <el-input-number name = "shop_minimum_delivery_amount"   :precision="1" :step="0.1" :max="10"></el-input-number>
      </el-form-item>

      <el-form-item label = "营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          name = "shop_time_start"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '22:30'
          }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          name = "shop_time_end"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '22:30',
            minTime: startTime
          }">
        </el-time-select>
      </el-form-item>

      <el-form-item label="上传头像" prop="name">
        <input type="file"  id="" name = "shop_logo" >
      </el-form-item>
      <el-form-item label="上传营业执照" prop="name">
        <input type="file" name="shop_business_license" id="">
      </el-form-item>
      <el-form-item label="上传餐饮许可证" prop="name">
        <input type="file" name="shop_license" id="">
      </el-form-item>


      <el-form-item label = "优惠">
         <el-select v-model="discounts" placeholder="请选择"
          name = "shop_youhui"
         >
            <el-option
              v-for="item in discounts_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Cascader,Switch }  from 'iview'
  import http from 'utils/http'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          address: '',
          tel: '',
          shop_info: '',
          shop_slogan: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        addressFlag: false,
        addressLists: [],
        startTime: '',
        endTime: '',
        fetures: [
          {
            id: 1,
            text: '品牌保证',
            flag: false
          },
          {
            id: 2,
            text: '蜂鸟专送',
            flag: false
          },
          {
            id: 3,
            text: '新开店铺',
            flag: false
          },
          {
            id: 4,
            text: '外卖保',
            flag: false
          },
          {
            id: 5,
            text: '准时达',
            flag: false
          },
          {
            id: 6,
            text: '开发票',
            flag: false
          }
        ],
        shipping_fee: 0,
        shop_minimum_delivery_amount: 0,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
              {
                  value: 'gugong',
                  label: '故宫'
              },
              {
                  value: 'tiantan',
                  label: '天坛'
              },
              {
                  value: 'wangfujing',
                  label: '王府井'
              }
          ]
        }, 
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
              {
                  value: 'nanjing',
                  label: '南京',
                  children: [
                      {
                          value: 'fuzimiao',
                          label: '夫子庙',
                      }
                  ]
              },
              {
                value: 'suzhou',
                label: '苏州',
                children: [
                    {
                        value: 'zhuozhengyuan',
                        label: '拙政园',
                    },
                    {
                        value: 'shizilin',
                        label: '狮子林',
                    }
                ]
              }
            ],
        }],
        discounts_options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        discounts: '',
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      };
    },
    methods: {
      addressHandler () {
        // 防抖
        setTimeout ( async () => {
          const result = await http({
            url: '/v1/pois',
            params: {
              type: 'search',
              city_id: 2,
              keyword: this.ruleForm.address
            }
          })
          this.addressLists = result.data
          this.addressFlag = true 
        },1000)
      },
      submitForm(formName) {
        var options = {
            "beforeSubmit" : this.checkForm,
            "success" : this.resultForm,
            "resetForm" : true,
            "dataType" : "json"
        };
        $(".upForm").ajaxSubmit(options);
      },
      checkForm () {

      },
      resultForm () {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getAddress ( val ) {
        this.ruleForm.address = val
        this.addressFlag = false
      }
    },
    components: {
      Cascader,
      'iv-switch': Switch
    }
  }
</script>

<style lang="stylus" scoped>
  .el-switch__label.is-active{
    color: black!important;
  }
  .add_shop_box{
    width: 600px;
    padding: 10px
  }
  .feture{
    color: blue;
  }
  .el-input-number__decrease{
    right: 40px!important;
  }
   .text {
    font-size: 14px;
  }
  .text:hover{
    background: red;
    color: white;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
