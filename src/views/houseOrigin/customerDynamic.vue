<template>
  <div class="customerDynamicAll">
    <div class="DynamicHeader">
      <div class="DynamicHeaderBtn">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <div type="primary" @click="onSubmit" class="callTotal">
              <div class="callQuantityNums">100</div>
              <div class="callQuantityNumerbers">留电咨询</div>
            </div>
            <div type="primary" @click="onSubmit" class="buttonHouseCount customerTotal">
              <div class="callQuantityNums">100</div>
              <div class="callQuantityNumerbers">累计客户</div>
            </div>
            <div type="primary" @click="onSubmit" class="buttonHouseCount todayAdd">
              <div class="callQuantityNums">100</div>
              <div class="callQuantityNumerbers">今日新增</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="DynamicHeaderDown">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索">
            <el-input v-model="formInline.user" placeholder="请输入小区名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="buttonSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="shareDetailImg('获客')" class="buttonSearch">分享获客</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <shareHouse :show.sync="dialogShareVisible" :id="id" :qrcode="qrcode" />

  </div>
</template>

<script>
import shareHouse from "./shareHouse";


export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      dialogShareVisible: false,
      id: 0,
      house_code: "",
    qrcode:''
    };
  },
  methods:{
  shareDetailImg(name) {
    this.dialogShareVisible = true;
    if (name == "获客") {
        debugger
      this.qrcode = "https://tucs.hailuojia.com/wechat/oauth";
    } else {
      this.qrcode = `https://th5agent.hailuojia.com/detail`;
    }
  },

  },
    components: {
    shareHouse,
  }

};
</script>

<style lang="scss" scoped>
.DynamicHeader {
  padding: 30px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .DynamicHeaderBtn {
    padding: 0 140px;
    /deep/ .el-form-item__content {
      display: flex;
    }
    .buttonHouseCount {
      width: 200px;
      height: 70px;
      border-radius: 10px;
      background-color: #a3a5ba;
      box-shadow: 0px 5px 18px #a3a5ba;
    }
    .callTotal {
      width: 200px;
      height: 70px;
      border-radius: 10px;
      margin-right: 58px;
      background: linear-gradient(left, #4cd1a9, #54e272);
      box-shadow: 0px 5px 18px #4cd1a9;
      cursor: pointer;
    }
    .callQuantityNums {
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
      color: #fff;
    }
    .callQuantityNumerbers {
      font-size: 16px;
      font-weight: 400;
      line-height: 12px;
      color: #fff;
    }
    .customerTotal {
      margin-right: 58px;
    }
  }
  .DynamicHeaderDown {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    /deep/ .el-form-item__label {
      font-size: 16px;
      font-weight: 500;
      color: #444444;
      padding-right: 30px;
    }
    /deep/ .el-input__inner {
      height: 36px;
      width: 243px;
      border: 1px solid #d8dde2;
    }
    .buttonSearch {
      width: 100px;
      height: 36px;
      margin-left: 30px;
    }
  }
}
</style>