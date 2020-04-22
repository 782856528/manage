<template>
  <div class="app-container">
    <div>
      <el-button type="success" @click="add">添加用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
    
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
       <el-table-column label="年龄">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
       <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.file" alt="" style="width:4rem;height:4rem">
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({page:this.page,pageSize:this.pageSize}).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    del(id){
     this.$http.post("/manage/del", {id:id}).then(res => {
     this.fetchData()
    
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
         this.fetchData()
      }
    }
  }
}
</script>
