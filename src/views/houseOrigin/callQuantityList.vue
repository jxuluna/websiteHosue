<template>
  <el-dialog
    title="留电咨询"
    :visible.sync="dialogCardVisible"
    :show="show"
    width="550px"
    v-if="dialogCardVisible"
    :destroy-on-close="true"
    :before-close="handleClose"
    @opened='dialogInit'
    class="callQuantityList"
  >
    <div class="dialogDiv">
      <ul>
        <li class="stripe">
          <div class="column_1 column_tr">姓名</div>
          <div class="column_2 column_tr">手机号</div>
          <div class="column_3 column_tr">留言</div>
        </li>
        <li v-for="(item, index) in listData" :key="index" :class="[index%2==0?'normal_li':'stripe normal_li'] ">
          <div class="column_1">{{ item.nickname }}</div>
          <div class="column_2">{{ item.mobile }}</div>
          <div class="column_3">{{ item.purpose}}</div>
        </li>
      </ul>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="6"
      v-if="totalCount>6"
      class="pagination"
      layout="prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </el-dialog>
</template>

<script>
import api from "../../api/house";

export default {
  props: {
    show: { type: Boolean, default: false },
    // house_code: {
    //   default: "",
    //   type: String
    // },
    unique_id: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      dialogCardVisible: this.show,
      listData: [],
      currentPage: 1,

    };
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.dialogCardVisible = this.show;
      }
    }
  },
  mounted () {
    
  },
  methods: {
    dialogInit () {
      this.currentPage = 1;
      this.clientConsultationHandle(1);
    },
    handleClose () {
     this.$emit("update:show", false);
    },
    handleCurrentChange(val) {
      this.clientConsultationHandle(val);
    },
    clientConsultationHandle (currentPage) {
      api.clientConsultation({
        agent_unique_id: this.unique_id,
        p: currentPage,
        pz: 6
      }).then(res => {
        if ( res.data.status == 0 ) {
          this.listData = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
        }
      })
    }
  }
};
</script>

<style lang="scss">
.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(237,241,246,0.45);
}
.dialogDiv {
  width: 100%;
  padding-bottom: 25px;
  padding-top: 20px;
  ul {
    list-style: none;
    width: 100%;
    li {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      .column_1 {
        width: 96px;
      }
      .column_2 {
        width: 102px;
        line-height: 45px;
        border-left: 1px solid #edf0f5;
        border-right: 1px solid #edf0f5;
      }
      .column_3 {
        width: 320px;
      }
    }
    .stripe {
      background: rgba(237,241,246,0.45);
    }
    .column_tr {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
    }
    .normal_li div {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #999999;
    }
  }
}
.el-pager li.active {
    background: #365ff0;
    border-radius: 2px;
    color: #fff;
    cursor: default;
    
} 
.el-pager li {
  min-width: 20px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
  margin-top: 4px;
}
.callQuantityList button {
  height: 20px;
  line-height: 20px;
}
.el-dialog__title {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #444444;
  line-height: 22px;
}
#app .callQuantityList .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
    padding: 15px;
}
.el-input__inner {
  border: none;
}
</style>