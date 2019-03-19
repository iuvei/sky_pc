<template>
  <div class="wrap">
    <div class="title">
      没有账号？
      <a href="register">立即注册</a>
    </div>
    <div class="content">
      <Form ref="user" :model="user" :rules="ruleInline" v-show="findstep=='first'">
        <FormItem prop="username">

          <Input type="text" v-model.trim="user.username" placeholder="用户名" size="large" :maxlength="20">
          </Input>
        </FormItem>
        <FormItem prop="vcode">
          <Input type="text" v-model.trim="user.vcode" placeholder="验证码" class="vcode" size="large" :maxlength="4" @on-focus="randomVerify">
          <div slot="append" style="overflow:hidden;width:80px;height:34px;">
            <span @click="randomVerify" ref="randomVerifyImg" style="display: inline-block;width: 100%;height: 100%;line-height:34px;">
              <i v-for="(item, index) in verifyArr" :key="index" style="color: white">{{item}}</i>
            </span>
          </div>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">下一步</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
    </div>
    <div class="content" style="width:100%; padding-left: 50px;" v-show="findstep=='second'">
      <div id="find_type_1" class="lines_field" data-type="1" @click="findType('question')">
        <div class="field_icon">
          <div class="_icon icon_question"></div>
        </div>
        <div class="field_title">
          通过密保找回
        </div>
      </div>
      <div id="find_type_2" class="lines_field" data-type="2" @click="findType('email')">
        <div class="field_icon">
          <div class="_icon icon_email"></div>
        </div>
        <div class="field_title">
          通过邮箱找回
        </div>
      </div>
      <div id="find_type_3" class="lines_field" data-type="3" @click="findType('phone')">
        <div class="field_icon">
          <div class="_icon icon_phone"></div>
        </div>
        <div class="field_title">
          通过手机号码找回
        </div>
      </div>

      <div id="find_type_4" class="lines_field" data-type="4" @click="findType('tkpass')">
        <div class="field_icon">
          <div class="_icon icon_tkpass"></div>
        </div>
        <div class="field_title">
          通过交易密码找回
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="content" v-show="findstep=='third'">
      <!-- 密保问题找回 -->
      <Form class="question" :label-width="120" :model="question" v-show="findpasstype=='question'" :show-message="true" ref="question" :rules="ruleInline">
        <FormItem label="密保问题1:" prop="">
          <Select v-model="question.questone">
            <Option v-for="(item,index) in questionArr" :value="index" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="密保答案1:" prop="answerone">
          <Input placeholder="请输入答案..." v-model="question.answerone"></Input>
        </FormItem>
        <FormItem label="密保问题2:" prop="">
          <Select v-model.trim="question.questtwo">
            <Option :value="index" v-for="(item,index) in questionArr" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="密保答案2:" prop="answertwo">
          <Input placeholder="请输入答案..." v-model.trim="question.answertwo"></Input>
        </FormItem>
        <FormItem label="密保问题3:" prop="">
          <Select v-model="question.questthree">
            <Option :value="index" v-for="(item,index) in questionArr" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="密保答案3:" prop="answerthree">
          <Input placeholder="请输入答案..." v-model="question.answerthree"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">下一步</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
      <!-- 密保邮箱 -->
      <Form :label-width="120" v-show="findpasstype == 'email'" :show-message="true" :model="email" ref="email" :rules="ruleInline">
        <FormItem label="密保邮箱:" prop="email">
          <Input v-model.trim="email.email" placeholder="请输入密保邮箱..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">下一步</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
      <!-- 密保手机 -->
      <Form :label-width="120" v-show="findpasstype == 'phone'" ref="phone" :rules="ruleInline" :model="phone" :show-message="true">
        <FormItem label="绑定手机:" prop="phone">
          <Input v-model="phone.phone" placeholder="请输入密保手机号..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">下一步</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
      <!-- 交易密码 -->
      <Form :label-width="120" v-show="findpasstype=='tkpass'" ref="tkpass" :rules="ruleInline" :model="tkpass" :show-message="true">
        <FormItem label="提款密码:" prop="tkpass">
          <Input v-model.trim="tkpass.tkpass" placeholder="请输入提款..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">下一步</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
    </div>
    <!-- 设置新密码 -->
    <div class="content" v-show="findstep == 'fourth'">
      <Form :label-width="120" ref="password" :model="password" :rules="ruleInline" v-show="findstep == 'fourth'" :show-message="true">
        <FormItem label="新密码:" prop="newpass">
          <Input v-model="password.newpass" placeholder="请输入新密码..."></Input>
        </FormItem>
        <FormItem label="确认密码:" prop="confirmpass">
          <Input v-model="password.confirmpass" placeholder="请确认密码..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" @click="handleSubmit" size="large">
            <span v-if="!loading">确认修改</span>
            <span v-if="loading">正在提交..</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import http from '~/api/http';
