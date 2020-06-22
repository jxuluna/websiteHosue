<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogDescVisible"
    :show="show"
    width="400px"
    v-if="dialogDescVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="addDescDia"
  >
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item label prop="desc">
          <el-input type="textarea" maxlength="200" show-word-limit placeholder="请输入房源描述" v-model="ruleForm.desc" :autosize="{minRows:4}"></el-input>
        </el-form-item>
        <el-form-item class="buttonDesc">
          <el-button style="width:100px;height:36px" type="primary" :loading="loading" @click="submitForm('ruleForm')">确认</el-button>
          <el-button style="width:100px;height:36px;margin-left:20px" @click="OnClose">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import api from "../../api/house";

export default {
  props: {
    show: { type: Boolean, default: false },
    title: {
      default: "添加描述",
      type: String
    },
    id: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      dialogDescVisible: this.show,
      ruleForm: {
        desc: ""
      },
      rules: {
        desc: [{ required: true, message: "请输入房源描述", trigger: "blur" }]
      },
      loading: false
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogDescVisible = this.show;
        if (this.title == '修改描述') {
          this.ruleForm.desc = this.$parent.agent_house_intro;
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.OnClose();
    },
    OnClose() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.ruleForm.desc = "";
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          this.loading = true;
          api.updateHouse(this.id, {agent_house_intro: this.ruleForm.desc}).then(res => {
            let data = res.data;
            if (data.status === 0) {
              that.$message({
                message: "更新成功",
                type: "success"
              });
              that.loading = false;
              that.OnClose();
              that.$parent.getDetail();
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
//   border: 1px dashed #d9d9d9;
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
.el-icon-loading {
  line-height: 4px;
}
#app .addDescDia {
  .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
    padding: 15px;
  }
  .el-dialog__body {
    padding: 20px 30px 30px 30px;
    .buttonDesc{
      margin-top: 40px;
    }

  } 
}
</style>