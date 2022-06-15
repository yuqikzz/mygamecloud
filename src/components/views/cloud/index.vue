<template>
  <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="height: 94vh"
  >
    <div>
      <div v-for="(item,index) in list" :key="index"
           style="margin: 0 auto 20px;width: 40%;border: 1px solid skyblue;padding: 20px;border-radius: 10px">
        {{ item.name }}
        <div v-if="item.type===1">
          网盘链接:{{ item.link }}
        </div>
        <div v-if="item.type===2">
          <p>文件列表</p>
          <div v-for="(itemA,indexA) in item.RList" :key="indexA"
               style="display: flex;justify-content: space-between;align-items: center">
            <div> {{ `文件(${indexA + 1}): ` + itemA.substring(5, 99) }}</div>
            <el-button type="text" @click="goToPage(itemA)">下载</el-button>
          </div>
        </div>
        <div>
          简介: {{ item.desc }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getAll} from '@/api/upload.js'


export default {
  data() {
    return {
      loading: false,
      page: {
        curPage: 1,
        eachPage: 10
      },
      list: []
    }
  },
  async beforeMount() {
    this.loading = true
    const data = await getAll(this.page)
    this.list = data.data.rows
    this.loading = false
  },
  methods: {
    goToPage(url) {
      window.location.href = this.$imgApi + url
    }

  }


}
</script>

<style scoped>

</style>