<template>
<div class="shareHouseOrign">

<el-dialog
    title
    :visible.sync="dialogShareVisible"
    :show="show"
    width="400px"
    v-if="dialogShareVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div>
      <qriously :value="qrcode" :size="117" id="qrcode"/>
      <img src="../../assets/img/uploadLoading.png" alt class="imortimgShare" />
      <div class="importTextHeadShare">分享房源</div>
      <div class="importTextShare">微信扫码，即可分享</div>
      <!-- <el-button size="small" type="primary" class="uploadHouseBtn" @click="OnClose">关闭弹窗</el-button> -->
    </div>
  </el-dialog>
</div>
  
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    qrcode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogShareVisible: this.show,
      // qrcode: 'http://hihome-test.oss-cn-beijing.aliyuncs.com/'
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogShareVisible = this.show;
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
  }
};
</script>

<style lang="scss">
.shareHouseOrign{
.el-dialog__header{
  padding-top: 30px !important;
}

.imortimgShare {
  width: 220px;
  height: 80px;
  margin-top: 101px;
}
.imortimgBefore {
  width: 148px;
  height: 156px;
}
.importTextHeadShare {
  color: #444444;
  font-size: 16px;
  margin-top: 12px;
  font-weight: 500;
}
.importTextShare {
  margin: 10px 0 10px 0;
  color: #999999;
  font-weight: 400;
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#qrcode {
  width: 117px;
  height: 117px;
  margin: auto;
  border: 12px solid #116EF4;
  position: absolute;
  left: 32%;
  border-radius: 4px;
}

}

</style>