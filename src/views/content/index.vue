<template>
  <div class="app-container">
    <div>
      <el-button type="success" @click="add" class="btn">添加内容</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
     <el-table-column label="标题"  align="center">
        <template slot-scope="scope">
         {{ scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
       <el-table-column label="是否热门" align="center">
        <template slot-scope="scope">
          {{ scope.row.ishot }}
        </template>
      </el-table-column>
       <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
       <el-table-column label="创建时间"  align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
     
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button  @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add v-if="adddia" @close="close"></add>
        <edit v-if="editdia" @close="close" :item='item'></edit>
  </div>
</template>

<script>
import { getList,del } from '@/api/table'
import add from './api/add'
import edit from './api/edit'
export default {
  components:{
    add,
    edit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {

    return {
      list: null,
      listLoading: true,
      data:"",
      adddia:false,
      editdia:false,
      item:"",
      page:1,
      pageSize:1
    }
  },
  created() {
    this.searchcategory()

  },
  methods: {
  
    searchcategory() {
      this.$http.get('/manage/contentList').then(res => {
        this.listLoading = false
        this.list = res.data
      })
    },
    del(id){
     this.$http.post("/manage/contentdel", {id:id}).then(res => {
     this.searchcategory()
      }).catch(()=>{});
    },
    // 增加
    add(){
      this.adddia=true;
    },
    // 编辑
    edit(row){
      this.editdia=true;
      this.item=row
    },
    close(a){
        this.adddia=false;
        this.editdia=false;
      if(a){
         this.searchcategory()
      }
    }
  }
}
</script>
<style  scoped>
.btn{
  margin-bottom:10px;
}
</style>
