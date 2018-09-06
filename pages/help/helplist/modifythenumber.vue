<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>可以联系客服人员进行修改.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
    name: "modifythenumber"
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
