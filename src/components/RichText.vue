
<template>
  <div>
    <vue-editor :id="id" v-model="localContent" :init="init"></vue-editor>
  </div>
</template>
<script>
  // import tinymce from "tinymce/tinymce";
  // import "tinymce/themes/silver/theme";
  // import VueEditor from "@tinymce/tinymce-vue";
  // import "tinymce/plugins/image";
  // import "tinymce/plugins/link";
  // import "tinymce/plugins/code";
  // import "tinymce/plugins/table";
  // import "tinymce/plugins/lists";
  // import "tinymce/plugins/contextmenu";
  // import "tinymce/plugins/wordcount";
  // import "tinymce/plugins/colorpicker";
  // import "tinymce/plugins/textcolor";
  // import tinymce from 'tinymce/tinymce'
  import tinymce from "tinymce/tinymce";
import VueEditor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
  export default {
    props:["content","id","height1"],
    components:{
      VueEditor
    },
    data() {
      return {
        localContent:this.content,
        init: {
          language_url: "tinymce/zh_CN.js",
          language: "zh_CN",
          skin_url: 'tinymce/skins/lightgray',
          height: this.height1 || 500,
          plugins: "link lists image code table colorpicker textcolor wordcount contextmenu",
          toolbar: "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
          branding: false,
          convert_urls: false,
          images_upload_handler: (blobInfo, success, failure) => {

            let formData = new FormData();
            formData.append("file", blobInfo.blob());
            this.$http.post("/manage/upload", formData).then(res => {
              success( res.imgurl);
            });
          }
        }
      };
    },
    mounted() {
      tinymce.init({})
    },
 
    watch:{
      content(value){
        this.localContent =value
       
      },
      localContent(value){
        this.$emit("changed",value)
      }
    }    
  };
</script>
<style lang="scss" scoped>
</style>