import { mapState, mapActions } from 'vuex';
import { setTimeout } from 'timers';
import verifyMixins from '../components/auth/verifyMixins.js'

export default {
  name: 'user_regist',
  mixins: [verifyMixins],
  data() {
    return {
      loading: false,
      isShow:true,
      findpasstype:'',
      findstep:'first',
      user: {
        username: '',
        vcode: '',
        vid: '',
        accessCode:'',
      },
      wayType: '',
      verifyImg: '',
      phone: {
        phone:''
      },
      tkpass: {
        tkpass:''
      },
      email: {
        email:''
      },
      password: {
        newpass:'',
        confirmpass:''
      },
      question:{
        questone:1,
        questtwo:2,
        questthree:3,
        answerone:'',
        answertwo:'',
        answerthree:''
      },
      wayTypeArr: [
        {
          present: false,
          text: '通过密保问题'
        },
        {
          present: false,
          text: '通过密保邮箱'
        },
        {
          present: false,
          text: '通过手机号码'
        },
        {
          present: false,
          text: '通过交易密码'
        }
      ],
      questionArr: [
        '请选择密保问题',
        '您母亲的姓名是？',
        '您父亲的姓名是？',
        '您配偶的姓名是？',
        '您的出生地是？',
        '您高中班主任的名字是？',
        '您初中班主任的名字是？',
        '您小学班主任的名字是？',
        '您的小学校名是？',
        '您的学号（或工号）是？',
        '您父亲的生日是？',
        '您母亲的生日是',
        '您配偶的生日是？'
      ],
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
            pattern: /^[a-zA-Z0-9@$_]+$/,
            message: '用户名不能包含特殊字符',
            trigger: 'blur'
          }
        ],
        vcode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        question: [
          {
            required: true,
            message: '问题不能为空',
            trigger: 'blur'
          }
        ],
        answerone:[
          {
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }
        ],
        answertwo:[
          {
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }
        ],
        answerthree:[
          {
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }
        ],

        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确格式的邮箱',
            trigger: 'blur'
          }
        ],
        phone:[
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        tkpass:[
          {required: true,  message: '请输入密码',trigger: 'blur'},
          {min: 4,  message: '密码最少4位数',trigger: 'blur'}
          // {pattern:/^[a-zA-Z0-9@$_]+$/, message: "密码只能由数字和字母组成",blur: "blur"}
        ],
        newpass:[
          {required: true,  message: '请输入密码',trigger: 'blur'},
          {min: 4,  message: '密码最少4位数',trigger: 'blur'}
        ],
        confirmpass:[
          {required: true,  message: '请z输入密码',trigger: 'blur'},
          {min: 4,  message: '密码最少4位数',trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'userinfo/register'
    }),
    findType(type){
      this.findstep = 'third';
      this.findpasstype = type;
    },

    async handleSubmit() {
      let _valid = false;
      // console.log(this.findpasstype);
      //找回密码第一步：验证用户名
      if(this.findstep=='first'){
        this.$refs['user'].validate(valid => {
          _valid = valid;
        });
        if (!_valid) return false;
        if(this.user.vcode != this.verifyArr.join('')) {
        this.$Message.warning('验证码错误！')
        this.randomVerify()
        return false
      }
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        if (!this.wayType) {
          let res = await http({
            ac: 'FPgetAccountScrectList',
            vcode: 6666,
            username: this.user.username,
            vid: 'b97ec930-7c7c-11e8-acae-0242ac190002'
          });

          if (Array.isArray(res) && !res.length) {
            this.$Message.warning('你的账号未绑定任何安全设置,无法进行密码找回!');
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          } else {
            this.loading = false;
            this.findstep = 'second';
            // this.btnIsShow = false;
            // this.stepTwoIsShow = false;
            // if (res.indexOf("1") != -1) this.wayTypeArr[0].present = true;
          }
        } else {
          // this.getVerify(this.randomNum());
          // if (this.newPW1 != this.newPW2) {
          //   this.$dialog.alert({ mes: "两次密码不一致" });
          // } else {
          //   this.$ajax("PhoneApi", {
          //     ac: "FPchangePassword",
          //     accessCode: this.passToken,
          //     username: this.input1,
          //     pass: this.newPW1,
          //     vcode: this.input3,
          //     client: 1
          //   }).then(res => {
          //     this.isShow = true;
          //     this.btnIsShow = false;
          //     this.stepTwoIsShow = false;
          //     this.stepThreeIsShow = false;
          //     this.questionVerify = false;
          //     this.$router.push("/login");
          //     this.$dialog.alert({ mes: "修改成功，请使用新密码登录" });
          //   });
          // }
        }
      }
      // 修改密码
      if(this.findstep == 'fourth'){
        if(this.password.newpass == this.password.confirmpass){
          this.$refs['question'].validate(valid => {
            _valid = valid;
          })
          if(!_valid){
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 2000);
            return false;
          }
        }
        if(this.password.newpass !== this.password.confirmpass){
          this.$Message.warning('两次输入的密码不一致！');
          return ;
        }
        if(!this.wayType){
          let res = await http({
            ac : 'FPchangePassword',
            username : this.user.username,
            pass: this.password.newpass,
            client: 0,
            accessCode: this.user.accesscode,
            client_type : 0
          });
          if(res == 0){
            this.$Message.warning('您的密保问题验证失败!');
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          }else{
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 2000);
            this.$Message.warning('密码修改成功');
            this.$router.push('/login');
          }
        }
      }
      //找回密码第二步：选择找回密码方式
      // 密保问题找回
      if(this.findstep == 'third'&& this.findpasstype =='question'){
        this.$refs['question'].validate(valid => {
          _valid = valid;
        });
        if (!_valid){
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          return false;
        }
        if(this.question.questone!==0&&this.question.questtwo!==0&&this.question.questthree!==0){
          let res = await http({
            ac : 'FPcheckQuestion',
            question_1 : this.question.questone,
            question_2 : this.question.questtwo,
            question_3 : this.question.questthree,
            answer_1 : this.question.answerone,
            answer_2 : this.question.answertwo,
            answer_3 : this.question.answerthree,
            username : this.user.username,
            client_type : 0
          });
          // console.log(res);
          this.user.accesscode = res.accessCode;
          if(res==''){
            this.$Message.warning('您的密保问题验证失败!');
            setTimeout(() => {
              this.loading = false;
            }, 2000);
            this.findstep = 'third';
            this.findpasstype = 'question'
          }else{
            this.$Message.success('密保问题校验成功，请设置新的密保问题');
            this.findstep = 'fourth';
          }
        }
      }
      // 邮箱找回
      if(this.findstep == 'third' && this.findpasstype == 'email'){
        this.$Message.warning('该功能暂未开放！');
        //  this.$refs["email"].validate(valid => {
        //   _valid = valid;
        // });
        // if (!_valid){
        //   this.loading = true;
        //   setTimeout(() => {
        //     this.loading = false;
        //   }, 2000);
        //   return false;
        // }
        // if(!this.wayType){
        //     let res = await http({
        //     ac: "FPcheckEmail",
        //     email : this.email.email,
        //     username : this.user.username,
        //     client_type: 0
        //   });
        //   this.loading = true;
        //   if(!res.length){
        //     this.$Message.warning("您的密保问题验证失败!");
        //     setTimeout(() => {
        //       this.loading = false;
        //     }, 2000);
        //     this.findstep = 'third';
        //     this.findpasstype = 'email'
        //   }else{
        //     this.findstep = 'fourth';
        //   }
        // }
      }
      //手机号码
      if(this.findstep == 'third' && this.findpasstype == 'phone'){
        this.$Message.warning('该功能暂未开放！');
        // this.$refs["phone"].validate(valid => {
        //   _valid = valid;
        // });
        // if (!_valid){
        //   alert(_valid);
        //   this.loading = true;
        //   setTimeout(() => {
        //     this.loading = false;
        //   }, 2000);
        //   return false;
        // }
        // if(!this.wayType){
        //     let res = await http({
        //     ac : "FPcheckPhone",
        //     username : this.user.username,
        //     phone : this.phone.phone,
        //     client_type : 0
        //   });
        //   this.loading = true;
        //   if(!res.length){
        //     this.$Message.warning("您的密保问题验证失败!");
        //     setTimeout(() => {
        //         this.loading = false;
        //       }, 2000);
        //       this.findstep = 'third';
        //       this.findpasstype = 'phone'
        //   }else{
        //     this.findstep = 'fourth';
        //   }
        // }
      }
      //交易密码
      if(this.findstep == 'third'&& this.findpasstype == 'tkpass'){
        this.$Message.warning('该功能暂未开放！');
        // this.$refs["tkpass"].validate(valid => {
        //   _valid = valid;
        // });
        // if (!_valid){
        //   this.loading = true;
        //   setTimeout(() => {
        //     this.loading = false;
        //   }, 2000);
        //   return false;
        // }
        // if(!this.wayType){
        //     let res = await http({
        //     ac : "FPcheckTkPass",
        //     username : this.user.username,
        //     tk_pass : this.tkpass.tkpass,
        //     client_type : 0
        //   });
        //   if(!res.length){
        //     this.$Message.warning("您的密保问题验证失败!");
        //     setTimeout(() => {
        //         this.loading = false;
        //       }, 2000);
        //       this.findstep = 'third';
        //       this.findpasstype = 'tkpass'
        //   }else{
        //     this.verifyImg();
        //     this.findstep = 'fourth';
        //   }
        // }
      }
      // console.log(this.findstep);
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
      this.getVerify();
    });
  },
  computed: {
    ...mapState(['sysinfo'])
  }
};
</script>

