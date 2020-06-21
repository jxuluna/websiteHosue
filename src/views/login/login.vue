<template>
  <div class="login_main">
    <!-- <button @click="loginFun">登录</button> -->
    <div class="iphone">
      <div id="login_container" @click="loginFun"></div>
    </div>
    <div class="icon_all">
      <div class="icon_name">
        <div class="desc_icon">
          <img src="../../assets/img/login_icon1.png" />
          <div class="desc">
            <p>批量房源随时管理</p>
            <p>个人房源随心传，安全隐秘</p>
          </div>
        </div>
        <div class="desc_icon">
          <img src="../../assets/img/login_icon2.png" />
          <div class="desc">
            <p>私域客源随时跟进</p>
            <p>朋友圈客源转化利器</p>
          </div>
        </div>
      </div>
      <div class="icon_round">
        <div class="desc_icon">
          <img src="../../assets/img/login_icon3.png" />
          <div class="desc">
            <p>朋友圈客户随时维护</p>
            <p>简单客户关系维护，化被动为主动</p>
          </div>
        </div>
        <div class="desc_icon">
          <img src="../../assets/img/login_icon4.png" />
          <div class="desc">
            <p>卖房成交效果翻番</p>
            <p>年成交套数翻一倍</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  created() {
    // setTimeout(function () {
    //   let obj = new WxLogin({
    //     self_redirect:false,
    //     id:"login_container",
    //     appid: "wx2ebdf3b468fefeee",
    //     scope: "snsapi_login",
    //     redirect_uri: "open/userinfo/get",
    //     state: "website",
    //     style: "",
    //     href: ""
    //   });
    // },2000)
  },
  mounted() {
    let obj = new WxLogin({
      self_redirect: false,
      id: "login_container",
      appid: "wx2ebdf3b468fefeee",
      scope: "snsapi_login",
      redirect_uri: 'http://tucs.hailuojia.com/open/userinfo/get',
      state: "website",
      style: "",
      href: "https://hihome2019.oss-cn-beijing.aliyuncs.com/code.css"
    });
  },
  methods: {
    loginFun() {
      let obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx2ebdf3b468fefeee",
        scope: "snsapi_login",
        redirect_uri: "http://tucs.hailuojia.com/open/userinfo/get",
        state: "website",
        style: "",
        href: ""
      });
    }
  }
};
</script>

<style lang="scss">
.login_main {
  background: url("../../assets/img/loginBg.png");
  background-size: cover;
  min-height: calc(100vh - (90px + 77px));
  background-position: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .iphone {
    background: url("../../assets/img/bg_iphone.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 356px;
    height: 600px;
    // overflow: hidden;
    // display: inline-flex;
    // text-align: center;
    // vertical-align: middle;
    // margin-top: 50px;
  }
  #login_container {
    margin: 88px 22px 90px 32px;
  }
  .icon_all {
    width: 98%;
    height: 250px;
    display: flex;
    justify-content: space-around;
    margin-top: -100px;
    .icon_name,
    .icon_round {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .desc_icon {
        display: flex;
        align-items: center;
        img {
          width: 80px;
        }
        .desc {
          text-align: left;
          p {
            color: #fff;
            font-size: 14px;
            line-height: 28px;
          }
          :first-child {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
