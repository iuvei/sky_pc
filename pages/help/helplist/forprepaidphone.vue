<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>账号登录后,点击网站右上角＂充值＂按钮,就可以进入充值页面;</p>
      <p>目前网站提供了＂银行转账＂＂快捷支付＂＂支付宝＂＂微信支付＂＂QQ＂五项充值方式;</p>
      <p>如实填写充值信息，并提交充值订单,1-2分钟左右，刷新账户余额,即可到账;</p>
      <p>点击＂我的账户＂＂交易记录＂可查看每日的交易明细;</p>
      <p>大额充值建议使用＂银行转账＂.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'forprepaidphone'
};
</script>
<style lang="scss" scoped>
.agent_thatw {
  width: 100%;
  .top_contentw {
    width: 100%;
    p {
      margin-top: 7px;
      margin-left: 60px;
      font-size: 15px;
    }
  }
}
</style>
