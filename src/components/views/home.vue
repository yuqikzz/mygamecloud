<template>
  <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="height: 94vh"
  >
    <div style="width: 100%;margin: 0 auto">


    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      loading: false
    }
  },
  async beforeMount() {
    this.loading = true

    this.loading = false

  },


}
</script>

<style scoped>

</style>