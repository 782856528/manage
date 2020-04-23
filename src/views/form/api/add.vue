<template>
  <!-- <el-card> -->
  <el-dialog
    iconClass="el-icon-info"
    title="新增分类"
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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="innerItem.name"></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="sort">
        <el-slider v-model="innerItem.sort" show-input></el-slider>
      </el-form-item>
       <el-form-item label="内容："
        prop="content">
        <Editor class="inp"
          id="tinymce"
          :content="innerItem.content"
          @changed="(value)=>{this.innerItem.content=value}"></Editor>
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
  props: ['level'],
  components:{
Editor
  },
  data() {
    return {
      searchPage: 1,
      searchPageSize: 10000,
      searchList: [],
      searchGoodName: '',
      chanpin: [],
      isDialog: true,
      innerItem: {
        id: '',
        name: '',
        sort:0,
        parentId:"",
        content:""
      },
      rules: {
        sort: [{ required: true, message: '请输入权重' }],
        name: [{ required: true, message: '请输入名称' }],
      }
    }
  },
  created() {
    if(this.level==1){
      this.innerItem.parentId=0;
    }else{
      this.innerItem.parentId=this.level
    }
  },
  methods: {
    handleSelect(item) {
      this.innerItem.refId = item.id
      this.searchGoodName = item.name
    },
    close() {
      this.$emit('close')
    },

    // 图片上传函数
    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http
        .post('/manage/upload', form)
        .then(res => {
          this.innerItem.pic = res.imgurl
        })
        .catch(() => {})
    },

    submit() {
      this.$refs.innerItem.validate(valid => {
        if (!valid) return
        this.$http
          .post('/manage/categoryAdd', {
            parentId: this.innerItem.parentId,
            name: this.innerItem.name,
            sort: this.innerItem.sort,
          })
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

