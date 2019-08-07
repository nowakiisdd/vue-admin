
                                        




              


<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-home" />
            <router-link keep-alive tag="span" to="/home">首页</router-link>
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-folder" />数据管理
            </template>
            <MenuItem name="1-1">
              <a href>用户列表</a>
            </MenuItem>
            <MenuItem name="1-2">
              <a href>商家列表</a>
            </MenuItem>
            <MenuItem name="1-3">
              <a href=" ">食品列表</a>
            </MenuItem>
            <MenuItem name="1-4">
              <a href=" ">订单列表</a>
            </MenuItem>
            <MenuItem name="1-5">
              <a href=" ">管理员列表</a>
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-paper" />添加数据
            </template>
            <MenuItem name="2-1">
              <router-link to="/add_data/add_shop">添加商铺</router-link>
            </MenuItem>
            <MenuItem name="2-2">
              <!-- <router-link to="/add_data/add_food"> 添加商品 </router-link> -->
              <router-link
                :to="{
                                    name: 'add_food'
                                }"
              >添加商品</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-pie" />图表
            </template>
            <MenuItem name="3-1">
              <router-link keep-alive to="/chart">用户分布</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="md-create" />编辑
            </template>
            <MenuItem name="4-1">
              <router-link keep-alive to="/edit">文本编辑</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="md-build" />设置
            </template>
            <MenuItem name="5-1">
              <router-link keep-alive to="/setting">管理员设置</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="ios-information-circle" />说明
            </template>
            <MenuItem name="6-1">
              <router-link keep-alive to="/explain">说明</router-link>
            </MenuItem>
          </Submenu>
          <MenuItem name="7-1">
            <i class="el-icon-menu"></i>
            <router-link tag="span" to="/category">分类</router-link>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <!-- 放置一个路由展示区域 -->
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import {
  Layout,
  Menu,
  MenuItem,
  Icon,
  Sider,
  Header,
  Content,
  Submenu
} from "iview";
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  components: {
    Layout,
    Menu,
    MenuItem,
    Icon,
    Sider,
    Header,
    Content,
    Submenu
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>


<style scoped lang = "stylus">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-layout.ivu-layout-has-sider {
  height: 100%;
}

.ivu-menu-item a {
  color: white;
  display: block;
  width: 100%;
  height: 100%;

  &:hover {
    text-decoration: none;
  }
}
</style>