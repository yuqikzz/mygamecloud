<template>
  <div style="background: #fff;height: 5vh">
    <div style="width: 100%;height: 100%;padding:10px 0;">
      <div style="display:flex;justify-content: center">
        <el-button style="margin-right: 15px" v-on:mouseleave="styleD(0)" v-on:mouseenter="styleC(0)"
                   icon="el-icon-s-home"
                   :class="isHover[0] ? '' : 'hoverIcon'" type="text" @click="gotoPage('/page/home', 0)">首页
        </el-button>
        <el-button style="margin-right: 15px" v-on:mouseleave="styleD(0)" v-on:mouseenter="styleC(0)"
                   icon="el-icon-folder-opened"
                   :class="isHover[0] ? '' : 'hoverIcon'" type="text" @click="gotoPage('/page/cloud', 0)">资源云盘
        </el-button>
        <el-button style="margin-right: 15px" v-if="isLogin" v-on:mouseleave="styleD(0)" v-on:mouseenter="styleC(0)"
                   icon="el-icon-document-add"
                   :class="isHover[0] ? '' : 'hoverIcon'" type="text" @click="gotoPage('/page/upload', 0)">资源上传
        </el-button>
        <el-button style="margin-right: 15px" v-if="isLogin" v-on:mouseleave="styleD(0)" v-on:mouseenter="styleC(0)"
                   icon="el-icon-s-custom"
                   :class="isHover[0] ? '' : 'hoverIcon'" type="text" @click="gotoPage('/page/user', 0)">个人中心
        </el-button>
        <el-button style="margin-right: 15px" v-else v-on:mouseleave="styleD(0)" v-on:mouseenter="styleC(0)"
                   icon="el-icon-d-arrow-right"
                   :class="isHover[0] ? '' : 'hoverIcon'" type="text" @click="gotoPage('/', 0)">去登陆
        </el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHover: {
        home: false
      },
      isLogin: false
    }
  },

  beforeMount: async function () {
    const data = localStorage.getItem('token')
    this.isLogin = data !== null
    if (!this.isLogin) {
      await this.$router.push("/page/home")
    }
  },
  methods: {
    styleC(num) {
      this.isHover[num] = true
    },
    styleD(num) {
      this.isHover[num] = false
    },
    gotoPage(str, num) {
      this.$router.push(str)
      this.isHover[num] = false
    }

  }
}
</script>

<style scoped>
.hoverIcon {
  color: #333333
}
</style>