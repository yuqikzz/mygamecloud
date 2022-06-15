<template>
  <div style="display: flex;justify-content: space-between;"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
<!--    <img :src="$imgApi+imgUrl"-->
<!--         style="width: 45%;height: 100vh; animation-duration: 10s">-->
    <div style="width: 35%;height: 100vh">

    </div>
    <div style="width: 40%;margin-top: 10%" class="animate__animated animate__fadeInRightBig">
      <p style="font-size: 40px;margin-bottom: 20px">MyGameCloud</p>
      <p style="font-size: 28px;margin-bottom: 64px;line-height: 1.2; color: #333;">游戏是第九艺术。</p>

      <div>
        <input type="text"
               class="inputA"
               placeholder="手机号"
               v-model="form.account"
        >
        <p>
          <input type="text"
                 class="inputA"
                 placeholder="昵称"
                 v-model="form.nickName"
          >
        </p>
        <p>
          <input type="text"
                 class="inputA"
                 placeholder="邀请码"
                 v-model="form.code"
          >
        </p>
        <input type="password"
               class="inputA"
               v-model="form.password"
               placeholder="密码">

        <div>
          <el-button type="text" style="margin-top: 20px" @click="goToReg">去登录</el-button>
        </div>

        <div style="margin-top: 0px">
          <button v-on:mouseleave="styleD"
                  v-on:mouseenter="styleC"
                  :class="isCStyle?'isCs':'noCs'"
                  @click="reg"
          >
            注册
          </button>
        </div>


      </div>
    </div>

  </div>
</template>

<script>

import {getCarousel} from "@/api/home";

export default {
  data() {
    return {
      loading: false,
      input: '',
      form: {
        account: '',
        password: '',
        nickName: '',
        code: ''
      },
      isCStyle: false,
      imgUrl: ''

    }
  },
  async beforeMount() {
    const dataA = localStorage.getItem('imgUrl')
    if (!dataA) {
      const data = await getCarousel()
      this.imgUrl = data.data.data[0].path
      localStorage.setItem('imgUrl', this.imgUrl)
    } else {
      this.imgUrl = dataA
    }
  },
  methods: {
    goToReg() {
      this.$router.push('/')
    },
    async reg() {
      if (this.form.account === '') {
        this.$notify({
          title: '警告',
          message: '请输入手机号',
          type: 'warning'
        });
        return

      }

      if (!this.regPhone.test(this.form.account)) {
        this.$notify({
          title: '警告',
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return
      }

      if (this.form.nickName === '') {
        this.$notify({
          title: '警告',
          message: '请输入昵称',
          type: 'warning'
        });
        return
      }

      if (this.form.code === '') {
        this.$notify({
          title: '警告',
          message: '请输入邀请码',
          type: 'warning'
        });
        return
      }

      if (this.form.password === '') {
        this.$notify({
          title: '警告',
          message: '请输入密码',
          type: 'warning'
        });
        return
      }
      let pawReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
      if (!pawReg.test(this.form.password)) {
        this.$notify({
          title: '警告',
          message: '密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字',
          type: 'warning'
        });
        return
      }

      this.loading = true
      let _this = this
      setTimeout(async function () {
        const data = await _this.$axios.post('/api/users/reg', _this.form)
        _this.loading = false
        if (data.data.status === 200) {
          _this.$notify({
            title: '成功',
            message: '注册成功,即将跳转登录',
            type: 'success'
          });
          setTimeout(function () {
                _this.$router.push('/')
              }
              , 1500
          )
        } else {
          _this.$notify({
            title: '警告',
            message: data.data.msg,
            type: 'warning'
          });
        }
      }, 2000)


    },
    styleC() {
      this.isCStyle = true
    },
    styleD() {
      this.isCStyle = false
    }
  }
}
</script>


<style scoped>
.isCs {
  width: 478px;
  height: 50px;
  margin: 40px 0 8px;
  font-size: 24px;
  background: #3083ff;
  border: none;
  color: #ffffff;
  border-radius: 2px
}

.noCs {
  width: 478px;
  height: 50px;
  margin: 40px 0 8px;
  font-size: 24px;
  background-image: linear-gradient(0deg, #398bff, #3083ff);
  border: none;
  color: #ffffff;
  border-radius: 2px

}

.inputA {
  border: 1px #aaa solid;
  border-radius: 4px;
  background: 0 0;
  text-align: left;
  font-size: 20px;
  width: 438px;
  height: 50px;
  padding: 0 20px;
  margin-bottom: 20px
}


</style>
