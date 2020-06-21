<template>
    <div class="footer_page">
        <div class="footer_main">
            <ul class="footer_ul">
                <li @mouseover="changeActive('aboutUs','敬请期待')" @mouseout="removeActive('aboutUs','关于我们')">{{aboutUs}}
                </li>
                <li class="footer_line">|</li>
                <li @mouseover="changeActive('joinUs','敬请期待')" @mouseout="removeActive('joinUs','加入我们')">{{joinUs}}</li>
            </ul>
            <p class="footer_text1"> Copyright 2020 www.hailuojia.com All Rights Reserved</p>
            <p class="footer_text2">京ICP备17067822号-2</p>
            <div class="footer_text3">
                <img src="../../assets/img/ba.png" style="float:left;"/>
                <p>京公网安备 11010502040606号</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        aboutUs: '关于我们',
        joinUs: '加入我们',
      }
    },
    methods: {
      changeActive(val, e) {
        console.log(e);
        if (val == 'aboutUs') {
          this.aboutUs = e;
        } else {
          this.joinUs = e;
        }
      },
      removeActive(val, e) {
        if (val == 'aboutUs') {
          this.aboutUs = e;
        } else {
          this.joinUs = e;
        }
      },
    },
  }
</script>

<style lang="scss">
    .footer_page {
        width: 100%;
        height: 77px;
        background: rgba(51, 51, 51, 1);
        clear: both;
        .footer_main {
            width: 1090px;
            height: 77px;
            line-height: 77px;
            margin: 0 auto;
            font-family: PingFangSC-Light, PingFang SC;
            font-size: 12px;
            font-weight: 300;
            color: rgba(255, 255, 255, 1);
            padding: 0 50px;
            box-sizing: border-box;

            .footer_ul {
                float: left;
                padding-right: 52px;

                .footer_line {
                    padding: 0 10px;
                }

                li {
                    float: left;
                    line-height: 77px;
                    cursor: pointer;
                }
            }

            .footer_text1, .footer_text2 {
                float: left;
                padding-right: 52px;
            }

            .footer_text3 {
                float: left;

                img {
                    margin-top: 28px;
                }

                p {
                    line-height: 77px;
                    font-size: 12px;
                    font-family: PingFangSC-Light, PingFang SC;
                    font-weight: 300;
                    color: rgba(255, 255, 255, 1);
                    float: left;
                    padding-left: 6px;
                }
            }
        }
    }
</style>
