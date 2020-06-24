<template>
  <el-dialog
    title="房源分类"
    :visible.sync="dialogCardVisible"
    :show="show"
    width="400px"
    v-if="dialogCardVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="selectionCard"
  >
    <div>
      <div class="selectList">
        <div
          class="selectList-item"
          v-for="(item, index) in list"
          :key="index"
          @click="changeActive(item.id)"
        >
          <div class="left">
            <img src="../../assets/img/itemDeatilPhoto.png" alt class="itemDeatilImg" />
            <div>
              <p style="font-size:16px;font-weight:500;color:#333333">{{item.name}}</p>
              <p style="font-size:14px;font-weight:400;color:#999999">{{item.house_count}}套</p>
            </div>
          </div>
          <div class="check" :class="[item.selected === 1 ? 'check-active': 'check-default']"></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import api from "../../api/house";

export default {
  props: {
    show: { type: Boolean, default: false },
    house_code: {
      default: "",
      type: String
    },
    unique_id: {
      default: 0,
      type: String
    }
  },
  data() {
    return {
      dialogCardVisible: this.show,
      list: [],
      card_ids: []
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogCardVisible = this.show;
        if (this.house_code !== "") {
          this.getSelectCardt();
        }
      }
    }
  },
  methods: {
    handleClose() {
      let param = {
        unique_id: this.unique_id,
        house_code: this.house_code,
        card_ids: new Set(this.card_ids)
      }
      api.selectionHouse(param).then(response => {
        let data = response.data;
        let that = this;
        if (data.status === 0) {
          // that.getSelectCardt();
          that.$parent.getDetail();
          that.$parent.getList();
                this.$parent.getAllhouseOrignPart();
        }
      });
      this.OnClose();
      this.card_ids = [];
    },
    OnClose() {
      this.$emit("update:show", false);                
    },
    getSelectCardt() {
      let param = {
        unique_id: this.unique_id,
        house_code: this.house_code,
        result_type: "no_system"
      };
      api.getSelectionCard(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.list = data.data;
          this.list.forEach(elem => {
            if (elem.selected == 1) {
              this.card_ids.push(elem.id);
            }
          });
        }
      });
    },
changeActive(id) {
      let ar = this.list.find(function(elem) {
        return elem.id == id;
      });
      ar.selected = ar.selected == 1 ? 0 : 1;
      this.card_ids = [];
      this.list.forEach(item => {
        if (item.selected === 1) {
          this.card_ids.push(item.id)
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
.selectList-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  .left {
    display: flex;
    align-items: center;
    .itemDeatilImg {
      width: 70px;
      height: 70px;
    }
    div {
      text-align: left;
      margin-left: 10px;
      line-height: 24px;
    }
  }
  .check {
    height: 21px;
    width: 21px;
    background-size: cover;
  }
  .check-default {
    background-image: url("../../assets/img/check_default.png");
  }
  .check-active {
    background-image: url("../../assets/img/check_active.png");
  }
}
  #app .selectionCard {
  .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
    padding: 15px;
  }
  .el-dialog__body {
    padding: 0 20px 20px;
  } 
}
</style>