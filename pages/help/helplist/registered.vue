<template>
    <div class="agent_thatw">
        <div class="top_contentw">
            <p>点击网站右上角＂注册＂按钮,就可以进入用户注册页面;</p>
            <p>按照提示,填写注册信息,即可完成注册;</p>
            <p>用户帐号请输入5-20个英文字母或数字或下划线,不能用中文;</p>
            <p>登录密码请输入6-20个英文字母或数字或下划线;</p>
            <p>注册完成后,进入＂我的账户＂,＂个人信息＂可以修改头像和设置昵称.</p>
            <nuxt/>
        </div>

    </div>
</template>

<script>
export default {
    name: "registered"
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
