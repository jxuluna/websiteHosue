<template>
  <el-dialog
    title
    :visible.sync="dialogVisible"
    :show="show"
    width="400px"
    v-if="dialogVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div v-if="isBeforeUpload && !isSuccess">
      <div>
        <img src="../../assets/img/uploadAir.png" alt class="imortimgBefore" />
        <div class="importTextHead">上传房源</div>
        <div class="importText">
          导入表格请按照模板填写，请先
          <span class="downUpload">
            <a href="http://hihome-test.oss-cn-beijing.aliyuncs.com/house_template.xlsx" style="color: #306cff;text-decoration: underline;">
            下载模板
            </a>
            </span>
        </div>
      </div>
      <el-upload
        class="upload-demo"
        action="rrrrsvdd"
        :data="dataFile"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="true"
        :before-upload="beforeUpload"
        :http-request="uploadSectionFile"
        name="filename"
      >
        <!--此处使用自定义上传实现http-request-->

        <el-button size class="uploadHouseBtn" type="primary">选择文件</el-button>
      </el-upload>
      <!-- <form action="https://tapps.hailuojia.com/admin/uploadhouse/batch" method="post" enctype="multipart/form-data">
      <input type="text" value="9579148" name="unique_id"/>
      <input type="file" name="logo">
      <input type="submit"  value="提交">
      </form>-->
    </div>
    <div v-else-if="!isBeforeUpload  && !isSuccess">
      <el-progress
        v-show="showProcess"
        :text-inside="false"
        type="circle"
        :stroke-width="12"
        :percentage="percentageLength"
        :color="customColor"
        class="progressHouse"
        :format="format"
      ></el-progress>
      <img src="../../assets/img/uploadLoading.png" alt class="imortimg" />

      <div class="importTextHead">上传房源</div>
      <div class="importText">上传中，请等待……</div>
    </div>
    <div v-else-if="isSuccess">
      <div>
        <img src="../../assets/img/uploadSuccess.png" alt class="imortimgBefore" />
        <div class="importTextHead">导入成功</div>
        <div class="importText">成功导入{{total_count}}套房源</div>
        <el-button size="small" type="primary" class="uploadHouseBtn" @click="OnClose">我知道了</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import api from "../../api/house";
import { mapGetters } from "vuex";

export default {
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      dialogVisible: this.show,
      fileList: [],
      dataFile: {
        // unique_id: "9579148",
      },
      showProcess: false,
      percentageLength: 0,
      isBeforeUpload: true,
      isSuccess: false,
      customColor: "#306CFF",
      filename: "",
      total_count: ""
    };
  },
  computed: {
    ...mapGetters(["unique_id"])
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogVisible = this.show;
      }
    }
  },
  methods: {
    handleClose(done) {
      this.OnClose();
    },
    handleChange(file, fileList) {},
    OnClose() {
      this.$emit("update:show", false);
      this.isSuccess = false;
      this.isBeforeUpload = true;
      this.showProcess = false;
      this.$parent.getList();
      this.$parent.getAllhouseOrignPart();
    },
    format(percentage) {
      return percentage;
    },
    // 上传之前文件验证
    beforeUpload(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
    },
    //上传文件
    uploadSectionFile: function(param) {
      //自定义文件上传
      var fileObj = param.file;
      // 接收上传文件的后台地址
      var FileController =
        "https://tapps.hailuojia.com/admin/uploadhouse/batch";
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("filename", fileObj);
      // 其他参数
      form.append("unique_id", this.unique_id);

      // 开始动画
      //this.percentageLength = 0;
      this.showProcess = true;
      this.isBeforeUpload = false;
      // const interval = setInterval(() => {
      //   if (this.percentageLength >= 99) {
      //     clearInterval(interval);
      //     return;
      //   }
      //   this.percentageLength += 1;
      // }, 20);
      let that = this;
      axios
        .post(FileController, form, {
          headers: { enctype: "multipart/form-data" },
          onUploadProgress:function(progressEvent){ 
            let percent = parseInt(progressEvent.loaded / progressEvent.total * 100 | 0);
            if ( percent < 100 ) {
              that.percentageLength = percent;
            }
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status === 0) {
            that.total_count = response.data.data.total_count;
            that.isSuccess = true;
            that.$parent.getList();
            that.$parent.getDetail();
            that.showProcess = false;
            // setTimeout(() => {
            //   that.percentageLength = 100;
            //   that.showProcess = false;
            //   that.isSuccess = true;
            //   that.$parent.getList();
            //   that.$parent.getDetail();
            // }, 3000);
            that.filename = response.data.data.filename;
          } else {
            that.showProcess = false;
            that.isBeforeUpload = true;
            that.isSuccess = false;
            that.$message({
              message: response.data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          that.showProcess = false;
          that.isBeforeUpload = true;
          that.isSuccess = false;
          that.$message({
            message: error,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.imortimg {
  width: 200px;
  height: 74px;
  margin-top: 86px;
}
.imortimgBefore {
  width: 148px;
  height: 156px;
}
.importTextHead {
  color: #444444;
  font-size: 16px;
  margin: 16px;
}
.importText {
  margin: 20px;
  color: #999999;
}
.progressHouse {
  position: absolute;
  right: 138px;
  top: 62px;
  margin-top: -30px;
}
</style>