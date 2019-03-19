<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>在"我的账户"左侧选择"投注记录",即可查看购买彩票的记录.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'colorrecords'
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
