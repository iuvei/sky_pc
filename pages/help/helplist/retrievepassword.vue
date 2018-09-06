<template>
  <div class="agent_thatw">
    <div class="top_contentw">
      <p>请及时提供相应信息给客服.系统将重置一个新密码,并把新密码发送到用户注册时提交的电子邮箱中,</p>
      <p>为保障账户安全,建议用户登录后立即修改密码。</p>
      <nuxt/>
    </div>

  </div>
</template>

<script>
export default {
    name: "retrievepassword"
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
