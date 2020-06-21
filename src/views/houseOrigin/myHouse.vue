<template>
  <div class="house">
    <div class="house_tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的房子" name="first">
          <div class="search">
            <div class="uploadTime">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="搜索">
                  <el-input
                    v-model="formInline.block_or_area"
                    style="border: 1px solid #d8dde2;"
                    placeholder="请输入小区名称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getList('click')" style="margin-left:26px;">查询</el-button>
                </el-form-item>
                <el-form-item class="uploadHome" style="float:right;">
                  <el-button type="primary" @click="isDialogVisible">上传房源</el-button>
                  <span class="homeNumber">已上传{{totalImportCount}}套，分类{{inCardImportHouseCount}}套</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="houstList.length === 0" class="uploaddetail noData">
              <img src="../../assets/img/noData.png" />
              暂无房源
            </div>
            <div class="detailHome" v-else>
              <div class="timeScroll">
                <ul class="infinite-list" v-infinite-scroll="load" style="width: 385px;">
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
                        <img
                          v-if="item.image !== ''"
                          :src="item.image | toParse"
                          alt
                          class="itemDeatilImg"
                        />
                        <div v-else class="itemDeatilNoData">
                          <img
                            src="../../assets/img/briefImgPhoto.png"
                            alt
                            class="itemDeatilNoImg"
                          />
                        </div>
                        <div class="listViewShow">
                          <p class="itemDeatilText">{{item.res_block_name}}</p>
                          <div
                            class="detailArea"
                          >{{item.house_price}}万丨{{item.build_area}}平丨{{item.house_type}}</div>
                          <div
                            class="houseBest"
                            v-if="item.house_cards.length > 0"
                          >{{item.house_cards[0].name}}</div>
                          <div class="houseBestNone" v-else>未分类</div>
                        </div>
                      </div>
                      <div class="arrow"></div>
                    </li>
                  </div>
                </ul>
              </div>
              <div class="uploaddetail">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item>
                    <el-button type="primary" @click="isDialogImgVisible">上传图片</el-button>
                    <el-button type @click="isDialogCardVisible" class="uploadDetailImg">房源分类</el-button>
                    <el-button type @click="shareDetailImg" class="shareDetailImg">分享房源</el-button>
                  </el-form-item>
                </el-form>
                <div class="brief">
                  <div class="noDataBriefImg" v-if="image === ''">
                    <img src="../../assets/img/briefImgPhoto.png" alt class="noDataImg" />
                  </div>
                  <div class="briefImg" v-else>
                    <img
                      :src="image | toParse"
                      alt
                      class="imageUploadView"
                    />
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
                        <span style="vertical-align: top;margin-top: 2px;display: inline-block;" v-if="house_cards.length === 0" class="color-4">未分类</span>
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
                <el-divider class="lineHouse"></el-divider>
                <div class="describe">
                  <div class="describe-title">
                    <div class="houseDescribe">房源描述</div>
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
                    <el-button
                      type="primary"
                      class="addDescribe"
                      @click="isDialogDescVisible('添加描述')"
                    >立即添加</el-button>
                  </div>
                  <div v-else class="describe-content">{{agent_house_intro}}</div>
                </div>
                <el-divider class="lineHouse"></el-divider>
                <div class="dynamic">
                  <div class="houseDynamic">浏览动态</div>
                  <div class="dynamicEdit">最近浏览的{{userList.length}}个客户</div>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="客户动态" name="second">
          <div class="customerDynamic search">
            <div class="uploadTime">
              <div class="callQuantity" style="margin-left:120px;cursor:pointer;">
                <div class="quantityUser" @click="isDialogPhoneVisible">
                  <div class="callQuantityNums">{{consultation_num}}</div>
                  <div class="callQuantityNumerbers">留电咨询</div>
                </div>
              </div>
              <div class="quantity">
                <div class="quantityUser">
                  <div class="quantityUserNums">{{client_total_num}}</div>
                  <div class="quantityUserNumerbers">累计客户</div>
                </div>
              </div>
              <div class="addQuantity">
                <div class="quantityUser">
                  <div class="quantityAddNums">{{today_client_num}}</div>
                  <div class="quantityToday">今日新增</div>
                </div>
              </div>

              <div class="shareUser">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item class="searchHouseId"  label="搜索">
                    <el-input
                      v-model="formInline.nickname"
                      style="border: 1px solid #d8dde2;"
                      placeholder="请输入关键字"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="getUserDynamicList" style="margin-left:28px">查询</el-button>
                  </el-form-item>
                  <el-form-item class="uploadHome" style="margin-left:350px">
                    <el-button type="primary" @click="shareDetailImg('获客')"  style="position:absolute;left:70px">分享获客</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-if="userDynamicList.length === 0" class="uploaddetail noData">
              <img src="../../assets/img/noData.png" />
              暂无动态
            </div>
            <div class="detailHome" v-else>
              <div class="timeScroll" style="width:386px">
                <ul class="infinite-list" v-infinite-scroll="load" style="width: 380px;">
                  <li
                    v-for="(item,index) in userDynamicList"
                    class="infinite-list-item"
                    :class="{'infinite-list-item-active': activeTabTwoIndex === index}"
                    @click="changeActiveTwoIndex(index, item.unique_id, item)"
                    :key="index"
                  >
                    <div class="itemDeatil">
                      <img :src="item.headimgurl" alt class="itemDeatilImg" style="position:relative;top:4px"/>
                      <div style="position:relative;right:20px;top:12px">
                        <p class="itemDeatilText">{{item.nickname}}</p>
                        <div
                          class="newUserTime" style="left:18px;"
                          :class="{'oldUserTime' : item.user_type === '老用户'}"
                        >
                          <div class="newConsumer">{{item.user_type}}</div>
                          <div class="newTimeBefore">{{item.last_visit_time | diffTime}}</div>
                        </div>
                        <div class="scanTimeTotal" style="position:relative;right:44px;bottom:12px;">
                          <div class="timeLong" style="width:210px;text-align:left">
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
                <div class="block time-line-content" v-if="detailList.length > 0">
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
                          <div class="customer-info" v-if="elem.type == '1' && Object.keys(elem.house_info).length > 0">
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
                                <div class="timeLong">
                                  <span>
                                    <span class="price">{{elem.house_info.house_price}}</span>
                                    万 {{elem.house_info.unit_price}}元/平
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else-if="elem.type == '2'  && Object.keys(elem.house_info).length > 0" class="customer-info2">
                            <div class="left">
                              <p>{{elem.house_info.titel}}</p>
                            </div>
                            <img :src="elem.house_info.surface_plot | getImageUrl" alt class="" />
                          </div>
                        </div>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <div v-else class="uploaddetail noData">
                  <img src="../../assets/img/TImeNoneHouse.png" />
                  暂无动态
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <uploadExcel :show.sync="dialogVisible" />
    <uploadPhoto :show.sync="dialogImgVisible" :house_code="house_code" />
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
      activeName: "first",
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
  filters: {
    toParse(value) {
if (value !== '') {
        try {
          return baseUrl + JSON.parse(value)[0];
        } catch (error) {
          return require('../../assets/img/briefImgPhoto.png')
        }
      } else {
        return require('../../assets/img/briefImgPhoto.png')
      }
    },
    getImageUrl(value) {
      if (value !== '' & value != null) {
        return baseUrl + value
      } else {
        return require('../../assets/img/briefImgPhoto.png')
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
  created() {
    this.getList();
    this.getStaticClient();
    this.getUserDynamicList();
    this.getAllhouseOrignPart();
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
  methods: {
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    load() {
      // this.p += 1;
      // this.getList();
    },
    // 显示dialog
    isDialogVisible() {
      this.dialogVisible = true;
    },
    // 显示图片dialog
    isDialogImgVisible() {
      this.dialogImgVisible = true;
    },
    // 显示电话弹框dialog
    isDialogPhoneVisible() {
      this.dialogCallQuantityVisible = true;
    },
    isDialogDescVisible(title) {
      this.dialogDescVisible = true;
      this.descTitle = title;
    },
    shareDetailImg(name) {
      this.dialogShareVisible = true;
      if (name == "获客") {
        this.qrcode = "https://tucs.hailuojia.com/wechat/oauth";
      } else {
        this.qrcode = `https://th5agent.hailuojia.com/detail?house_code=${this.house_code}&unique_id=${this.unique_id}`;
      }
    },
    isDialogCardVisible() {
      this.dialogCardVisible = true;
    },
    getAllhouseOrignPart() {
      let param = {
        unique_id: this.unique_id,
      }
      api.getAllhouseOrign(param).then(response =>{
        let data = response.data;
        if(data.status ===0 ) {
          this.totalImportCount = data.data.totalImportCount;
          this.inCardImportHouseCount = data.data.inCardImportHouseCount;
        }
      }

      )
    },
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
          // this.totalCount = data.data.totalCount;
          // this.inCardImportHouseCount = data.data.inCardImportHouseCount;
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
    getuserlistDetail(share_target) {
      let param = {
        unique_id: share_target,
        share_unique_id: this.unique_id,
        p: 1,
        pz: 10
      };
      let that = this;
      api.getuserlistDetail(param).then(res => {
        let data = res.data;
        if (data.status === 0) {
          this.detailList = [];
          for (var key in data.data) {
            this.detailList.push({
              time: key,
              total_time: data.data[key].total_time,
              data: data.data[key].data
            });
          }
        }
      });
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
    changeActiveOneIndex(index, id) {
      this.activeTabOneIndex = index;
      this.id = id;
      this.getDetail();
    },
    changeActiveTwoIndex(index, unique_id, item) {
      this.activeTabTwoIndex = index;
      this.detailUser = item;
      this.getuserlistDetail(unique_id);
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

<style lang='scss'>
.house {
  background-color: #f5f5f8;
  min-height: calc(100vh - (90px + 77px));
  .house_tab {
    width: 1090px;
    margin: 0 auto;
    background-color: #f5f5f8;
    padding: 30px 0;
    .el-tabs__nav-wrap {
      background-color: #fff;
      padding-left: 70px;
      border-radius: 4px;
      height: 50px;
      .el-tabs__item {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        padding: 0 100px 0 0;
        font-weight: 400;
      }
      .el-tabs__active-bar {
        width: 30px !important;
        left: 16px;
        background: #0f79f5;
        border-radius: 3px;
        height: 4pxr;
      }
    }
    .el-tabs__header {
      margin: 0;
    }
    .search {
      .uploadTime {
        background-color: #fff;
        padding-top: 20px;
        border-radius: 4px;
        width: 100%;
        overflow: hidden;
        .el-form{
          margin: 0 50px;
          text-align: left;
        }
        .el-form-item__label {
          font-size: 16px;
          font-weight: 500;
          color: #444444;
          padding-right: 30px;
        }
        .el-input__inner {
          height: 36px;
          width: 244px;
        }
        .el-button {
          height: 36px;
          width: 100px;
        }
        .uploadHome {
          .homeNumber {
            margin: 0 0 0 20px;
          }
        }
      }
    }
    .detailHome {
      display: flex;
      .timeScroll {
        margin-top: 25px;
        max-height: 1018px;
        overflow-y: auto;
        .uploadTimeShow {
          text-align: left;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          padding-bottom: 20px;
        }
        .infinite-list-item-active {
          background: linear-gradient(left, #6e90f8, #9cb9f6);
          position: relative;
          box-shadow: 0px 5px 8px 0px rgba(156,185,246,0.4); 
          cursor: pointer;
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
        .infinite-list-item {
          width: 360px;
          background-color: #fff;
          margin: auto;
          margin-right: 24px;
          height: 110px;
          margin-bottom: 20px;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          .itemDeatil {
            padding: 20px 20px 0 20px;
            .listViewShow {
              position: relative;
              left: 15px;
            }
          }
          .itemDeatilImg {
            width: 100px;
            height: 70px;
            float: left;
          }
          .itemDeatilNoData {
            width: 100px;
            height: 70px;
            float: left;
            border: 1px solid #d8dde2;
            border-radius: 1px;
            .itemDeatilNoImg {
              width: 34px;
              height: 26px;
              margin-top: 22px;
            }
          }
          .itemDeatilText {
            text-align: left;
            padding: 0 0 0 90px;
            font-weight: 600;
          }
          .detailArea {
            text-align: left;
            padding: 10px 0 0 90px;
            font-size: 13px;
            line-height: 12px;
          }
          .detailTell {
            text-align: left;
            padding: 5px 0 0 88px;
            font-size: 13px;
            line-height: 12px;
          }
          .scanTimeTotal {
            font-size: 12px;
            .timeLong {
              position: absolute;
              left: 110px;

              .scanTotal {
                display: inline;
              }
              .bold {
                font-weight: 600;
                font-size: 14px;
              }
            }
          }
          .newUserTime {
            width: 100px;
            height: 20px;
            float: right;
            font-size: 12px;
            top: -20px;
            position: relative;
            border: 2px solid #116ef4;
            border-radius: 2px;
            line-height: 22px;
            font-weight: 400;
            text-align: -webkit-right;
            background: #fff;
            .newConsumer {
              float: left;
              width: 40px;
              color: #116ef4;
            }
            .newTimeBefore {
              width: 52px;
              background-color: #116ef4;
              color: #fff;
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
          }
          .oldUserTime {
            width: 100px;
            height: 20px;
            float: right;
            font-size: 12px;
            top: -20px;
            position: relative;
            border: 2px solid #35bc99;
            border-radius: 2px;
            line-height: 22px;
            font-weight: 400;
            text-align: -webkit-right;
            background: #fff;
            .newConsumer {
              float: left;
              width: 40px;
              color: #35bc99;
            }
            .newTimeBefore {
              width: 52px;
              background-color: #35bc99;
              color: #fff;
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
          }
          .houseBest {
            color: #188df9;
            font-size: 12px;
            margin: 10px 2px;
            float: left;
            padding: 4px;
            border-radius: 4px;
            background-color: #e7f4ff;
          }
          .houseBestNone {
            color: #188df9;
            font-size: 12px;
            margin: 4px 2px;
            float: left;
            padding: 4px;
            border-radius: 2px;
            color: #bbbbbb;
            border: 1px solid #f2f2f2;
          }
        }
      }
    }
    .uploaddetail {
      background-color: #fff;
      margin: 24px 0 0 0;
      padding-top: 20px;
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
    }
  }
  .quantity {
    .quantityUser {
      width: 200px;
      height: 70px;
      background-color: #a3a5ba;
      color: #ffffff;
      text-align: center;
      border-radius: 10px;
      padding-top: 10px;
      margin: 10px 56px 30px 0;
      float: left;
      box-shadow: 0px 5px 18px #a3a5ba;
      .quantityUserNums {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
      }
      .quantityUserNumerbers {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }
  .addQuantity {
    background-color: #a3a5ba;
    width: 200px;
    height: 70px;
    color: #ffffff;
    text-align: center;
    border-radius: 10px;
    padding-top: 10px;
    margin: 10px 56px 30px 0;
    float: left;
    box-shadow: 0px 5px 18px #a3a5ba;
    .quantityAddNums {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
    }
    .quantityToday {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }
  }
  .callQuantity {
    background: linear-gradient(left, #4cd1a9, #54e272) !important;
    width: 200px;
    height: 70px;
    color: #ffffff;
    text-align: center;
    border-radius: 10px;
    padding-top: 10px;
    margin: 10px 56px 50px 0;
    float: left;
    box-shadow: 0px 5px 18px #4cd1a9;
    .callQuantityNums {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
    }
    .callQuantityNumerbers {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }
  }
  .shareUser {
    float: left;
  }
  .customerDynamic {
    overflow: hidden;
    .scanTimeTotal {
      width: 295px;
      margin-top: -16px;
      float: right;
    }
    .itemDeatil {
      img {
        border-radius: 50%;
        width: 60px !important;
        height: 60px !important;
      }
    }
    .infinite-list-item-active {
      background: linear-gradient(left, #6e90f8, #9cb9f6);
      position: relative;
      .itemDeatilText {
        color: #fff;
      }
      .detailArea,
      .detailTell,
      .scanTimeTotal {
        color: #fff;
      }
      .newUserTime {
        border: 2px solid #fff !important;
        .newConsumer {
          color: #9ab7f7 !important;
          background: #fff !important;
        }
        .newTimeBefore {
          background: #9cb9f6 !important;
        }
      }
      .oldUserTime {
        border: 2px solid #fff !important;
        .newConsumer {
          color: #35bc99 !important;
          background: #fff !important;
        }
        .newTimeBefore {
          background: #35bc99 !important;
        }
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
  }
  .userList {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
    margin: 24px;
    margin-left: 12px;
    align-items: center;
    .userlist-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px;
      padding: 0 8px;
      height: 87px;
      width: 290px;
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
  .house_cards-cate {
    display: flex;
    flex-wrap: wrap;
    display: inline-block;
    width: 330px;
    span {
      display: inline-block;
      margin-right: 10px;
      background: #edf1ff;;
      border-radius: 4px;
      color: #4e84ff;;
      font-size: 12px;
      padding: 2px 4px;
      margin-bottom: 10px;
    }
  }
  .time-line-content {
    .el-card {
      background: #f7f8fa;
      border: none;
      .content {
        margin: 6px 0;
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
            margin-top: 10px;
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
  #pane-second {
    .uploaddetail {
      max-height: 1019px;
      overflow: auto;
    }
  }
}
</style>