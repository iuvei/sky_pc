<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>如实填写充值信息,并提交充值订单，1-2分钟左右,刷新账户余额,即可到账;</p>
      <p>如果还是没到账请联系客服查证.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
    name: "whatdo"
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
