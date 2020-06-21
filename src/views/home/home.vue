<template>
  <div class="index_main">
    <div class="index_img">
      <img src="../../assets/img/bj1.jpg" alt class="img1" />
      <img src="../../assets/img/bj2.jpg" alt class="img2" />
      <img src="../../assets/img/bj3.jpg" alt class="img3" />
    </div>
    <div class="index_main_box">
      <!--业主端-->
      <div class="owner_box">
        <img src="../../assets/img/icon_iphone.png" alt class="owner_img" />
        <!--海螺卖房-->
        <div class="sellers_box">
          <p class="sellers_title">海螺卖房</p>
          <p class="sellers_title1">全国卖房最快的房产平台</p>
          <div class="sellers_content">
            <!--二维码-->
            <div class="qr_code_box">
              <div class="qr_code">
                <img src="../../assets/img/icon4.jpg" alt />
              </div>
              <p class="qr_code_text">—— 扫码立即卖房 ——</p>
            </div>
            <!---->
            <div class="sellers_lf">
              <p class="sellers_text1">·房源对接全城经纪人，扩大销售半径</p>
              <p class="sellers_text1">·房源对接全城客户，定位意向人群</p>
              <p class="sellers_text1">·房屋推广保卖服务，加快成交速度</p>
              <ul class="sellers_ul">
                <li>房产咨询</li>
                <li>行情分析</li>
                <li>精准估价</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!--经纪人端-->
      <div class="agent_box">
        <div class="agent_title">
          <div class="agent_line"></div>
          <p class="agent_text">海螺卖房</p>
          <p class="agent_text1">经纪人找房新渠道</p>
        </div>
        <div class="agent_content">
          <ul class="agent_ul">
            <li>
              <img src="../../assets/img/icon3.png" alt />
              <p class="agent_p_text">新上房源实施提醒</p>
              <p class="agent_p_text">扩大门店房源商圈</p>
              <p class="agent_p_text1">01</p>
            </li>
            <li>
              <img src="../../assets/img/icon2.png" alt />
              <p class="agent_p_text">客户动态随时掌握</p>
              <p class="agent_p_text">微信转化客户神器</p>
              <p class="agent_p_text1">02</p>
            </li>
            <li>
              <img src="../../assets/img/icon1.png" alt />
              <p class="agent_p_text">赏金房源 推广增收</p>
              <p class="agent_p_text">除了成交还有外快</p>
              <p class="agent_p_text1">03</p>
            </li>
          </ul>
          <div class="agent_qr_code">
            <img src="../../assets/img/icon5.png" alt />
          </div>
          <div class="agent_qr_code1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.index_main {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 1392px;
  .index_img {
    width: 100%;

    img {
      width: 100%;
      display: block;
      float: left;
      object-fit: cover;
    }
  }

  .index_main_box {
    width: 1090px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    padding-bottom: 134px;

    .owner_box {
      width: 100%;
      overflow: hidden;

      .owner_img {
        width: 473px;
        object-fit: cover;
        display: block;
        float: left;
        margin: 51px 0 0 50px;
        /*margin: 51px 0 0 88px;*/
      }

      .sellers_box {
        float: left;
        margin: 55px 0 0 88px;

        .sellers_title {
          height: 90px;
          font-size: 64px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 90px;
          text-shadow: 0px 2px 6px rgba(30, 114, 216, 1);
          text-align: left;
        }

        .sellers_title1 {
          height: 44px;
          font-size: 40px;
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
          line-height: 44px;
          text-shadow: 0px 2px 4px rgba(31, 117, 221, 1);
          text-align: left;
        }

        .sellers_content {
          width: 100%;
          overflow: hidden;
          margin-top: 30px;

          .qr_code_box {
            width: 132px;
            float: left;

            .qr_code {
              width: 132px;
              height: 132px;
              background: rgba(255, 255, 255, 1);
              border-radius: 5px;
              padding: 10px;
              box-sizing: border-box;
              img {
                width: 100%;
              }
            }

            .qr_code_text {
              text-align: center;
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              color: rgba(255, 255, 255, 1);
              line-height: 17px;
              margin-top: 10px;
            }
          }
          .sellers_lf {
            float: left;
            margin-left: 24px;
            .sellers_text1 {
              height: 20px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 20px;
              margin-bottom: 5px;
              text-align: left;
            }
            .sellers_ul {
              margin: 16px 0 0 2px;
              li {
                width: 79px;
                height: 20px;
                line-height: 20px;
                background: rgba(52, 144, 254, 1);
                border-radius: 10px;
                text-align: center;
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                float: left;
                margin-right: 12px;
              }
              li:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }

    .agent_box {
      width: 100%;
      position: relative;
      .agent_title {
        margin: 0 auto;
        .agent_line {
          width: 50px;
          height: 2px;
          margin: -20px auto 21px;
        }
        .agent_text {
          text-align: center;
          height: 56px;
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: 56px;
          margin-bottom: 7px;
        }
        .agent_text1 {
          text-align: center;
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 33px;
        }
      }
      .agent_content {
        width: 839px;
        height: 412px;
        background: rgba(255, 255, 255, 1);
        padding: 34px 18px;
        border-radius: 5px;
        margin: 34px auto 0;
        box-shadow: 0px 0px 14px 0px rgba(155, 165, 186, 0.25);
        .agent_ul {
          width: 100%;
          padding: 47px 41px 0;
          overflow: hidden;
          box-sizing: border-box;
          li:last-child {
            margin-right: 0;
          }
          li {
            position: relative;
            float: left;
            margin-right: 159px;
            img {
              width: 128px;
              display: block;
              margin: 0 auto 50px;
            }
            .agent_p_text {
              text-align: center;
              height: 18px;
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 1);
              line-height: 18px;
              padding-bottom: 25px;
            }
            .agent_p_text1 {
              height: 84px;
              font-size: 60px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.05);
              line-height: 84px;
              position: absolute;
              left: -15px;
              bottom: 55px;
            }
          }
        }
        .agent_qr_code {
          width: 188px;
          height: 188px;
          display: block;
          margin: 37px auto 0;
          border-radius: 100%;
          /*box-shadow: -2px 0px 14px 0px rgba(155, 165, 186, 0.25);*/
          /*box-shadow: 0 2px 3px -1px rgba(155, 165, 186, 0.25);*/
          background: #fff;
          box-sizing: border-box;
          img {
            width: 100%;
            object-fit: cover;
          }
        }
        .agent_qr_code1 {
          width: 188px;
          height: 188px;
          background: rgba(155, 165, 186, 0.25);
          position: absolute;
          left: 50%;
          bottom: -89px;
          transform: translate(-50%, 0);
          border-radius: 100%;
          z-index: -1;
          box-shadow: -2px 0px 14px 0px rgba(155, 165, 186, 0.2);
        }
      }
    }
  }
}
</style>
