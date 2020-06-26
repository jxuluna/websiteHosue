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
            <el-input v-model="formInline.nickname" placeholder="请输入关键字" @keyup.enter.native="getUserDynamicList('click')"></el-input>
            <el-input v-show="false"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUserDynamicList('click')" class="buttonSearch">查询</el-button>
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
    <div v-if="userDynamicList.length === 0" class="houseDynamicUser noDatas">
      <div class="noData-content">
        <img src="../../assets/img/noData.png" />
        <div>暂无动态</div>
      </div>
    </div>
    <div class="houseDynamicUser" v-else>
      <div class="timeScroll">
        <ul class="infinite-list" v-infinite-scroll="load1" :infinite-scroll-disabled="disabled1">
          <li
            v-for="(item,index) in userDynamicList"
            class="infinite-list-item"
            :class="{'infinite-list-item-active': activeTabTwoIndex === index}"
            @click="changeActiveTwoIndex(index, item.unique_id, item)"
            :key="index"
          >
            <div class="itemDeatil">
              <img :src="item.headimgurl" alt class="itemDeatilImg" />
              <div class="listDynamic">
                <div class="userListDynamic">
                  <p class="itemDeatilText">{{item.nickname}}</p>
                  <div class="newUserTime" :class="{'oldUserTime' : item.user_type === '老用户'}">
                    <div class="newConsumer">{{item.user_type}}</div>
                    <div class="newTimeBefore">{{item.last_visit_time | diffTime}}</div>
                  </div>
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
                              <p v-if="loading1" style="margin-top:10px;" class="loading">
          <span>加载中...</span>
        </p>
        <p v-if="noMore1" style="margin-top:10px;font-size:13px;color:#ccc">没有更多了</p>
        </ul>
      </div>
      <div class="uploaddetail">
        <el-card class="customer">
          <div class="customer-info">
            <img :src="detailUser.headimgurl" alt class="itemDeatilImg" />
            <div class="customer-info-right">
              <p class>
                <span class="username">{{detailUser.nickname}}</span>
                <span
                  class="tags"
                  :class="{'tags-green' : detailUser.user_type === '老用户'}"
                >{{detailUser.user_type}}</span>
              </p>
              <div class>
                <div class="timeLong">
                  <span class="bold">{{detailUser.total_visit_time | formatMinute}}</span>
                  <span class="scanTotal">
                    浏览 ·
                    <span class="bold">{{detailUser.house}}</span>套房 ·
                    <span class="bold">{{detailUser.information}}</span>资讯
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <div class="block time-line-content infinite-list" v-infinite-scroll="load2" :infinite-scroll-disabled="disabled2" v-if="detailList.length > 0" style="overflow: auto;height: 860px;">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in detailList"
              :key="index"
              :timestamp="item.time + ' | ' +  formatMinute(item.total_time)"
              placement="top"
              color="#116EF4"
            >
              <el-card shadow="never">
                <div class="content" v-for="(elem, elIndex) in item.data" :key="elIndex">
                  <p
                    v-if="Object.keys(elem.house_info).length > 0"
                    style="font-size: 12px;font-weight: 600;padding-left:2px;"
                  >{{elem.stay_time_str}}</p>
                  <div
                    class="customer-info"
                    v-if="elem.type == '1' && Object.keys(elem.house_info).length > 0"
                  >
                    <img :src="elem.house_info.image | toParse" alt class="itemDeatilImg" />
                    <div class="customer-info-right">
                      <p class>
                        <span
                          class
                          style="font-weight: 600;font-size: 16px;"
                        >{{elem.house_info.res_block_name}}</span>
                      </p>
                      <div class>
                        <div class="timeLong">
                          <span>{{elem.house_info.house_type}}丨{{elem.house_info.build_area}}丨{{elem.house_info.house_direction}}</span>
                        </div>
                        <div class="timeLong" style="margin-top:12px">
                          <span>
                            <span class="price">{{elem.house_info.house_price}}</span>
                            万 {{elem.house_info.unit_price}}元/平
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="elem.type == '2'  && Object.keys(elem.house_info).length > 0"
                    class="customer-info2"
                  >
                    <div class="left">
                      <p>{{elem.house_info.titel}}</p>
                    </div>
                    <img :src="elem.house_info.surface_plot | getImageUrl" alt class />
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
                                        <p v-if="loading2" style="margin-top:10px;" class="loading">
          <span>加载中...</span>
        </p>
        </div>
        <div v-else class="uploaddetail noData">
          <img src="../../assets/img/TImeNoneHouse.png" />
          暂无动态
        </div>
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
      pz1: 10,
      p1: 1,
      pz2: 10,
      p2: 1,
      userList: [],
      userDynamicList: [],
      nickname: "",
      headimgurl: "",
      last_visit_time: "",
      user_type: "",
      information: "",
      house: "",
      detailUser: {},
      detailList: [],
      loading1: false,
      noMore1: false,
      loading2: false,
      noMore2: false,
      share_target: '',
    };
  },
  computed: {
    ...mapGetters(["unique_id"]),
    disabled1 () {
      return this.loading1 || this.noMore1
    },
    // noMore1() {
    //   //当起始页数大于总页数时停止加载
    //   return this.p1 >= this.totalImportCount / 10 - 1;
    // },
    disabled2 () {
      return this.loading2 || this.noMore2
    },
    // noMore2() {
    //   //当起始页数大于总页数时停止加载
    //   return this.p2 >= this.totalImportCount / 10 - 1;
    // },
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
    load1() {
      //滑到底部时进行加载
      this.loading1 = true;
      setTimeout(() => {
        this.p1 += 1; //页数+1
        this.getUserDynamicList(); //调用接口，此时页数+1，查询下一页数据
      }, 1000);
    },
    load2() {
      //滑到底部时进行加载
      this.loading2 = true;
      setTimeout(() => {
        this.p2 += 1; //页数+1
        this.getuserlistDetail(this.share_target); //调用接口，此时页数+1，查询下一页数据
      }, 1000);
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
    shareDetailImg(name) {
      this.dialogShareVisible = true;
      if (name == "获客") {
        this.qrcode = "https://ucs.hailuojia.com/wechat/oauth";
      } else {
        this.qrcode = `https://h5agent.hailuojia.com/detail?house_code=${this.house_code}&unique_id=${this.unique_id}`;
      }
    },
    changeActiveTwoIndex(index, unique_id, item) {
      this.p2 = 1;
      this.noMore2 = true;
      this.activeTabTwoIndex = index;
      this.detailUser = item;
      this.share_target = unique_id;
      this.detailList = [];
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
    getUserDynamicList(type) {
      if (type == 'click') {
        this.p1 = 1;
        this.noMore1 = false;
      }
      let param = {
        unique_id: this.unique_id,
        nickname: this.formInline.nickname,
        p: this.p1,
        pz: this.pz1
      };
      api.getuserlist(param).then(response => {
        if (type == 'click') {
          this.userDynamicList = [];
        }
        let data = response.data;
        if (data.status === 0) {
          if (data.data.length == 0) {
            this.noMore1 = true;
          }
          this.userDynamicList = this.userDynamicList.concat(data.data);
          if (this.userDynamicList.length > 0 && !this.loading1) {
            this.detailUser = this.userDynamicList[0];
            this.share_target = this.userDynamicList[0].unique_id;
            this.getuserlistDetail(this.userDynamicList[0].unique_id, type);
            this.activeTabTwoIndex = 0;
          }
          this.loading1 = false;
        }
      });
    },
    getuserlistDetail(share_target, type) {
      if (type == 'click') {
        this.p2 = 1;
      }
      let param = {
        unique_id: share_target,
        share_unique_id: this.unique_id,
        p: this.p2,
        pz: 10
      };
      let that = this;
      api.getuserlistDetail(param).then(res => {
        if (type == 'click') {
          this.detailList = [];
          this.noMore2 = false;
        }
        let data = res.data;
        if (data.status === 0) {
          let list = [];
          for (var key in data.data) {
            list.push({
              time: key,
              total_time: data.data[key].total_time,
              data: data.data[key].data
            });
          }
          if (list.length == 0) {
            this.noMore2 = true;
          }
          this.detailList = this.detailList.concat(list);
          this.loading2 = false;
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
//   min-height: 370px;
  padding-top: 30px;
  background-color: #f8faff;
  display: flex;
  padding-bottom: 20px;
  max-height: 1018px;
  .timeScroll {
    overflow-y: auto;
    margin-bottom: 20px;
  }
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
  cursor: pointer;
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
  .listDynamic {
    margin: 20px 0;
    text-align: left;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
  }
  .itemDeatilText {
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    display: inline-block;
    vertical-align: middle;
    font-weight: 600;
  }
  .newUserTime {
    width: 95px;
    height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 22px;
    font-weight: 400;
    background: #116ef4;
    display: -webkit-inline-box;
    border: 1px solid #116ef4;
    .newConsumer {
      color: #116ef4;
      padding: 0px 1px;
      background: #fff;
    }
  }

  .oldUserTime {
    width: 95px;
    height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 22px;
    font-weight: 400;
    background: #35bc99;
    display: -webkit-inline-box;
    border: 1px solid #35bc99;
    .newConsumer {
      color: #35bc99;
      padding: 0px 1px;
      background: #fff;
    }
  }

  .newTimeBefore {
    color: #fff;
    padding: 0 2px;
    width: 53px;
    text-align: center;
  }
  .userListDynamic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 260px;
  }
  .bold {
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    color: #333;
    line-height: 14px;
  }
  .timeLong {
    color: #333;
    font-size: 12px;
  }
  //   .newConsumer {
  //     color: #9ab7f7;
  //     padding: 0px 1px;
  //   }
}
.infinite-list-item-active {
  background: linear-gradient(left, #6e90f8, #9cb9f6);
  box-shadow: 0px 5px 8px 0px rgba(156, 185, 246, 0.4);
  cursor: pointer;
  position: relative;
  .listDynamic {
    margin: 20px 0;
    text-align: left;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
  }
  .itemDeatilText {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    display: inline-block;
    vertical-align: middle;
    font-weight: 600;
  }
  .newUserTime {
    width: 95px;
    height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 22px;
    font-weight: 400;
    background: #fff;
    display: -webkit-inline-box;
    border: 1px solid #ffffff;
  }
  .oldUserTime {
    width: 95px;
    height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 22px;
    font-weight: 400;
    background: #fff;
    display: -webkit-inline-box;
    border: 1px solid #ffffff;
    .newTimeBefore {
      color: #ffffff;
      background: #35bc99;
      padding: 0 2px;
      width: 53px;
      text-align: center;
    }
  }
  .userListDynamic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 260px;
  }
  .bold {
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    line-height: 14px;
  }
  .timeLong {
    color: #fff;
    font-size: 12px;
  }
  .newConsumer {
    color: #9ab7f7;
    padding: 0px 1px;
  }
  .newTimeBefore {
    color: #ffffff;
    background: #9cb9f6;
    padding: 0 2px;
    width: 53px;
    text-align: center;
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
.uploaddetail {
  background-color: #fff;
  border-radius: 4px;
  flex: 1;
  min-height: 782px;
  .block {
    width: 60%;
    margin-left: 30px;
  }
  .el-form {
    margin-left: 340px;
    .el-button {
      height: 36px;
      width: 100px;
      // background-color: #306CFF;
    }
    .uploadDetailImg {
      color: #fff;
      background-color: #41cb84;
      border-color: #41cb84;
      line-height: 4px;
    }
    .uploadDetailImg:focus,
    .uploadDetailImg:hover {
      background: #62daad;
      border-color: #62daad;
      color: #fff;
    }
    .uploadDetailImg.is-active,
    .uploadDetailImg:active {
      background: #62daad;
      border-color: #62daad;
      color: #fff;
    }
    .shareDetailImg {
      color: #fff;
      background-color: #7071f1;
      border-color: #7071f1;
      line-height: 4px;
    }
    .shareDetailImg:focus,
    .shareDetailImg:hover {
      background: #7678f1;
      border-color: #7678f1;
      color: #fff;
    }
    .shareDetailImg.is-active,
    .shareDetailImg:active {
      background: #7678f1;
      border-color: #7678f1;
      color: #fff;
    }
  }
  .lineHouse {
    width: 655px;
    margin: 0 24px;
    background-color: #f2f2f2;
  }
  .brief {
    overflow: hidden;
    margin: 20px 0 30px 0;
    .briefImg {
      margin: 0px 20px;
      margin-left: 24px;
      width: 240px;
      float: left;
      .imageUploadView {
        width: 240px;
        height: 120px;
      }
    }
    .noDataBriefImg {
      border-radius: 2px;
      margin: 0px 20px;
      margin-left: 24px;
      width: 240px;
      height: 120px;
      float: left;
      border: 1px solid #d8dde2;
      .noDataImg {
        width: 56px;
        height: 42px;
        margin-top: 40px;
      }
    }
    .briefDetail {
      text-align: left;
      overflow: hidden;
      position: relative;
      left: 10px;
      .briefCharacter {
        color: #333333;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
      }
      .detailLeft {
        float: left;
        margin-top: 10px;
        line-height: 22px;
        color: #757575;
        font-size: 14px;
        width: 138px;
        .introduction {
          padding: 5px 0;
        }
        .color-4 {
          color: #444;
        }
      }
      .detailLeft-last {
        width: 220px;
        .introduction {
          margin-top: -22px;
          margin-left: 116px;
        }
      }
    }
  }
  .describe {
    margin: 24px;
    margin-bottom: 30px;
    overflow: hidden;
    .describe-title {
      overflow: hidden;
    }
    .describe-content {
      line-height: 25px;
      text-align: left;
      color: #999;
      width: 654px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .houseDescribe {
      float: left;
      margin: 0 0 20px 0;
      font-weight: 500;
    }
    .describeEdit {
      float: right;
      margin: 0 0 20px 0;
      color: #116ef4;
      font-size: 14px;
      cursor: pointer;
    }
    .describeEditImg {
      width: 150px;
      padding: 10px 10px 10px 0;
    }
    .characterNone {
      color: #adadad;
      font-size: 14px;
    }
    .addDescribe {
      margin: 10px 20px;
      width: 110px;
      height: 36px;
    }
  }
  .dynamic {
    margin: 24px 0;
    .houseDynamic {
      float: left;
      margin: 2px 0 20px 24px;
      font-weight: 500;
    }
    .dynamicEdit {
      float: right;
      margin: 2px 30px 20px 0;
      color: #adadad;
      font-size: 14px;
    }
    .describeEditImg {
      width: 150px;
      padding: 100px 0px 10px 54px;
    }
    .noneReader {
      color: #adadad;
      font-size: 14px;
      position: absolute;
      right: 320px;
      top: 210px;
    }
  }
  .customer {
    margin: 10px 30px 30px 30px;
    .customer-info {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .customer-info-right {
        margin-left: 16px;
        text-align: left;
        div {
          margin-top: 10px;
          background: #f7f8fa;
          padding: 2px 0;
          .timeLong {
            margin: 0;
            font-size: 12px;
            .bold {
              font-weight: 600;
              font-size: 14px;
            }
          }
        }
        .username {
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
          width: 120px;
          display: inline-block;
          vertical-align: middle;
          font-weight: 600;
        }
        .phone {
          color: #999;
        }
        .tags {
          display: inline-block;
          background-image: url("../../assets/img/tags-icon.png");
          background-size: cover;
          color: #fff;
          height: 25px;
          width: 62px;
          line-height: 25px;
          text-align: center;
          font-size: 12px;
          margin-left: 10px;
          padding-top: 2px;
        }
        .tags-green {
          background-image: url("../../assets/img/middleNewUser.png");
          padding-top: 2px;
        }
      }
    }
  }
  .time-line-content {
    .el-card {
      background: #f7f8fa;
      border: none;
      .content {
        margin: 10px 0;
      }
      .customer-info {
        display: flex;
        align-items: center;
        margin-top: 10px;
        img {
          width: 100px;
          height: 70px;
        }
        .customer-info-left {
          width: 250px;
          text-align: left;
        }
        .customer-info-right {
          margin-left: 16px;
          text-align: left;
          div {
            // margin-top: 10px;
            background: #f7f8fa;
            padding: 2px 0;
            .timeLong {
              margin: 0;
              font-size: 12px;
              .price {
                color: #ff5447;
                font-size: 18px;
                font-weight: 600;
              }
            }
          }
          .username {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            width: 120px;
            display: inline-block;
            vertical-align: middle;
            font-weight: 600;
          }
          .phone {
            color: #999;
          }
        }
      }
      .customer-info2 {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .left {
          flex: 1;
          p {
            font-weight: bold;
            font-size: 16px;
          }
        }
        img {
          width: 100px;
          height: 70px;
        }
      }
    }
  }
  .noData {
    min-height: 500px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    img {
      width: 140px;
      height: 120px;
    }
  }
}
.noDatas {
  text-align: center;
  padding-top: 30px;
  background-color: #f8faff;
  height: 370px;
  .noData-content {
    padding-top: 50px;
    background-color: #fff;
    width: 100%;
    img {
      width: 140px;
      height: 120px;
    }
    div {
      font-size: 14px;
      color: #999;
    }
  }
}
.el-timeline {
  padding-left: 2px;
}
</style>