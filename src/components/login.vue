<template>
  <div
      style="display: flex; justify-content: space-between"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div style="width: 35%; height: 100vh"></div>

    <div
        style="width: 40%; margin-top: 10%"
        class="animate__animated animate__fadeInRightBig"
    >
      <p style="font-size: 40px; margin-bottom: 20px">MyGameCloud</p>
      <p
          style="
          font-size: 28px;
          margin-bottom: 64px;
          line-height: 1.2;
          color: #333;
        "
      >
        游戏是第九艺术。
      </p>
      <div>
        <p>
          <input
              type="text"
              style="
              border: 1px #aaa solid;
              border-radius: 4px;
              background: 0 0;
              text-align: left;
              font-size: 20px;
              width: 438px;
              height: 50px;
              line-height: 50px;
              padding: 0 20px;
              margin-bottom: 40px;
            "
              placeholder="账号"
              v-model="form.account"
          />
        </p>
        <p>
          <input
              type="password"
              v-model="form.password"
              style="
              border: 1px #aaa solid;
              border-radius: 4px;
              background: 0 0;
              text-align: left;
              font-size: 20px;
              width: 438px;
              height: 50px;
              line-height: 50px;
              padding: 0 20px;
            "
              placeholder="密码"
          />
        </p>
        <div>
          <el-button type="text" style="margin-top: 20px" @click="goToReg"
          >去注册
          </el-button
          >
        </div>
        <div style="margin-top: 0px">
          <button
              v-on:mouseleave="styleD"
              v-on:mouseenter="styleC"
              :class="isCStyle ? 'isCs' : 'noCs'"
              @click="login"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      input: "",
      form: {
        account: "",
        password: "",
      },
      isCStyle: false,
      num: 0,
      imgUrl: "",
    };
  },

  methods: {
    goToReg() {
      this.$router.push("/reg");
    },
    async login() {
      if (this.form.account === "") {
        this.$notify({
          title: "警告",
          message: "请输入账号",
          type: "warning",
        });
        return;
      }

      if (this.form.password === "") {
        this.$notify({
          title: "警告",
          message: "请输入密码",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      let _this = this;
      setTimeout(async function () {
        const data = await _this.$axios.post("/api/users/login", _this.form);
        _this.loading = false;
        if (data.data.status === 200) {
          _this.$notify({
            title: "成功",
            message: "登录成功,即将跳转",
            type: "success",
          });
          window.localStorage.clear();

          localStorage.setItem("token", data.data.token);

          setTimeout(function () {
            _this.$router.push("/page/home");
          }, 1500);
        } else {
          _this.$notify({
            title: "警告",
            message: data.data.msg,
            type: "warning",
          });
        }
      }, 2000);
    },
    styleC() {
      this.isCStyle = true;
    },
    styleD() {
      this.isCStyle = false;
    },
  },
};
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
  border-radius: 2px;
}

.noCs {
  width: 478px;
  height: 50px;
  margin: 40px 0 8px;
  font-size: 24px;
  background-image: linear-gradient(0deg, #398bff, #3083ff);
  border: none;
  color: #ffffff;
  border-radius: 2px;
}
</style>
