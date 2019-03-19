<template>
  <div class="wrap">
    <div class="title">
      已有账号？
      <a href="/login">立即登录</a>
    </div>
    <div class="content">
      <Form ref="regForm"
            :model="user"
            :rules="ruleInline">
        <FormItem prop="tg_code"
                  v-if="!bind_param || !bind_param.length">
          <Input type="text"
                 v-model.trim="user.tg_code"
                 placeholder="邀请码"
                 size="large"
                 :maxlength="20"
                 @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="username">
          <Input type="text"
                 v-model.trim="user.username"
                 placeholder="用户名"
                 size="large"
                 :maxlength="20"
                 @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password"
                 v-model.trim="user.password"
                 placeholder="登录密码"
                 size="large"
                 :maxlength="20"
                 @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="password2">
          <Input type="password"
                 v-model.trim="user.password2"
                 placeholder="重复密码"
                 size="large"
                 :maxlength="20"
                 @on-enter="handleSubmit">
          </Input>
        </FormItem>
        <FormItem prop="vcode">
          <Input type="text"
                 v-model.trim="user.vcode"
                 placeholder="验证码"
                 class="vcode"
                 size="large"
                 :maxlength="4"
                 @on-focus="randomVerify"
                 @on-enter="handleSubmit">
          <div slot="append"
               style="overflow:hidden;width:80px;height:42px;">
            <span @click="randomVerify"
                  ref="randomVerifyImg"
                  style="display: inline-block;width: 100%;height: 100%;line-height:42px;">
              <i v-for="(item, index) in verifyArr"
                 :key="index"
                 style="color: white">{{item}}</i>
            </span>
          </div>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  :loading="loading"
                  @click="handleSubmit"
                  size="large">
            <span v-if="!loading">注册</span>
            <span v-if="loading">正在提交..</span>
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
import { mapState, mapActions, mapGetters } from "vuex";
import verifyMixins from "../components/auth/verifyMixins.js";
// import cache from "memory-cache";

export default {
  name: "user_regist",
  mixins: [verifyMixins],
  data() {
    return {
      tgcode: "",
      loading: false,
      bind_param: "",
      user: {
        tg_code: "",
        username: "",
        password: "",
        password2: "",
        vcode: "",
        vid: ""
      },
      verifyImg: "",
      ruleInline: {
        tg_code: [
          {
            required: true,
            message: "请输入邀请码",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            type: "string",
            min: 5,
            message: "用户名必须是五位以上",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z1-9][a-zA-Z0-9]$/,
            message: "请输入正确的用户账号!",
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
            min: 5,
            message: "密码必须是五位以上",
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
            pattern: /^[a-zA-Z0-9]+$/,
            message: "密码不能包含特殊字符",
            trigger: "blur"
          }
        ],
        password2: [
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
            trigger: "blur"
          },
          { validator: this.validatePass2, trigger: "blur" }
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
    ...mapActions({
      register: "userinfo/register"
    }),
    validatePass2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    async handleSubmit() {
      if (this.bind_param && this.bind_param.length) {
        this.user.tg_code = this.bind_param;
      }
      let _valid = false;
      this.$refs["regForm"].validate(valid => {
        _valid = valid;
      });
      if (!_valid) return false;
      if (this.user.vcode != this.verifyArr.join("")) {
        this.$Message.warning("验证码错误！");
        this.randomVerify();
        return false;
      }
      this.loading = true;

      let [err, result] = await to(this.register(this.user));
      if (result) {
        this.$router.push("/");
      } else {
        this.randomVerify();
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
  async created() {
    if (process.browser) {
      const _code = this.$route.query.inviteCode
      // if(!localStorage.getItem("tgcode") && _code){
      //   localStorage.setItem("tgcode", _code)
      // }
      const code =
        _code ||
        localStorage.getItem("tgcode") ||
        this.tgcode;
      if (code && code.length) {
        this.user.tg_code = code;
      }
      let [err, result] = await to(
        this.$store.dispatch("sysinfo/getSysinfo", window.location.host)
      );
      if (result) {
        this.bind_param = result.bind_param;
      }
    }
  },
  computed: {
    sysinfo() {
      return this.$store.getters["sysinfo/sysInfo"];
    }
  }
};
</script>

<style scoped>
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
.ivu-input-group-append img {
  height: 42px;
  margin-left: -10px;
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

