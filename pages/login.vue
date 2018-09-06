<template>
  <div class="wrap">
    <div class="title">
      没有账号？
      <a href="/register">立即注册</a>
      <!-- <nuxt-link :to="register">立即注册</nuxt-link> -->
    </div>
    <div class="content">
      <Form ref="user" :model="user" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text" v-model.trim="user.username" placeholder="用户名" :maxlength="20" size="large" @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model.trim="user.password" placeholder="登录密码" :maxlength="20" size="large" @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="vcode">
          <Input type="text" v-model.trim="user.vcode" placeholder="验证码..." class="vcode" :maxlength="4" size="large" @on-focus="randomVerify" @on-enter="handleSubmit">
          <div slot="append" style="overflow:hidden;width:80px;height:42px;" @click="randomVerify">
            <span @click="randomVerify" ref="randomVerifyImg" style="display: inline-block;width: 100%;height: 100%;">
              <i v-for="(item, index) in verifyArr" :key="index" style="color: white">{{item}}</i>
            </span>
          </div>

          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">登录</span>
            <span v-if="loading">登录中..</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import http from "~/api/http";
import to from "~/api/await-to";
import { mapState, mapActions } from "vuex";
import verifyMixins from '~/components/auth/verifyMixins'
export default {
  name: "user_login",
  mixins: [verifyMixins],
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
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            type: "string",
            min: 4,
            message: "用户名必须是四位以上",
            trigger: "blur"
          },
          {
            type: "string",
            max: 20,
            message: "用户名最多只能20位",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "用户名不能包含特殊字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码必须是六位以上",
            trigger: "blur"
          },
          {
            type: "string",
            max: 20,
            message: "密码最多只能20位",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "密码不能包含特殊字符",
            trigger: "change"
          }
        ],
        vcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    async handleSubmit() {
      let _valid = false;
      this.$refs["user"].validate(valid => {
        _valid = valid;
      });
      if (!_valid) return false;
      if(this.user.vcode != this.verifyArr.join('')) {
        this.$Message.warning("验证码错误！")
        return false
      }
      this.loading = true;
      let [err, _user] = await to(
        this.$store.dispatch("userinfo/login", this.user)
      );
      if (err) {
        this.randomVerify();
        this.loading = false;
        this.showSpin = false;
      }else if (_user) {
        this.$Message.success("您已成功登录");
        window.location.href = "/#logined";
        this.getOnlineSysMes();
      }
      this.loading = false;
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
      } else {
        let _this = this;
        setTimeout(() => {
          _this.$router.push("/");
        }, 1000);
      }
    });
  }
};
</script>

<style scoped>
.vscode-locked-outline {
  height: 42px;
  margin-left: -10px;
}
.ivu-btn {
  width: 100%;
}
.wrap {
  border: 1px solid #dddee1;
}
.wrap .title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
}
</style>
<style>
.content .ivu-input-wrapper .ivu-input {
  border-radius: 2px !important;
  height: 44px !important;
  line-height: 44px !important;
}
.content .ivu-input-group-with-append .ivu-input,
.content .ivu-input-group-with-append.ivu-input-group-small .ivu-input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>

