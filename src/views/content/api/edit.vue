<template>
  <!-- <el-card> -->
  <el-dialog
    iconClass="el-icon-info"
    title="编辑内容"
    width="1000px"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form
      :model="innerItem"
      :rules="rules"
      ref="innerItem"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title" >
        <el-input v-model="innerItem.title" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="innerItem.remark" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="remark">
        <el-cascader
  v-model="code"
          :options="list"
          style="width:80%"
          :props="{ checkStrictly: true }"
          @change="changetype"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="是否热门" prop="ishot">
        <el-select v-model="innerItem.ishot" placeholder="请选择" style="width:80%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="权重" prop="sort">
        <el-slider v-model="innerItem.sort" show-input style="width:80%"></el-slider>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <Editor
          class="inp"
          id="tinymce"
          :content="innerItem.content"
          @changed="(value)=>{this.innerItem.content=value}"
        ></Editor>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
  <!-- </el-card> -->
</template>

<script>
// import { constants } from 'crypto'
import Editor from '@/components/RichText'
export default {
  props: ['item'],
  components: {
    Editor
  },
  data() {
    return {
      searchPage: 1,
      searchPageSize: 10000,
      searchList: [],
      searchGoodName: '',
      chanpin: [],
      list: [],
      isDialog: true,
      code:[],
      options: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      innerItem: {
        
      },
      rules: {
        sort: [{ required: true, message: '请输入权重' }],
         title: [{ required: true, message: '请输入标题' }],
        ishot: [{ required: true, message: '请选择是否热门' }],
        remark: [{ required: true, message: '请输入备注' }],
        content: [{ required: true, message: '请输入内容' }],
        type_id: [{ required: true, message: '请选择类型' }]
      }
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
            e.value = e.id
            e.label = e.name
            a.push(e)
          } else {
            e.value = e.id
            e.label = e.name
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
          this.list.forEach(e => {
            if(e.children){
                e.children.forEach(r => {
                if(this.item.type_id==r.id){
                  this.code=[e.id,this.item.type_id]
                }
            });
            }else{
              this.code=[this.item.type_id]
            }
          
          });   
            this.innerItem=this.item
        
      })
    },
    changetype(e) {
      if (e.length > 1) {
        this.innerItem.type_id = e[1]
      } else {
        this.innerItem.type_id = e[0]
      }
    },
    handleSelect(item) {
      this.innerItem.refId = item.id
      this.searchGoodName = item.name
    },
    close() {
      this.$emit('close')
    },


    submit() {
      console.log(this.innerItem)
      this.$refs.innerItem.validate(valid => {
        if (!valid) return
        this.$http
          .post('/manage/contentEdit', this.innerItem)
          .then(res => {
            this.$emit('close', '1')
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  margin-left: 20px;
}
.avatar {
  width: 100%;
  height: 100%;
}
.u_editor {
  height: 500px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.leixing {
  width: 90%;
}
.duixiang {
  width: 80%;
}
.img {
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  line-height: 150px;
}
img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.src {
  width: 150px;
  height: 150px;
}
.test1 {
  font-size: 10px;
}
</style>

