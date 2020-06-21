<template>
  <div id="app">
    <index />
  </div>
</template>

<script>
import index from "./views/index/index";

export default {
  components: {
    index
  }
};
</script>


<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .el-button--primary {
    color: #fff;
    background-color: #306cff;
    border-color: #306cff;
    line-height: 4px;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
  .el-button--default {
    line-height: 4px;
  }
  .el-tabs__item.is-active{
    color: #0F79F5;
    font-weight: 600;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .el-button--primary.is-active,
  .el-button--primary:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
  }
  .el-dialog__body {
    padding: 0 20px 20px;
  }
  .el-dialog {
    border-radius: 10px;
  }
  // .el-progress__text {
  //   background: url('./assets/img/progress.png');
  // }
  div::-webkit-scrollbar {
    width: 0;
  }
  .el-progress__text {
    color: #306cff;
    font-size: 26px !important;
    font-weight: 600;
    line-height: 33px;
  }
  .el-progress__text::after {
    content: "%";
    color: #999999;
    display: inline;
    font-size: 12px;
  }
  .uploadHouseBtn {
    width: 160px;
    height: 36px;
    border-radius: 4px;
  }
  .el-dialog__header {
    text-align: left;
  }
  .el-timeline-item__wrapper {
    text-align: left;
  }
  .el-timeline-item__timestamp {
    color: #000;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    .iphone {
      width: 296px;
      height: 500px;
    }
  }
  .el-textarea .el-input__count {
    background: none;
    bottom: -4px;
  }
}
</style>
