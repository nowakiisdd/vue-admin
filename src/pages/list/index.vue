<template>
  <div>
    <ul>
      <li 
        v-for ='item in lists'
        :key = "item.id"
      >
        <p> {{ item.d_title }} </p>
        <img :src=" item.pic " alt="">
        <p>
          天猫价： {{ item.yuanjia | decimalDigitsFilter( 2 )| currencyFilter(currencyType)   }}
        </p>
        <p>
          券后价：{{ (item.yuanjia - item.quan_jine) | decimalDigitsFilter( 2 )| currencyFilter(currencyType) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import http from 'utils/http'
export default {
  data () {
    return {
      lists: [],
      currencyType: '￥ ' //确定那种货币
    }
  },
  async created () {
  
    const result = await http({
      url: '/index.php',
      params: {
        r: 'class/cyajaxsub',
        page: 1,
        cid: this.$route.query.cid,
        px: 't',
        cac_id: ''
      }
    })

    this.lists = result.data.data.content
  }
}
</script>
