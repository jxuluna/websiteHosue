<template>
  <div class="customerDynamicAll">
    <div class="DynamicHeader">
      <div class="DynamicHeaderBtn">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <div type="primary" @click="isDialogPhoneVisible" class="callTotal">
              <div class="callQuantityNums">{{consultation_num}}</div>
              <div class="callQuantityNumerbers">留电咨询</div>
            </div>
            <div type="primary" class="buttonHouseCount customerTotal">
              <div class="callQuantityNums">{{client_total_num}}</div>
              <div class="callQuantityNumerbers">累计客户</div>
            </div>
            <div type="primary" class="buttonHouseCount todayAdd">
              <div class="callQuantityNums">{{today_client_num}}</div>
              <div class="callQuantityNumerbers">今日新增</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="DynamicHeaderDown">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索">
            <el-input v-model="formInline.nickname" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUserDynamicList" class="buttonSearch">查询</el-button>
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
    <div v-if="userDynamicList.length === 0" class="uploaddetail noData">
      <img src="../../assets/img/noData.png" />
      暂无动态
    </div>
    <div class="houseDynamicUser">
      <div class="timeScroll">
        <ul class="infinite-list" v-infinite-scroll="load">
          <li
            v-for="(item,index) in userDynamicList"
            class="infinite-list-item"
            :class="{'infinite-list-item-active': activeTabTwoIndex === index}"
            @click="changeActiveTwoIndex(index, item.unique_id, item)"
            :key="index"
          >
            <div class="itemDeatil">
              <img :src="item.headimgurl" alt class="itemDeatilImg" />
              <div>
                <p class="itemDeatilText">{{item.nickname}}</p>
                <div class="newUserTime" :class="{'oldUserTime' : item.user_type === '老用户'}">
                  <div class="newConsumer">{{item.user_type}}</div>
                  <div class="newTimeBefore">{{item.last_visit_time | diffTime}}</div>
                </div>
                <div class="scanTimeTotal">
                  <div class="timeLong">
                    <span class="bold">{{item.total_visit_time | formatMinute}}</span>
                    <span class="scanTotal">
                      浏览 ·
                      <span class="bold">{{item.house}}</span>套房 ·
                      <span class="bold">{{item.information}}</span>资讯
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="arrow"></div>
          </li>
        </ul>
      </div>
    </div>
    <addDesc :show.sync="dialogDescVisible" :title="descTitle" :id="id" />
    <shareHouse :show.sync="dialogShareVisible" :id="id" :qrcode="qrcode" />
    <selectionCard :show.sync="dialogCardVisible" :house_code="house_code" :unique_id="unique_id" />
    <callQuantityList :show.sync="dialogCallQuantityVisible" :unique_id="unique_id" />
  </div>
</template>
<script>
import uploadExcel from "./uploadExcel";
import uploadPhoto from "./uploadPhoto";
import addDesc from "./addDesc";
import shareHouse from "./shareHouse";
import selectionCard from "./selectionCard";
import api from "../../api/house";
import { mapGetters } from "vuex";
import config from "@/config";
import callQuantityList from "./callQuantityList";

const baseUrl = config.IMGURL;

