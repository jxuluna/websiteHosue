<template>
  <div class="brokerEntry">
    <div class="activeHouseTab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的房子" name="first">
          <myHouseShow/>
        </el-tab-pane>
        <el-tab-pane label="客户动态" name="second">
          <customerDynamic/>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import myHouseShow from "./myHouseShow"
import customerDynamic from "./customerDynamic"


export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  //   watch: {
  //   $route(to, from) {
  //     if (to.path == "/myHouse") {
  //       this.getList();
  //       this.getStaticClient();
  //       this.getUserDynamicList();
  //     }
  //   }
  // },
  components:{
    myHouseShow,
    customerDynamic,
  }
};
</script>

  
<style lang="scss" scoped>
.brokerEntry {
  background-color: #f5f5f8;
  min-height: calc(100vh - (90px + 77px));
  width: 100%;
  overflow: hidden;
  .activeHouseTab {
    background-color: #ffffff;
    // height: 160px;
    width: 1090px;
    margin: auto;
    margin-top: 30px;
  }
}
/deep/ .el-tabs__nav {
  transform: translateX(68px) !important;
  .el-tabs__active-bar {
    left: 16px;
    background: #306cff;
    border-radius: 3px;
    width: 30px !important;
    height: 4px;
  }
  .el-tabs__item {
    font-size: 14px;
    color: #333333;
    font-weight: 400;
    margin: 12px 0;
    padding: 0 60px;
  }
}
</style>