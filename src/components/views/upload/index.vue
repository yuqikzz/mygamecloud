<template>
  <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="height: 94vh"
  >
    <div style="width: 25%;margin: 0 auto;padding-top: 40px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select style="width: 100%;" v-model="form.type" placeholder="请选择资源类型">
            <el-option v-for="(item,index) in resourceTypes" :key="index" :label="item.text"
                       :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="资源价格">
          <el-input v-model="form.BuyNB" placeholder="0为免费"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type===1" label="链接地址">
          <el-input v-model="form.link"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type===1" label="解压密码">
          <el-input v-model="form.ePaw" placeholder="无解压密码 无须填写"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type===2" label="文件上传">
          <el-upload
              class="upload-demo"
              drag
              :headers="headers"
              action="/api/upload/uploadR"
              :on-success="success"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">建议上传ZIP文件，且不超过100MB</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="资源描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即上传</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

import {getAllResourceTypes, addData} from '@/api/upload.js'

export default {
  data() {
    return {
      loading: false,
      form: {
        RList: []
      },
      resourceTypes: [],
      headers: {},

    }
  },
  async beforeMount() {
    this.loading = true
    const data = localStorage.getItem('token')
    if (!data) {
      await this.$router.push("/page/home")
    } else {
      this.headers = {
        "Token": data
      }
    }
    const dataA = await getAllResourceTypes()
    this.resourceTypes = dataA.data.data
    this.loading = false

  },

  methods: {

    async onSubmit() {
      const data = await addData(this.form)

      if (data.data.status === 200) {
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success'
        });

      } else if (data.data.status === 503) {
        this.$notify({
          title: '警告',
          message: data.data.msg,
          type: 'warning'
        });

      }
    },
    success(response) {

      this.form.RList.push(response.data.address)
    }
  }

}
</script>

<style scoped>

</style>