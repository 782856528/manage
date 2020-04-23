<template>
  <div class="app-container">
    <div>
      <el-button type="success" @click="add('1')" class="btn">添加分类</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column label="头像"  align="center">
        <template slot-scope="scope">
          <img :src="scope.row.file" alt="" style="width:4rem;height:4rem">
        </template>
      </el-table-column>-->
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="权重" align="center">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="add(scope.row)"
            class="btn"
            v-if="scope.row.children||scope.row.parentId==0"
          >添加</el-button>
          <el-button @click="edit('edit',scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add v-if="adddia" @close="close" :level="level"></add>
    <edit v-if="editdia" @close="close" :item="item"></edit>
  </div>
</template>

<script>
import { getList, del } from '@/api/table'
import add from './api/add'
import edit from './api/edit'
export default {
  components: {
    add,
    edit
  },
  data() {
    return {
      list: null,
      listLoading: true,
      data: '',
      adddia: false,
      editdia: false,
      item: '',
      page: 1,
      pageSize: 1,
      children: '',
      level: ''
    }
  },
  created() {
    this.searchcategory()
  },
  methods: {
    searchcategory(id) {
      this.$http.get('/manage/categoryList').then(res => {
        this.listLoading = false
        var a = []
        var b = []
        res.data.forEach(e => {
          if (e.parentId == 0) {
            e.children = []
            a.push(e)
          } else {
            b.push(e)
          }
        })
        for (let i = 0; i < a.length; i++) {
          for (let j = 0; j < b.length; j++) {
            if (a[i].id === b[j].parentId) {
              a[i].children.push(b[j])
            }
          }
        }

        this.list = a
      })
    },

    del(id) {
      this.$http
        .post('/manage/categorydel', { id: id })
        .then(res => {
          this.searchcategory()
        })
        .catch(() => {})
    },
    // 增加
    add(a) {
      this.adddia = true
      if (typeof a == 'string') {
        this.level = a
      } else {
        this.level = a.id
      }
    },
    // 编辑
    edit(a, row) {
      this.editdia = true
      this.item = row
    },
    close(a) {
      this.adddia = false
      this.editdia = false
      if (a) {
        this.searchcategory()
      }
    }
  }
}
</script>
<style  scoped>
.btn {
  margin-bottom: 10px;
}
</style>
