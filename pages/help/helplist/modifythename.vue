<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>一经绑定,用户本人无法直接修改真实姓名,但可以联系客服人员进行修改。操作流程如下:</p>
      <p>联系客服人员（可通过电话、QQ、邮件等途径）,说明修改的原因;</p>
      <p>客服部收到授权后,由专员核实信息提交报告，交领导批准签字;</p>
      <p>主管领导签字后,技术专员在有人监督的情况下,修改用户的错误信息.</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
    name: "modifythename"
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
