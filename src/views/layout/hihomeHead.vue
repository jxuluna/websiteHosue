<!--官网头部-->
<template>
    <div class="header_page">
        <div class="header_main">
            <div class="logo">
                <img src="../../assets/img/logo.png" alt="">
            </div>
            <ul class="header_ul">
                <li><router-link to='home'>首页</router-link></li>
                <li><router-link to='myHouse'>{{looking}}</router-link></li>
                <li @mouseover="changeActive('aboutUs1','敬请期待')" @mouseout="removeActive('aboutUs1','关于我们')">{{aboutUs1}}</li>
            </ul>
            <div class="login_box">
                <ul class="login_ul">
                    <li @click="loginCode">{{nickname}}</li>
                    <li class="userInfo"><img :src="headimgurl" alt="" style="margin-left:15px"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        looking:'经纪人入驻',
        aboutUs1:'关于我们',
        isLogin:false,
        userName: '123',
        routerName: ''
      }
    },
    computed: {
      ...mapGetters(['nickname','headimgurl'])
    },
    created() {
      this.routerName = this.$route.name;
    },
    methods: {
      loginCode() {
        if (this.headimgurl !== '') return;
        this.$router.push('login')
      },
     changeActive(val, e) {
        console.log(e);
        if (val == 'aboutUs1') {
          this.aboutUs1 = e;
        }
      },
      removeActive(val, e) {
        if (val == 'aboutUs1') {
          this.aboutUs1 = e;
        }
      },
    },
  }
</script>

<style lang="scss">
    .header_page{
        width: 100%;
        height: 80px;
        .header_main{
            width: 1090px;
            height: 80px;
            margin: 0 auto;
            .logo{
                width: 170px;
                float: left;
                height: 80px;
                img{
                    width: 121px;
                    margin-top: 29px;
                }
            }
            .header_ul{
                float: left;
                line-height: 80px;
                padding-left: 50px;
                li{
                    font-size:14px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    // color:rgba(0,0,0,1);
                    float: left;
                    padding: 0 70px;
                    cursor: pointer;
                    a {
                      color: #000;
                      font-weight: 600;
                    }
                }

            }
            .login_box{
                float: right;
                ul{
                    line-height: 80px;
                    font-size:12px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    padding: 0 10px;
                    box-sizing: border-box;
                    // color:rgba(0,0,0,.5);
                    li{
                        float: left;
                        cursor: pointer;
                    }
                    .login_line{
                        padding: 0 22px;
                    }
                }
                .userInfo{
                  span {
                    font-size: 16px;
                  }
                  img {
                    width: 38px;
                    vertical-align: middle;
                    border-radius:50%;
                  }
                }

            }
        }
        .router-link-active {
          color: #306cff !important;
          font-size:14px;
          font-weight: 600;
        }
    }
</style>
