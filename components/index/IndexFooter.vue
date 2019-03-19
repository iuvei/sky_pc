<template>
  <div class="footer">
    <div class="footer_main ">
      <div class="zhichi box_ft ">
        <div class="head ">
          <h2>品质服务
            <span>Quality service</span>
          </h2>
        </div>
        <div class="zc ">
          <div class="sprite-index_footer index_footer-ws"></div>
          <p>
            最专业的平台<br> 最精诚的服务
          </p>
        </div>
      </div>
      <div class="dongtai box_ft "
           style="flex-grow: 2;">
        <div class="head ">
          <h2>服务体验
            <span>Service experience</span>
          </h2>
        </div>
        <div class="zr">
          <div class="average-time">
            <span class="bottom_txt">昨日充值平均时间</span>
            <Progress :percent="15"
                      :stroke-width="16">
              <span class="progress_txt"
                    style="color: #333;">5'00</span>
              <span style="font-size:'12px';color: #bbb;">秒</span>
            </Progress>
          </div>
          <div class="average-time">
            <span class="bottom_txt">昨日提现平均时间</span>
            <Progress :percent="90"
                      :stroke-width="16"
                      status="success">
              <span class="progress_txt"
                    style="color: #333;">30'00</span>
              <span style="font-size:'12px';color: #bbb;">秒</span>
            </Progress>
          </div>
        </div>
      </div>

      <div class="chongzhi box_ft ">
        <div class="head ">
          <h2>充值方式
            <span>Recharge method</span>
          </h2>
        </div>
        <div class="cz "
             style="margin-left: 20px;">
          <div class="sprite-index_footer index_footer-weixin left_img_footer"></div>
          <div class="sprite-index_footer index_footer-zhifubao left_img_footer"></div>
          <div class="sprite-index_footer index_footer-qq left_img_footer"></div>
          <div class="sprite-index_footer index_footer-yinlian left_img_footer"></div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <!--认证-->
    <div class="comp"
         style="width:675px;">
      <div class="sprite-index_footer index_footer-jubao bottom_img_footer"></div>
      <div class="sprite-index_footer index_footer-baozhang bottom_img_footer"></div>
      <div class="sprite-index_footer index_footer-gonggong bottom_img_footer"></div>
      <div class="sprite-index_footer index_footer-xinyong bottom_img_footer"></div>
      <div class="sprite-index_footer index_footer-renzheng bottom_img_footer"></div>
      <div style="clear: both"></div>
    </div>
    <div class="footer_bottom "
         style="text-align: center;">
      <p>2009-2019 © {{sysinfo && sysinfo.web_title}}版权所有 {{edition}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import version from "../../config/edition.json";
export default {
  name: "IndexFooter",
  serverCacheKey() {
    return Math.floor((Date.now() / 1000) * 60 * 60 * 24);
  },
  filters: {
    formatMoney(num) {
      var num = (num || 0).toString(),
        result = "",
        arr = num.split(".");
      num = arr[0];
      while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      if (arr[1] && arr[1].length) {
        result += "." + arr[1];
      }
      return result;
    }
  },
  computed: {
    sysinfo() {
      return this.$store.getters["sysinfo/sysInfo"];
    },
    edition() {
      return (version && version.edition) || "";
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #d5c7b7;
  background: #f8f8f8;
  margin-top: -1px;
  width: 100%;
  min-width: 1000px;
  min-height: calc(100vh - 732px);
}
.footer .footer_main {
  display: flex;
  margin: auto;
  width: 1000px;
  height: 100px;
  margin-top: 20px;
}
.footer .footer_main .box_ft {
  flex-grow: 1;
}
.footer .footer_main .dongtai {
  border-right: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  padding: 0 20px;
}
.footer .footer_main .box_ft .head {
  height: 30px;
}
.footer .footer_main .box_ft .head h2 {
  float: left;
  width: 300px;
  color: #666;
  // font-family: "å¾®è½¯é›…é»‘";
  font-size: 18px;
  font-weight: 600;
  padding-left: 45px;
}
.footer .footer_main .box_ft .head span {
  color: #b8b8b8;
  font-size: 12px;
  margin-left: 6px;
}
.footer .footer_main .box_ft .zc {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.footer .footer_main .box_ft .zc p {
  // float: left;
  text-align: left;
  color: #666;
  font-size: 14px;
  font-weight: 400;
  font-family: "å¾®è½¯é›…é»‘";
  margin-left: 45px;
  margin-top: -6px;
  line-height: 25px;
}
.footer .footer_main .box_ft .zr {
  width: 100%;
  margin-top: 10px;
}
.footer .footer_main .box_ft .zr .average-time {
  width: 100%;
  display: flex;
  justify-content: center;
}
.footer .footer_main .box_ft .zr .average-time .bottom_txt {
  display: inline-block;
  width: 174px;
  height: 30px;
  line-height: 30px;
  font-family: "å¾®è½¯é›…é»‘";
  font-size: 14px;
  font-weight: 400;
}
.footer .footer_main .box_ft .cz img {
  margin: 0 11px;
  margin-top: 25px;
}
.sprite-index_footer {
  display: inline-block;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url(~/index_footer.png);
}

.index_footer-baozhang {
  width: 99px;
  height: 37px;
  background-position: -1px -85px;
}
.index_footer-gonggong {
  width: 99px;
  height: 37px;
  background-position: -86px -1px;
}
.index_footer-jubao {
  width: 99px;
  height: 37px;
  background-position: -86px -40px;
}
.index_footer-renzheng {
  width: 98px;
  height: 36px;
  background-position: -102px -79px;
}
.index_footer-tb_tz {
  width: 7px;
  height: 5px;
  background-position: -102px -117px;
}
.index_footer-xinyong {
  width: 98px;
  height: 36px;
  background-position: -187px -1px;
}
.index_footer-hover_icon {
  width: 98px;
  height: 35px;
  background-position: -187px -39px;
}
.index_footer-yinlian {
  width: 54px;
  height: 33px;
  background-position: -202px -76px;
}
.index_footer-m_jiantou {
  width: 7px;
  height: 11px;
  background-position: -202px -111px;
}
.index_footer-ws {
  width: 43px;
  height: 41px;
  background-position: -258px -76px;
}
.index_footer-weixin {
  width: 38px;
  height: 34px;
  background-position: -287px -1px;
}
.index_footer-zhifubao {
  width: 34px;
  height: 34px;
  background-position: -287px -37px;
}
.index_footer-qq {
  width: 28px;
  height: 34px;
  background-position: -303px -73px;
}
.index_footer-ups {
  width: 13px;
  height: 13px;
  background-position: -303px -109px;
  margin-right: 5px;
}
.index_footer-wenhao {
  width: 13px;
  height: 13px;
  background-position: -318px -109px;
  margin-right: 5px;
}
.index_footer-jiangbei {
  width: 20px;
  height: 20px;
  background-position: -323px -37px;
}
.index_footer-gou {
  width: 19px;
  height: 21px;
  background-position: -327px -1px;
}
.index_footer-icon_nar {
  width: 21px;
  height: 18px;
  background-position: -333px -59px;
}
.index_footer-ios {
  width: 16px;
  height: 20px;
  background-position: -345px -24px;
  margin-right: 5px;
}
.index_footer-gonggao {
  width: 17px;
  height: 17px;
  background-position: -348px -1px;
}
.index_footer-nav_line {
  width: 1px;
  height: 37px;
  background-position: -363px -20px;
}
.index_footer-outline_bj {
  width: 1px;
  height: 37px;
  background-position: -366px -20px;
}
.index_footer-ipone {
  width: 11px;
  height: 20px;
  background-position: -356px -59px;
}
.index_footer-shandian {
  width: 15px;
  height: 19px;
  background-position: -333px -79px;
  float: left;
}
.index_footer-shuaxin {
  width: 16px;
  height: 14px;
  background-position: -350px -81px;
}
.index_footer-ren {
  width: 14px;
  height: 14px;
  background-position: -350px -97px;
}
.index_footer-soutou {
  width: 11px;
  height: 14px;
  background-position: -333px -100px;
}
.index_footer-android {
  width: 17px;
  height: 20px;
  background-position: -368px 0px;
  margin-right: 5px;
}
.comp {
  margin: 0 auto;
}
.left_img_footer {
  margin: 25px 12px 0px 12px;
}
.bottom_img_footer {
  margin: 20px 16px 0px 16px;
}
.footer_bottom {
  padding: 6px 0;
}
</style>
<style lang="scss">
.footer {
  .ivu-progress-outer {
    width: 80%;
  }
  .ivu-progress-inner {
    background-color: #ddd;
  }
  .progress_txt {
    font-size: 20px !important;
    font-weight: 400;
  }
}
</style>


