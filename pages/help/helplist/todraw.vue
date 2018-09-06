<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>中奖后如何提现？点击网站右上角＂提现＂按钮,就可以进入提现页面;</p>
      <p>选择您绑定的银行卡,填写您要提现的金额,并输入＂安全密码＂;</p>
      <p>提现订单提交后,3-5分钟左右即可到账,可登录银行查看银行账户余额;</p>
      <p>点击＂我的账户＂＂交易记录＂可查看每日的交易明细;</p>
      <p>提现之前需先设置＂安全密码＂和绑定您要用来提现的银行卡.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
    name: "todraw"
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
