<template>
  <div class="wrap">
    <div class="title"></div>
    <div class="content">
      <Form ref="user" :model="user" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="user.username" placeholder="用户名" class="w120">
          <Icon type="ios-person-outline" slot="prepend" style="font-size:18px;"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="user.password" placeholder="登录密码" class="w120">
          <Icon type="ios-locked-outline" slot="prepend" style="font-size:18px;"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="vscode">
          <Input type="text" v-model="user.vcode" placeholder="验证码..." class="w120 vcode">
          <div slot="append" style="overflow:hidden;width:60px;height:30px;">
            <img :src="verifyImg" alt="" @click="getVerify" class="vscode-locked-outline">
          </div>

          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit()">
            <span v-if="!loading">登录</span>
            <span v-if="loading">登录中..</span>
          </Button>
          <a href="register" class="ivu-btn ivu-btn-primary">注册</a>
          <a href="forget">忘记密码？</a>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import http from "~/api/http";
import { mapState } from "vuex";

export default {
  name: "user_login",
  props: ["userinfo"],
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
        vcode: "",
        vid: ""
      },
      verifyImg: "",
      ruleInline: {},
      key: 0
      // spinShow: true
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      let err = this.$store.dispatch("login", this.user);
      if (!!err) {
        this.getVerify();
        this.loading = false;
      }
    },
    async getVerify() {
      let img = await http({
        ac: "getVerifyImage"
      });
      this.verifyImg = img.img;
      this.user.vid = img.vid;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.userinfo && !this.$store.state.userinfo.isLogin) {
        // this.getVerify();
      }
    });
  }
};
</script>

<style>

</style>
