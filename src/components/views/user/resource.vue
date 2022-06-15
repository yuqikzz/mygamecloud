<template>
  <div style="padding: 30px">
    <el-table
        :data="dataArr"
        v-loading="loading"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#fafafa', color: 'rgba(0,0,0,.85)' }"
    >
      <el-table-column
          fixed
          prop="_id"
          label="ID"
          align="center"

      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="资源名称"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="BuyNB"
          label="资源价格"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="资源类型"
          align="center"

      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">网盘链接</span>
          <span v-if="scope.row.type === 2">文件上传</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="link"
          label="网盘地址"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="ePaw"
          label="解压密码"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="RList"
          label="文件"
          align="center"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          align="center"
      >
        <template slot-scope="scope">
          <el-button @click="delR(scope.row._id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {findU, uDelR} from "/src/api/userInfo";


export default {
  data() {
    return {
      dataArr: [],
      loading: false
    }
  },
  async beforeMount() {
    this.loading = true
    const data = await findU()
    if (data.status === 200) {
      this.dataArr = data.data.data
    }
    this.loading = false
  },
  methods: {
    async delR(id) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await uDelR(id)
        this.loading = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

<style scoped>

</style>