<style lang="scss" scoped>
.wrap {
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
  .ivu-input-group-append {
    background: gray;
  }
  .ivu-input-group-append {
    padding: 0;
    img {
      height: 36px;
      float: right;
    }
  }
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
  .lines_field {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    border: 1px Solid #dddddd;
    float: left;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
    background: #ffffff;
  }
  .lines_field .field_icon {
    height: 140px;
    width: 100%;
    text-align: center;
  }
  .lines_field .field_title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #666666;
  }
  .lines_field .field_icon ._icon.icon_question {
    width: 64px;
    height: 64px;
    display: inline-block;
    background: url(~/assets/img/user_center_icons.png) -315px -64px no-repeat;
    margin-top: 38px;
  }
  .lines_field .field_icon ._icon.icon_email {
    width: 64px;
    height: 64px;
    display: inline-block;
    background: url(~/assets/img/user_center_icons.png) -315px -128px no-repeat;
    margin-top: 38px;
  }
  .lines_field .field_icon ._icon.icon_phone {
    width: 64px;
    height: 64px;
    display: inline-block;
    background: url(~/assets/img/user_center_icons.png) -251px -128px no-repeat;
    margin-top: 38px;
  }
  .lines_field .field_icon ._icon.icon_tkpass {
    width: 64px;
    height: 64px;
    display: inline-block;
    background: url(~/assets/img/user_center_icons.png) -251px -64px no-repeat;
    margin-top: 38px;
  }
  .field_title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
  }
  .vscode-locked-outline {
    display: inline-block;
    width: 80px;
    height: 40px;
  }
}
</style>

