<template>
  <div class="houseContent">
    <div class="contentHeader">
      <div class="homeSearch">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索">
            <el-input v-model="formInline.user" placeholder="请输入小区名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="buttonSearch">查询</el-button>
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
      <img src="../../assets/img/noData.png" />
      暂无房源
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
                <img v-if="item.image !== ''" :src="item.image | toParse" alt class="itemDeatilImg" />
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
              <el-button type="primary" @click="onSubmit" class="uploadHouseResource">上传图片</el-button>
              <el-button
                type="primary"
                @click="onSubmit"
                class="uploadHouseResource uploadDetailImg"
              >房源分类</el-button>
              <el-button
                type="primary"
                @click="onSubmit"
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
                <span>户 型</span>：
                <span class="color-4">{{house_type}}</span>
              </div>
            </div>
            <div class="detailLeft">
              <div class="introduction">
                <span>面 积</span>：
                <span class="color-4">{{build_area}}平</span>
              </div>
              <div class="introduction detailLeft-last">
                <span>朝 向</span>：
                <span class="color-4">{{house_direction}}</span>
                <div style="position: absolute;right: 36px;top: 69px;">
                  <span style="margin-left:50px">楼 层</span>:
                  <span class="color-4">{{room_sub_info}}</span>
                </div>
              </div>
            </div>
            <div class="detailLeft" style="width:390px;margin-top:0">
              <div class="introduction">
                <span style="vertical-align: top;margin-top: 2px;display: inline-block;">分 类：</span>
                <span
                  style="vertical-align: top;margin-top: 2px;display: inline-block;"
                  v-if="house_cards.length === 0"
                  class="color-4"
                >未分类</span>
                <div v-else-if="house_cards.length > 3" class="house_cards-cate">
                  <span>{{house_cards[0].name}}</span>
                  <span>{{house_cards[1].name}}</span>
                  <span>{{house_cards[2].name}}</span>
                  <span
                    class="viewAllCards"
                    style="cursor:pointer;background-color:#fff;font-size:14px"
                    @click="isDialogCardVisible"
                  >查看全部{{house_cards.length}}个分类></span>
                </div>
                <div v-else class="house_cards-cate">
                  <span v-for="(item, index) in house_cards" :key="index">{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <uploadExcel :show.sync="dialogVisible" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../../api/house";
import uploadExcel from "./uploadExcel";

export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      houstList: [],
      totalImportCount: 0, //上传总套数
      inCardImportHouseCount: 0, //分类总套数
      dialogVisible: false,
      activeTabOneIndex: 0,
      pz: 500,
      p: 1,
      block_or_area: "", // 小区名称或商圈名称
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
      house_cards: []
    };
  },
  created() {
    this.getAllhouseOrignWay();
    this.getList();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/myHouse") {
        this.getList();
        this.getStaticClient();
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
    getAllhouseOrignWay() {
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
    // 显示dialog
    isDialogVisible() {
      this.dialogVisible = true;
    }
  },
  components: {
    uploadExcel
  }
};
</script>

<style lang="scss" scoped>
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
  .contentDetailHouse {
    margin-top: 30px;
  }
}
.contentDetailHouse {
  max-height: 1018px;
  padding-top: 30px;
  background-color: #f8faff;
  display: flex;
  .listHouseScroll {
    overflow-y: auto;
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
}
</style>