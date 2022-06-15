<template>
  <div class="page"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       style="height: 94vh"
  >
    <div class="h">
      <h1>
        个人中心 - MyGameCloud
      </h1>
    </div>
    <div class="content">
      <div>
        <div class="userInfo">
          <div style="text-align: center">

            <el-image
                style="width: 100px; height: 100px;border-radius: 50%;"
                :src="$imgApi+userData.headImage"></el-image>
            <p style="margin-top:30px;font-size: 28px;">{{ userData.nickName ? userData.nickName : '请登录' }}</p>
            <p style="margin-top:20px;font-size: 14px;">
              N币
              <span> {{ userData.NB ? userData.NB : '无' }}</span>
            </p>
            <p style="margin-top:20px;font-size: 14px;">
              等级
              <span> {{ userData.group ? userData.group : '游客' }}</span>
            </p>
          </div>
        </div>
        <div
            style="margin-top: 40px;background: #fff;height: 360px;border-radius: 3px;display: flex;justify-content: center;padding-top: 20px">
          <div>
            <div v-for=" (item,index) in menuArr" :key="index" :class="index===indexNum?'isX':'noX'">
              <el-button @click="goTo(item,index)" type="text"
                         :style="index===indexNum?{color:'#fff'}:{color: '#34495e'}">{{
                  item.text
                }}
              </el-button>
            </div>
          </div>

        </div>
      </div>
      <div style="margin-left: 40px">
        <div style="width: 1200px;background: #fff;height: 700px;border-radius: 4px">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfo} from "/src/api/userInfo";
import router from "@/router";

export default {
  data() {
    return {
      userData: {},
      imageUrl: null,
      loading: false,
      menuArr: [
        {
          text: '我的信息',
          path: '/info'
        },
        {
          text: '我的上传',
          path: '/resource'
        },
        {
          text: '我的收藏',
          path: '/collect'
        },
        {
          text: '我的N币',
          path: '/eRecord'
        }
      ],
      indexNum: 0
    }
  },
//页面初始化
  async beforeMount() {
    this.loading = true
    const data = localStorage.getItem('token')

    if (this.indexNum === 0) {
      await this.$router.push({name: 'userInfo'})
    }

    if (!data) {
      await this.$router.push("/page/home")
    } else {
      let userData = localStorage.getItem('userInfo')
      if (userData !== "undefined" && userData !== null) {
        userData = JSON.parse(userData)
        this.userData = userData
      } else {
        await this.getPageInfo()
      }
    }
    this.loading = false
  },

  watch: {
    $route(to) {
      let text = to.path.split('/user')[1]
      this.menuArr.map((item, index) => {
        if (item.path === text) {
          this.indexNum = index
        }
      })
    },
  },
  methods: {
    goTo(data, index) {
      if (index === this.indexNum) return
      this.indexNum = index
      this.$router.push('/page/user' + data.path)
    },
    //获取用户信息
    async getPageInfo() {
      const data = localStorage.getItem('token')
      this.headers = {
        "Token": data
      }
      const dataA = await getUserInfo()
      if (!dataA) {
        this.$notify.error({
          title: '错误',
          message: '未登录,即将跳转登录'
        });
        setTimeout(function () {
          router.push('/')
        }, 1500)
        return
      }
      if (dataA.data.status === 200) {
        this.userData = dataA.data.data
        localStorage.setItem('userInfo', JSON.stringify(this.userData))
        this.imageUrl = this.$imgApi + this.userData.headImage
      }
    }
  }
}
</script>

<style scoped>
.page {
  background: #e6e6e6;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.userInfo {
  width: 300px;
  height: 280px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.h {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #34495e;
  height: 160px;
  color: #ffffff;
}

.isX {
  background: #34495e;
  width: 220px;
  text-align: center;
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
}

.noX {
  width: 220px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.content {
  padding-top: 50px;
  justify-content: center;
  display: flex;
}
</style>