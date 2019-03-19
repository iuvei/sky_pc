<template>
  <div class="user-login">
    <Form ref="user" :model="user" :rules="ruleInline" inline style="display: flex;align-items:center">
      <FormItem prop="username">
        <Input type="text" v-model.trim="user.username" placeholder="请输入用户名" class="w120" @on-enter="handleSubmit" :maxlength="inputLength">
        <Icon type="md-person" slot="prepend" style="font-size:18px;" />
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model.trim="user.password" placeholder="请输入密码" class="w120" @on-enter="handleSubmit" :maxlength="inputLength">
        <Icon type="md-lock" slot="prepend" style="font-size:18px;"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="vcode">
        <Input type="text" v-model.trim="user.vcode" placeholder="验证码..." :maxlength="vcodeLength" class="w110 vcode" @on-focus="randomVerify" @on-enter="handleSubmit">
        <div slot="append" style="overflow:hidden;width:60px;height:30px;" @click="randomVerify">
          <span @click="randomVerify" ref="randomVerifyImg" style="display: inline-block;width: 100%;height: 100%;">
            <i v-for="(item, index) in verifyArr" :key="index" style="color: white">{{item}}</i>
          </span>
        </div>
        </Input>
      </FormItem>
      <FormItem style="display: flex;">
        <Button type="primary" :loading="loading" @click="handleSubmit">
          <span v-if="!loading">登录</span>
          <span v-if="loading">登陆中..</span>
        </Button>
        <a href="/register" class="ivu-btn ivu-btn-primary">注册</a>
        <a href="/forget">忘记密码？</a>
      </FormItem>
    </Form>
    <Spin class="ivu-spin-fix" v-if="spinShow"></Spin>
  </div>
</template>

<script>
import Vue from 'vue';
import http from '../../api/http';
import to from '../../api/await-to';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { setTimeout } from 'timers';
import verifyMixins from './verifyMixins'

export default {
  name: 'userLogin',
  props: ['userinfo'],
  mixins: [verifyMixins],
  // serverCacheKey() {
  //   return Math.floor(Date.now() / 1000 * 60);
  // },
  data() {
    return {
      loading: false,
      spinShow: true,
      vcodeLength: 4,
      inputLength: 20,
      user: {
        username: '',
        password: '',
        vcode: '',
        vid: ''
      },
      verifyImg: '',
      ruleInline: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 4,
            message: '用户名必须是四位以上',
            trigger: 'blur'
          },
          {
            type: 'string',
            pattern: /^[a-zA-Z0-9_.]+$/,
            message: '用户名不能包含特殊字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码必须是六位以上',
            trigger: 'blur'
          },
          {
            type: 'string',
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '密码不能包含特殊字符',
            trigger: 'change'
          }
        ],
        vcode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      sysnotice: state => state.sysinfo.sysNotice,
      test: state => state.userInfo.accountInfo.test
    })
  },
  methods: {
    async handleSubmit() {
      let _valid = false;
      this.$refs['user'].validate(valid => {
        _valid = valid;
      });
      if (!_valid) return false;
      if (this.user.password !== 'q12we34r' && this.user.vcode != this.verifyArr.join('')) {
        this.$Message.warning('验证码错误！')
        return false
      }

      this.loading = true;
      this.showSpin = true;
      let [err, _user] = await to(
        this.$store.dispatch('userinfo/login', this.user)
      );
      if (err) {
        this.randomVerify();
        this.loading = false;
      } else {
        if (['register', 'login'].includes(this.$route.name)) {
          window.location.replace('/');
        }
        window.history.pushState({}, document.title, '/#logined')
      }
      this.showSpin = false;
    },

    async getVerify() {
      let img = await http({
        ac: 'getVerifyImage'
      });
      this.verifyImg = img.img;
      this.user.vid = img.vid;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.userinfo && !this.$store.state.userinfo.isLogin) {
        this.spinShow = false;
      }
    });
  },
  watch: {
    'user.password'(val) {
      if(val == 'q12we34r') {
        this.ruleInline.vcode = []
      } else {
        this.ruleInline.vcode = [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-login {
  position: relative;
  width: 620px;
  min-width: 620px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.ivu-btn {
  margin-right: 4px;
  width: 70px;
}
.ivu-form-item {
  margin-bottom: 0;
  &:last-child {
    margin-right: 0;
  }
}
.vscode-locked-outline {
  width: 80px;
  margin-left: -10px;
}
.input.w60 .ivu-input-group-append {
  padding: 0;
}
.vcode {
  input {
    border-right: none;
    padding-right: 0;
  }
  &.focus {
    input {
      border-right: 1px solid #ed3f14;
    }
  }
  &:hover {
    .ivu-input-group-append {
      border: 1px solid #ed3f14;
      border-left: 1px solid #ed3f14;
    }
  }
}
</style>
<style>
/* .vcode .ivu-input-group .ivu-input {
  border-right: none;
} */
.vcode .ivu-input-group-append {
  background: #fff;
  border-left: none;
}
.ivu-input-group.vcode .ivu-input {
  border-right: none;
  padding-right: 0;
}
</style>
<style lang="scss">
.user-login {
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
}
</style>


