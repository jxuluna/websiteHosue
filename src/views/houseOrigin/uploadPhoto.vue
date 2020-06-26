<template>
  <el-dialog
    title
    :visible.sync="dialogImgVisible"
    :show="show"
    width="380px"
    v-if="dialogImgVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div v-if="isBeforeUpload">
      <div>
        <img src="../../assets/img/uploadAir.png" alt class="imortimgBefore" />
        <div class="importTextHead">上传图片</div>
      </div>
      <el-upload
        class="avatar-uploader"
        action="https://apps.hailuojia.com/common/upload"
        :show-file-list="false"
        :http-request="uploadSectionFile"
        :before-upload="beforeAvatarUpload"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <el-button size class="uploadHouseBtn" type="primary">选择文件</el-button>
      </el-upload>
    </div>

    <div v-else-if="!isBeforeUpload">
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

      <div class="importTextHead">上传图片</div>
      <div class="importText">上传中，请等待……</div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import api from "../../api/house";

export default {
  props: {
    show: { type: Boolean, default: false },
    house_code: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      dialogImgVisible: this.show,
      showProcess: false,
      percentageLength: 0,
      isBeforeUpload: true,
      customColor: "#306CFF"
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogImgVisible = this.show;
      }
    }
  },
  methods: {
    handleClose(done) {
      this.OnClose();
    },
    OnClose() {
      this.$emit("update:show", false);
      this.isBeforeUpload = true;
      this.showProcess = false;
    },
    format(percentage) {
      return percentage;
    },
    //上传文件
    uploadSectionFile: function(param) {
      //自定义文件上传
      var fileObj = param.file;
      // 接收上传文件的后台地址
      var FileController = "https://apps.hailuojia.com/common/upload";
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      // 其他参数
      form.append("type", "house");
      form.append("house_code", this.house_code);

      // 开始动画
      this.percentageLength = 0;
      this.showProcess = true;
      this.isBeforeUpload = false;
      const interval = setInterval(() => {
        if (this.percentageLength >= 99) {
          clearInterval(interval);
          return;
        }
        this.percentageLength += 1;
      }, 50);
      let that = this;
      axios
        .post(FileController, form, {
          headers: { enctype: "multipart/form-data" }
        })
        .then(response => {
          console.log(response);
          if (response.data.status === 0) {
            setTimeout(() => {
              that.percentageLength = 100;
              that.showProcess = false;
              that.isSuccess = true;
              that.OnClose();
              that.$message({
                message: "导入成功",
                type: "success"
              });
              api
                .updateHouse(that.$parent.id, {
                  image: JSON.stringify([response.data.data.url])
                })
                .then(res => {
                  let data = res.data;
                  if (data.status === 0) {
                    that.$parent.houstList.forEach(ele => {
                      ele.data.forEach(item => {
                        if (item.id == that.$parent.id) {
                          item.image = JSON.stringify([response.data.data.url])
                        }
                      })
                    })
                    that.$parent.getDetail();
                  }
                });
            }, 3000);
          } else {
            that.showProcess = false;
            that.isBeforeUpload = true;
            that.isSuccess = true;
            that.$message({
              message: "导入失败",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          that.showProcess = false;
          that.isBeforeUpload = true;
          that.isSuccess = true;
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
.imortimg {
  width: 190px;
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
  margin: 20px;
}
.importText {
  margin: 20px;
  color: #999999;
  .downUpload {
    color: #306cff;
    text-decoration: underline;
  }
}
.progressHouse {
  position: absolute;
  right: 138px;
  top: 62px;
  margin-top: -30px;
}
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>