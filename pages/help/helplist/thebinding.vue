<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>点进入＂我的账户＂＂银行卡管理＂可以绑定您要用来提现的银行卡;</p>
      <p>绑定银行卡前,需先设置安全密码;</p>
      <p>银行卡最多只允许绑定5张;</p>
      <p>银行卡绑定支持所有主流银行;</p>
      <p>为了用户资金安全,已成功提现的银行卡将自动锁定，无法删除和修改；如想弃用银行卡;</p>
      <p>可联系在线客服禁用该银行卡.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'thebinding'
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
