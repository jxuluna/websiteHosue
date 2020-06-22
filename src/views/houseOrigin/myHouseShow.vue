<template>
  <div class="houseContent">
    <div class="contentHeader">
      <div class="homeSearch">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索">
            <el-input v-model="formInline.block_or_area" placeholder="请输入小区名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList('click')" class="buttonSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="uploadHouse">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="isDialogVisible" class="uploadHouseResource">上传房源</el-button>
          </el-form-item>
          <el-form-item>
            <div class="uploadTextAll">已上传{{totalImportCount}}套，分类{{inCardImportHouseCount}}套</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="houstList.length === 0" class="uploaddetail noData">
      <div class="noData-content">
        <img src="../../assets/img/noData.png" />
        <div>暂无房源</div>
      </div>
    </div>

    <div class="contentDetailHouse" v-else>
      <div class="listHouseScroll">
        <ul class="infinite-list" v-infinite-scroll="load">
          <div v-for="(ele,index) in houstList" :key="index">
            <div class="uploadTimeShow">{{ele.time}}上传</div>
            <li
              v-for="(item,dataIndex) in ele.data"
              class="infinite-list-item"
              :class="{'infinite-list-item-active':activeTabOneIndex === item.id}"
              :key="dataIndex"
              @click="changeActiveOneIndex(item.id, item.id)"
            >
              <div class="itemDeatil">
                <div v-if="item.image !== ''" class="itemDeatilNoData">
                  <img alt :src="item.image | toParse" class="itemDeatilImg" />
                </div>
                <div v-else class="itemDeatilNoData">
                  <img src="../../assets/img/briefImgPhoto.png" alt class="itemDeatilNoImg" />
                </div>
                <div class="listViewShow">
                  <p class="itemDeatilText">{{item.res_block_name}}</p>
                  <div
                    class="detailArea"
                  >{{item.house_price}}万丨{{item.build_area}}平丨{{item.house_type}}</div>
                  <div class="houseBest" v-if="item.house_cards.length > 0">
                    <div class="houseSort">{{item.house_cards[0].name}}</div>
                  </div>
                  <div class="houseBestNone" v-else>未分类</div>
                </div>
              </div>
              <div class="arrow"></div>
            </li>
          </div>
        </ul>
      </div>
      <div class="listHouseDetail">
        <div class="detailThreeBtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-button type="primary" @click="isDialogImgVisible" class="uploadHouseResource">上传图片</el-button>
              <el-button
                type="primary"
                @click="isDialogCardVisible"
                class="uploadHouseResource uploadDetailImg"
              >房源分类</el-button>
              <el-button
                type="primary"
                @click="shareDetailImg"
                class="uploadHouseResource shareDetailImg"
              >分享房源</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="introduceHouse">
          <div class="noDataBriefImg" v-if="image === ''">
            <img src="../../assets/img/briefImgPhoto.png" alt class="noDataImg" />
          </div>
          <div class="briefImg" v-else>
            <img :src="image | toParse" alt class="imageUploadView" />
          </div>
          <div class="briefDetail">
            <div class="briefCharacter">{{name}}</div>
            <div class="detailLeft">
              <div class="introduction">
                <span>价 格</span>：
                <span class="color-4">{{house_price}}万</span>
              </div>
              <div class="introduction">
                <span>面 积</span>：
                <span class="color-4">{{build_area}}平</span>
              </div>
            </div>
            <div class="detailLeft">
              <div class="introductionHouseType">
                <span>户 型</span>：
                <span class="color-4">{{house_type}}</span>
              </div>
              <div class="introduction detailLeft-last">
                <span>朝 向</span>：
                <span class="color-4">{{house_direction}}</span>
              </div>
              <div class="floorHouse">
                <span>楼 层</span>:
                <span class="color-4">{{room_sub_info}}</span>
              </div>
            </div>
            <div class="detailLeft" style="width:390px;margin-top:0">
              <div class="introduction">
                <span>分 类：</span>
                <span v-if="house_cards.length === 0" class="color-4">未分类</span>
                <div v-else-if="house_cards.length > 3" class="house_cards-cate">
                  <span class="cardsBackground">{{house_cards[0].name}}</span>
                  <span class="cardsBackground">{{house_cards[1].name}}</span>
                  <span class="cardsBackground">{{house_cards[2].name}}</span>
                  <span
                    class="viewAllCards"
                    style="cursor:pointer;background-color:#fff;font-size:14px"
                    @click="isDialogCardVisible"
                  >查看全部{{house_cards.length}}个分类></span>
                </div>
                <div v-else class="house_cards-cate">
                  <span
                    class="cardsBackground"
                    v-for="(item, index) in house_cards"
                    :key="index"
                  >{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-divider class="lineHouse"></el-divider>
        <div class="houseDescribe">
          <div class="DescribeEditOrign">
            <div class="describeTitle">房源描述</div>
            <div
              v-if="agent_house_intro"
              class="describeEdit"
              @click="isDialogDescVisible('修改描述')"
            >修改</div>
            <div v-else class="describeEdit">&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>

          <div v-if="!agent_house_intro">
            <img src="../../assets/img/editNone.png" alt class="describeEditImg" />
            <p class="characterNone">暂无描述</p>
          </div>
          <div v-if="!agent_house_intro">
            <el-button type="primary" class="addDescribe" @click="isDialogDescVisible('添加描述')">立即添加</el-button>
          </div>
          <div v-else class="describe-content">{{agent_house_intro}}</div>
        </div>
        <div class="screenUser">
          <div class="screenUserFlex">
            <div class="houseDynamic">浏览动态</div>
            <div class="dynamicEdit">最近浏览的{{userList.length}}个客户</div>
          </div>

          <div v-if="userList.length === 0" style="position:relative">
            <img src="../../assets/img/TImeNoneHouse.png" alt class="describeEditImg" />
            <p class="noneReader">暂无浏览动态</p>
          </div>
          <div class="userList" v-else>
            <div class="userlist-item" v-for="(item, index) in userList" :key="index">
              <div class="left">
                <img :src="item.headimgurl" alt class="itemDeatilImg" />
                <div>
                  <p>{{item.nickname}}</p>
                  <p>浏览{{item.total_visit_time | formatMinute}}</p>
                </div>
              </div>
              <div class="check">{{item.last_visit_time | diffLastTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <uploadExcel :show.sync="dialogVisible" />
    <uploadPhoto :show.sync="dialogImgVisible" :house_code="house_code" />
    <selectionCard :show.sync="dialogCardVisible" :house_code="house_code" :unique_id="unique_id" />
    <shareHouse :show.sync="dialogShareVisible" :id="id" :qrcode="qrcode" />
    <addDesc :show.sync="dialogDescVisible" :title="descTitle" :id="id" />
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
  created() {
    this.getList();
    // this.getStaticClient();
    // this.getUserDynamicList();
    this.getAllhouseOrignPart();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/myHouse") {
        this.getList();
        // this.getStaticClient();
        this.getUserDynamicList();
      }
    }
  },
  computed: {
    ...mapGetters(["unique_id"])
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
    load() {},
    onSubmit() {},
    getList(type) {
      let param = {
        p: this.p,
        pz: this.pz,
        unique_id: this.unique_id,
        block_or_area: this.formInline.block_or_area
      };
      api.getHouseList(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.houstList = [];
          for (let key in data.data.list) {
            this.houstList.push({
              time: key,
              data: data.data.list[key]
            });
          }
          if (type === "click") {
            this.id = 0;
          }
          if (this.id == 0) {
            let keys = Object.keys(data.data.list);
            if (data.data.list[keys[0]].length > 0) {
              this.id = data.data.list[keys[0]][0].id;
              this.activeTabOneIndex = data.data.list[keys[0]][0].id;
              // this.activeTabOneIndex = 0;
            }

            this.getDetail();
          }
        }
      });
    },
    getDetail() {
      let param = {
        unique_id: this.unique_id,
        id: this.id
      };
      api.getHouseDetail(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.name = data.data.name;
          this.build_area = data.data.build_area;
          this.house_type = data.data.house_type;
          this.house_direction = data.data.house_direction;
          this.room_sub_info = data.data.room_sub_info;
          this.house_price = data.data.house_price;
          this.see_num = data.data.see_num;
          this.house_code = data.data.house_code;
          this.id = data.data.id;
          this.agent_house_intro = data.data.agent_house_intro;
          this.image = data.data.image;
          this.house_cards = data.data.house_cards;
          this.getUserList();
        }
      });
    },
    // 显示图片dialog
    isDialogImgVisible() {
      this.dialogImgVisible = true;
    },
    isDialogCardVisible() {
      this.dialogCardVisible = true;
    },
    shareDetailImg(name) {
      this.dialogShareVisible = true;
      if (name == "获客") {
        this.qrcode = "https://tucs.hailuojia.com/wechat/oauth";
      } else {
        this.qrcode = `https://th5agent.hailuojia.com/detail?house_code=${this.house_code}&unique_id=${this.unique_id}`;
      }
    },
    isDialogDescVisible(title) {
      this.dialogDescVisible = true;
      this.descTitle = title;
    },
    getAllhouseOrignPart() {
      let param = {
        unique_id: this.unique_id
      };
      api.getAllhouseOrign(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.totalImportCount = data.data.totalImportCount;
          this.inCardImportHouseCount = data.data.inCardImportHouseCount;
        }
      });
    },

    // 浏览动态
    getUserList() {
      let param = {
        share_target: this.house_code,
        share_unique_id: this.unique_id,
        // time: new Date(),

        p: 1,
        pz: 6
      };
      api.getuserAlllist(param).then(response => {
        let data = response.data;
        if (data.status === 0) {
          this.userList = data.data;
        }
      });
    },
    changeActiveOneIndex(index, id) {
      this.activeTabOneIndex = index;
      this.id = id;
      this.getDetail();
    },
    // getAllhouseOrignWay() {
    //   let param = {
    //     unique_id: this.unique_id
    //   };
    //   api.getAllhouseOrign(param).then(response => {
    //     let data = response.data;
    //     if (data.status === 0) {
    //       this.totalImportCount = data.data.totalImportCount;
    //       this.inCardImportHouseCount = data.data.inCardImportHouseCount;
    //     }
    //   });
    // },
    // 显示dialog
    isDialogVisible() {
      this.dialogVisible = true;
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
.noData {
  text-align: center;
  padding-top: 30px;
  background-color: #f8faff;
  .noData-content {
    padding-top: 50px;
    background-color: #fff;
    height: 370px;
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
.contentHeader {
  padding: 30px 50px;
  display: flex;
  align-items: center;
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
  .uploadHouseResource {
    width: 110px;
    height: 36px;
    margin-right: 20px;
  }
  .uploadTextAll {
    font-weight: 400;
    color: #333333;
  }
}
.contentDetailHouse {
  max-height: 1018px;
  padding-top: 30px;
  background-color: #f8faff;
  display: flex;
  .listHouseScroll {
    overflow-y: auto;
    margin-bottom: 20px;
  }
  .uploadTimeShow {
    text-align: left;
    font-weight: 500;
    font-size: 16px;
    padding-left: 20px;
  }
  .infinite-list-item {
    width: 380px;
    height: 110px;
    background-color: #fff;
    margin: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 4px;
    .itemDeatil {
      display: flex;
      .itemDeatilImg {
        width: 100px;
        height: 70px;
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

  .listHouseDetail {
    flex: 1;
    background-color: #fff;
    width: 670px;
    margin-bottom: 20px;
    .uploadHouseResource {
      width: 90px;
      height: 34px;
      padding: 12px 16px;
    }
    .detailThreeBtn {
      padding: 20px;
    }
    .detailThreeBtn {
      display: flex;
      justify-content: flex-end;
    }
  }
  .introduceHouse {
    padding: 16px 28px 36px 28px;
    display: -webkit-inline-box;
    .noDataBriefImg {
      width: 240px;
      height: 120px;
      border: 1px solid #d8dde2;
      border-radius: 4px;
      justify-content: center;
      align-items: center;
      display: flex;
      .noDataImg {
        width: 56px;
        height: 42px;
      }
    }
    .briefDetail {
      padding-left: 18px;
      text-align: left;
      .briefCharacter {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
      .detailLeft {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        color: #757575;
        line-height: 31px;
        .introduction {
          margin-right: 20px;
          display: flex;
        }
        .introductionHouseType {
          margin-right: 33px;
        }
      }

      .cardsBackground {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #4e84ff;
        line-height: 18px;
        padding: 2px;
        display: inline-block;
        background: #edf1ff;
        border-radius: 2px;
        margin-right: 10px;
      }
      .houseBestNone {
        font-size: 14px;
        font-weight: 400;
        color: #757575;
      }
    }
  }
  .lineHouse {
    width: 622px;
    margin: 20px 12px 30px 26px;
    background-color: #f2f2f2;
    height: 1px;
  }
  .houseDescribe {
    margin: 0 28px;
    .DescribeEditOrign {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .describeEdit {
      font-size: 14px;
      font-weight: 500;
      color: #116ef4;
      line-height: 22px;
      cursor: pointer;
    }
    .describe-content {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #999999;
      margin-top: 20px;
      line-height: 25px;
    }
    .describeTitle {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      color: #444444;
      line-height: 22px;
    }
    .describeEditImg {
      width: 118px;
      height: 102px;
    }
    .characterNone {
      font-size: 14px;
      font-weight: 400;
      color: #adadad;
      line-height: 20px;
      margin: 4px 0 14px 0;
    }
    .addDescribe {
      width: 110px;
      height: 36px;
    }
  }
  .screenUser {
    margin: 60px 28px;
    .screenUserFlex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .houseDynamic {
      font-size: 16px;
      font-weight: 500;
      color: #444444;
      line-height: 22px;
    }
    .dynamicEdit {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 22px;
    }
    .describeEditImg {
      height: 102px;
      width: 118px;
      margin-top: 20px;
    }
    .noneReader {
      font-size: 14px;
      font-weight: 400;
      color: #adadad;
      line-height: 20px;
    }
  }
  .imageUploadView {
    width: 240px;
    height: 120px;
  }
  .userList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    // margin: 24px;
    // margin-left: 12px;
    align-items: center;
    .userlist-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0 0 0;
      padding: 0 8px;
      height: 80px;
      width: 280px;
      border: 1px solid #e7eaec;
      border-radius: 4px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .left {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 4px;
        div {
          margin-left: 16px;
          text-align: left;
          line-height: 24px;
          p {
            color: #999;
            font-size: 14px;
            &:first-child {
              color: #333;
              font-size: 16px;
            }
          }
        }
      }
      .check {
        align-self: start;
        margin-top: 24px;
        width: 62px;
        height: 16px;
        background: rgba(254, 102, 0, 0.1);
        border-radius: 2px;
        color: #fe6600;
        font-size: 10px;
        vertical-align: middle;
        padding-top: 5px;
        margin-right: 4px;
      }
    }
  }
  .color-4{
      color: #444;
  }
}
</style>