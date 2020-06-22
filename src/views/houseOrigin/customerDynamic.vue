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
    <!-- <div v-if="userDynamicList.length === 0" class="uploaddetail noData">
      <img src="../../assets/img/noData.png" />
      暂无动态
    </div>-->
    <div class="houseDynamicUser">
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
              <img
                :src="item.headimgurl"
                alt
                class="itemDeatilImg"
                style="position:relative;top:4px"
              />
              <div style="position:relative;right:20px;top:12px">
                <p class="itemDeatilText">{{item.nickname}}</p>
                <div
                  class="newUserTime"
                  style="left:18px;"
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
    </div>
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
      dialogShareVisible: false,
      id: 0,
      house_code: "",
      qrcode: "", // 二维码
      userDynamicList: [],
      activeTabTwoIndex: 0,
      nickname:"",
      headimgurl: "",
      user_type: "",
      last_visit_time: "",
      house:'',
      information:'',
    };
  },
  methods: {
    shareDetailImg(name) {
      this.dialogShareVisible = true;
      if (name == "获客") {
        debugger;
        this.qrcode = "https://tucs.hailuojia.com/wechat/oauth";
      } else {
        this.qrcode = `https://th5agent.hailuojia.com/detail`;
      }
    },
    changeActiveTwoIndex(index, unique_id, item) {
      this.activeTabTwoIndex = index;
      this.detailUser = item;
      this.getuserlistDetail(unique_id);
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
    shareHouse
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
  max-height: 1018px;
  padding-top: 30px;
  background-color: #f8faff;
  display: flex;
}
</style>