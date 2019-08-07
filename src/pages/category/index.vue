<template>
  <div>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane 
        v-for = "item in categorys"
        :key = "item.cid"
        :label=" item.name "
      >
        <div
          v-for = "floor in item.floors"
          :key = "floor.name"
          style = "padding: 20px;"
        >
          <h3> {{ floor.name }} </h3>
          <ul
            style = "display: flex;flex-wrap: wrap"
          >
            <li
              v-for = "ele in floor.list"
              :key = "ele.api_cid"
              style = "margin: 10px;"
            >
              <router-link 
                :to = "{
                  name: 'list',          
                  params: {
                    id: ele.api_cid
                  },
                  query: {
                    r: ele.jump_url,
                    cid: ele.api_cid
                  }
                }|urlFilter"
                style = "display: flex;flex-direction: column;"
              >
                <img
                  style = "width: 50px;height: 50px;"
                 :src=" ele.img " alt="">
                <span> {{ ele.name }} </span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import http from 'utils/http'
  export default {
    data() {
      return {
        tabPosition: 'left',
        categorys: []
      };
    },
    async created () {
      const result = await http({
        url: '/index.php',
        params: {
          r: 'class/category',
          type: 1
        }
      })

      this.categorys = result.data.data.data

    }
  };
</script>