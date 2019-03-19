<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>提款不成功分两种情况:</p>
      <p>. 提款申请未成功:</p>
      <p>1、提款金额大于账户实有金额。</p>
      <p>2、提款时填写的提款密码与用账户信息设置的密码不一致.</p>
      <p>3、银行卡信息不符合规定格式.</p>
      <p>. 申请提款成功，但款项没有到达指定账户:</p>
      <p>1、银行卡卡号填写错误，与用户姓名不符，银行退单.</p>
      <p>一旦发生上述现象，请及时联系客服，由客服人员为您服务.</p>
      <nuxt/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'youdontsucceed'
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
