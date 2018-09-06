<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      <div class="err-404"></div>
      <h2 class="tit w_pl txt_cen">oh, 您迷路了...</h2>
      <p class="link w_pl txt_cen">别着急，点击
        <a href="/">这里</a>就可以找到出路</p>
    </h1>
    <div v-else-if="error.satusCode === 45000" class="err-45000">
      <!-- <h1>An error occurred</h1> -->
      <!-- <nuxt-link to="/">主页</nuxt-link> -->
    </div>
    <div v-else>
      <h1>An error occurred</h1>
      <nuxt-link to="/">主页</nuxt-link>
    </div>

  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "index" // you can set a custom layout for the error page
};
</script>

<style>
.err-404 {
  background: url(~/bg404.png) no-repeat top center;
  width: 757px;
  height: 435px;
  margin: 0 auto;
}
.err-45000 {
  background: url(~/maintain.png) no-repeat top center;
  width: 757px;
  height: 435px;
  margin: 0 auto;
}
.container {
  text-align: center;
  line-height: 2;
}
.container .link a {
  color: #e93248;
}
</style>
