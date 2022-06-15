<template>
  <div style="padding: 30px">
    <div>
      <p style="font-weight: bold;margin-bottom: 20px"> 头像</p>
      <div>
        <el-upload class="avatar-uploader" action="/api/upload/headImage" enctype="multipart/form-data"
                   :headers="headers" :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img style="border-radius: 50%;width: 150px;height: 150px" v-if="imageUrl" :src="imageUrl" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align: center;width: 150px;margin-top: 20px">点击重新上传</p>
      </div>
      <p style="font-weight: bold;margin-bottom: 30px;margin-top: 50px">基本信息</p>
      <div style="display: flex;margin-bottom: 30px">
        <div style="width: 280px;margin-right: 100px">
          <p style="margin-bottom: 5px">ID</p>
          <el-input
              v-model="userData._id"
              disabled
          >
          </el-input>
        </div>
        <div style="width: 280px;">
          <p style="margin-bottom: 5px">昵称</p>
          <el-input
              v-model="userData.nickName"
          >
          </el-input>
        </div>
      </div>
      <div style="display: flex;margin-bottom: 30px">
        <div style="width: 280px;margin-right: 100px">
          <p style="margin-bottom: 5px">手机号</p>
          <el-input
              v-model="userData.account"
          >
          </el-input>
        </div>
        <div style="width: 280px;">
          <p style="margin-bottom: 5px">邮箱</p>
          <el-input
              v-model="userData.mail"
          >
          </el-input>
        </div>
      </div>
      <div style="display: flex;margin-bottom: 30px">
        <div style="width: 280px;">
          <p style="margin-bottom: 5px">QQ</p>
          <el-input
              v-model="userData.qq"
          >
          </el-input>
        </div>

      </div>
    </div>
    <el-button style="width: 100px;">保存</el-button>
  </div>
</template>

<script>
import {getUserInfo} from "@/api/userInfo";
import router from "@/router";

export default {
  data() {
    return {
      userData: {},
      headers: {},
      imageUrl: ''
    }
  },
  beforeMount() {
    const data = localStorage.getItem('token')
    this.headers = {
      "Token": data
    }
    this.userData = localStorage.getItem('userInfo')
    this.userData = JSON.parse(this.userData)
    this.imageUrl = this.$imgApi + this.userData.headImage
  },
  methods: {
    // 上传头像成功后的回调
    async handleAvatarSuccess(response) {
      if (response.status !== 200) {
        this.$notify({
          title: '警告',
          message: '上传失败!',
          type: 'warning'
        });
        return
      }
      await this.getPageInfo()
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
        location.
        reload()
      }
    }


  }
}
</script>

<style scoped>

</style>