export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      count: 1,
      dialogVisible: false,
      dialogImgVisible: false,
      dialogDescVisible: false,
      dialogShareVisible: false,
      dialogCardVisible: false,
      dialogCallQuantityVisible: false,
      descTitle: "",
      res_block_name: "",
      house_type: "",
      name: "",
      house_direction: "",
      build_area: "",
      room_sub_info: "",
      house_price: "",
      see_num: "",
      res_block_name: "",
      house_price: "",
      build_area: "",
      house_type: "",
      house_cards: [],
      client_total_num: 0,
      today_client_num: 0,
      consultation_num: 0,
      activeTabOneIndex: 0,
      activeTabTwoIndex: 0,
      agent_house_intro: null,
      image: [],
      house_code: "",
      id: 0,
      houstList: [],
      totalImportCount: 0, //上传总房源
      inCardImportHouseCount: 0, //分类房源
      block_or_area: "", // 小区名称或商圈名称
      qrcode: "", // 二维码
      pz: 500,
      p: 1,
      userList: [],
      userDynamicList: [],
      nickname: "",
      headimgurl: "",
      last_visit_time: "",
      user_type: "",
      information: "",
      house: "",
      detailUser: {},
      detailList: []
    };
  },
  computed: {
    ...mapGetters(["unique_id"])
  },
  created() {
    // this.getList();
    this.getStaticClient();
    this.getUserDynamicList();
    // this.getAllhouseOrignPart();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/myHouse") {
        // this.getList();
        this.getStaticClient();
        this.getUserDynamicList();
      }
    }
  },
  filters: {
    toParse(value) {
      if (value !== "") {
        try {
          return baseUrl + JSON.parse(value)[0];
        } catch (error) {
          return require("../../assets/img/briefImgPhoto.png");
        }
      } else {
        return require("../../assets/img/briefImgPhoto.png");
      }
    },
    getImageUrl(value) {
      if ((value !== "") & (value != null)) {
        return baseUrl + value;
      } else {
        return require("../../assets/img/briefImgPhoto.png");
      }
    },
    formatMinute(value) {
      var theTime = parseInt(value); // 秒
      var middle = 0; // 分
      var hour = 0; // 小时

      if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (middle > 0) {
        result = "" + parseInt(middle) + "分" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
      }
      return result;
    },
    diffTime(value) {
      // var arrTimestamp = (value + "").split("");
      // for (var start = 0; start < 13; start++) {
      //   if (!arrTimestamp[start]) {
      //     arrTimestamp[start] = "0";
      //   }
      // }
      // value = arrTimestamp.join("") * 1;

      var minute = 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      // var diffValue = now - value;
      var diffValue = value;
      // 计算差异时间的量级
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;

      // 数值补0方法
      var zero = function(value) {
        if (value < 10) {
          return "0" + value;
        }
        return value;
      };

      // 使用
      if (monthC > 12) {
        return "5年前";
      } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
      }
      return "刚刚";
    },

    diffLastTime(value) {
      var minute = 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = parseInt(new Date().getTime() / 1000);
      var diffValue = now - value;

      // 计算差异时间的量级
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;

      // 数值补0方法
      var zero = function(value) {
        if (value < 10) {
          return "0" + value;
        }
        return value;
      };

      // 使用
      if (monthC > 12) {
        return "5年前";
      } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
      }
      return "刚刚";
    }
  },
  methods: {
    shareDetailImg(name) {
      this.dialogShareVisible = true;
      if (name == "获客") {
        this.qrcode = "https://tucs.hailuojia.com/wechat/oauth";
      } else {
        this.qrcode = `https://th5agent.hailuojia.com/detail?house_code=${this.house_code}&unique_id=${this.unique_id}`;
      }
    },
    changeActiveTwoIndex(index, unique_id, item) {
      this.activeTabTwoIndex = index;
      this.detailUser = item;
      this.getuserlistDetail(unique_id);
    },
    getStaticClient() {
      let param = {
        unique_id: this.unique_id
      };
      api.getStaticClientNum(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.client_total_num = data.data.client_total_num;
          this.today_client_num = data.data.today_client_num;
          this.consultation_num = data.data.consultation_num;
        }
      });
    },
    // 显示电话弹框dialog
    isDialogPhoneVisible() {
      this.dialogCallQuantityVisible = true;
    },
    // 客户动态浏览动态列表
    getUserDynamicList() {
      let param = {
        unique_id: this.unique_id,
        nickname: this.formInline.nickname,
        p: 1,
        pz: 50
      };
      api.getuserlist(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.userDynamicList = data.data;
          if (this.userDynamicList.length > 0) {
            this.detailUser = this.userDynamicList[0];
            this.getuserlistDetail(this.userDynamicList[0].unique_id);
            this.activeTabTwoIndex = 0;
          }
        }
      });
    }
  },
  components: {
    uploadExcel,
    uploadPhoto,
    addDesc,
    shareHouse,
    selectionCard,
    callQuantityList
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
.houseDynamicUser {
    min-height: 780px;
  padding-top: 30px;
  background-color: #f8faff;
  display: flex;
//   padding-bottom: 20px;
}
.infinite-list-item {
  width: 380px;
  height: 110px;
  background-color: #fff;
  margin: 0 20px 20px 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 4px;
  .itemDeatil {
    display: flex;
    .itemDeatilImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 20px 15px 20px 20px;
    }
    .itemDeatilNoData {
      width: 100px;
      height: 70px;
      border: 1px solid #d8dde2;
      border-radius: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 15px 0 20px;
      .itemDeatilNoImg {
        width: 34px;
        height: 26px;
      }
    }
    .listViewShow {
      text-align: left;
      color: #333333;
      .itemDeatilText {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        line-height: 18px;
      }
      .detailArea {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 400;
      }
      .houseBest {
        background: #edf1ff;
        border-radius: 2px;
        float: left;
        padding: 2px 7px;
        .houseSort {
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          color: #4e84ff;
        }
      }
      .houseBestNone {
        border: 1px solid #f2f2f2;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        float: left;
        color: #bbbbbb;
        padding: 1px 6px;
      }
    }
  }
}
.infinite-list-item-active {
  background: linear-gradient(left, #6e90f8, #9cb9f6);
  box-shadow: 0px 5px 8px 0px rgba(156, 185, 246, 0.4);
  cursor: pointer;
  position: relative;
  .itemDeatilText {
    color: #fff;
  }
  .detailArea {
    color: #fff;
  }
  .houseBest {
    color: #81a1f7 !important;
    background: #fff !important;
  }
  .houseBestNone {
    border: 1px solid #f2f2f2 !important;
    color: #fff !important;
  }
  .arrow {
    &::after {
      content: " ";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      right: -20px;
      top: 24%;
      border-top: 30px solid transparent;
      border-left: 30px solid #9cb9f6;
      border-bottom: 30px solid transparent;
    }
  }
}
</style>