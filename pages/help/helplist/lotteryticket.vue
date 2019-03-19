<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>购彩前需要先进行充值,账户有余额才可以进行购彩投注;</p>
      <p>充值完成后,可进入＂购彩大厅＂选择您喜欢的彩票进行投注;</p>
      <p>彩票投注页面,提供了＂玩法说明＂＂走势图＂,可以帮您更快了解＂玩法规则＂和＂开奖走势＂;</p>
      <p>投注完成后,可以进入＂我的账户＂＂投注记录＂,查看您的投注明细,查看是否中奖;</p>
      <p>投注完成后,需等开奖后,才能查看是否中奖;</p>
      <p>投注成功后,系统将自动从您的账户余额扣除对应的投注金额,如果中奖,奖金会自动添加到您的账户余额;</p>
      <p>可以进入＂我的账户＂＂交易记录,，查看您的账户交易明细.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'lotteryticket'
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
