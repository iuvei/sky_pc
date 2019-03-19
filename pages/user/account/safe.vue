<template>
  <div class="safe_body">
    <div class="safe_level">
      <div class="line_1">
        账户安全级别:
        <span id="level_tip" :style="safe_num===1?'color:red':safe_num===2?'color:rgb(234,77,27)':safe_num===3?'color:rgb(242,165,18)':safe_num===4?'color:rgb(99,152,40)':'color:rgb(45,161,55)'">{{safe_num===1?'极度危险':safe_num===2?'较危险':safe_num===3?'正常':safe_num===4?'安全':'牢不可破'}}</span>
      </div>
      <Progress :percent="safe_num*20" hide-info :class="safe_num===1?'safe_1':safe_num===2?'safe_2':safe_num===3?'safe_3':safe_num===4?'safe_4':'safe_5'"></Progress>
      <div class="line_2">{{'上次登录: ' + sendTime(this.userinfo.last_login) + ' | 不是我登录?'}}
        <a class="btn_editpass" @click="open_login">修改密码</a>
      </div>
    </div>
    <div class="box_container" id="dialog_userinfo">
      <div class="title">提高账户安全
        <a style="color:#00A0E9;">↑</a>
      </div>
      <div class="content">
        <div class="item no_select">
          <div class="_icon login_pass"></div>
          <div class="_content">
            <div class="_title">登录密码</div>
            <div class="_info">建议您使用字母和数字的组合。</div>
          </div>
          <div class="_tools">
            <a id="btn_update_loginpass" @click="open_login">[修改登录密码]</a>
          </div>
        </div>
        <div class="item no_select" :class="is_tk?'':'disable'">
          <div class="_icon tk_pass"></div>
          <div class="_content">
            <div class="_title">{{is_tk?'安全密码':'未设置安全密码'}}</div>
            <div class="_info">安全密码用于提现，绑定银行卡等操作，可保障资金安全。</div>
          </div>
          <div class="_tools">
            <a id="btn_set_tkpass" @click="open_tk">{{is_tk?'[修改安全密码]':'[设置安全密码]'}}</a>
          </div>
        </div>
        <div class="item no_select" :class="is_name?'':'disable'">
          <div class="_icon real_name"></div>
          <div class="_content">
            <div class="_title">{{is_name?'真实姓名':'未设置真实姓名'}}</div>
            <div class="_info">真实姓名用于提现、绑定银行卡等操作，可保障资金安全。</div>
          </div>
          <div class="_tools">
            <a id="btn_set_tkpass" @click="open_name">{{is_name?'[修改真实姓名]':'[设置真实姓名]'}}</a>
          </div>
        </div>
        <div class="item no_select" :class="is_phone?'':'disable'">
          <div class="_icon phone"></div>
          <div class="_content">
            <div class="_title">{{is_phone?'密保手机':'未绑定密保手机'}}</div>
            <div class="_info">密保手机可以增加账户的安全性，快速找回密码。</div>
          </div>
          <div class="_tools">
            <a id="btn_set_phone" @click="open_phone">{{is_phone?'[修改密保手机]':'[设置密保手机]'}}</a>
          </div>
        </div>
        <div class="item no_select" :class="is_email?'':'disable'">
          <div class="_icon email"></div>
          <div class="_content">
            <div class="_title">{{is_email?'密保邮箱':'未绑定密保邮箱'}}</div>
            <div class="_info">密保邮箱可以增加账户的安全性，快速找回密码。</div>
          </div>
          <div class="_tools">
            <a id="btn_set_email" @click="open_email">{{is_email?'[修改密保邮箱]':'[设置密保邮箱]'}}</a>
          </div>
        </div>
        <div class="item no_select" :class="is_question?'':'disable'">
          <div class="_icon question"></div>
          <div class="_content">
            <div class="_title">{{is_question?'密保问题':'未设置密保问题'}}</div>
            <div class="_info">密保问题可以增加账户的安全性，快速找回密码。</div>
          </div>
          <div class="_tools" v-if="!is_question">
            <a @click="open_question">[设置密保问题]</a>
          </div>
          <div class="_tools" v-else>
            <a @click="open_verifyQuestion">[修改密保问题]</a>
          </div>
        </div>
      </div>
      <!-- 修改登录密码 -->
      <div class="loginpass" v-show="loginBox">
        <div class="head">修改登录密码
          <span class="close" @click="close_login">×</span>
        </div>
        <div class="modify">
          <div class="box">
            <span class="tit">旧密码</span>
            <Input type="password" v-model="old_login_pass" placeholder="请输入旧密码" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">新密码</span>
            <Input type="password" v-model="new_login_pass1" placeholder="请输入新密码" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">确认密码</span>
            <Input type="password" v-model="new_login_pass2" placeholder="请再次输入新密码" clearable style="width: 200px"></Input>
          </div>
        </div>
        <div class="enter" @click="setLoginPass">确定</div>
      </div>
      <!-- 修改交易密码 -->
      <div class="loginpass" v-show="tkBox">
        <div class="head">{{is_tk?'修改安全密码':'绑定安全密码'}}
          <span class="close" @click="close_tk">×</span>
        </div>
        <div class="modify">
          <div class="box" v-show="is_tk">
            <span class="tit">原密码</span>
            <password-input v-model="old_tk_pass" ref="old"></password-input>
          </div>
          <div class="box">
            <span class="tit">{{is_tk?'新密码':'密码'}}</span>
            <password-input v-model="new_tk_pass1" ref="new1"></password-input>
          </div>
          <div class="box">
            <span class="tit">确认密码</span>
            <password-input v-model="new_tk_pass2" ref="new2"></password-input>
          </div>
        </div>
        <div class="enter" @click="correctPW">确定</div>
      </div>
      <!-- 修改真实姓名 -->
      <div class="loginpass" v-show="nameBox">
        <div class="head">{{is_name?'修改真实姓名':'绑定真实姓名'}}
          <span class="close" @click="close_name">×</span>
        </div>
        <div class="modify">
          <div class="box" v-show="is_name">
            <span class="tit">旧姓名</span>
            <Input v-model="old_name" :placeholder="oldName" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">{{is_name?'新姓名':'姓名'}}</span>
            <Input v-model="new_name1" :placeholder="is_name?'请输入新的姓名':'请输入姓名'" clearable style="width: 200px"></Input>
          </div>
          <p style="text-align:center;color:#666;padding:5px 0">请填写真实的姓名与便于提款验证</p>
        </div>
        <div class="enter" @click="updateInfo(1)">确定</div>
      </div>
      <!-- 修改手机 -->
      <div class="loginpass" v-show="phoneBox">
        <div class="head">{{is_phone?'修改密保手机':'绑定密保手机'}}
          <span class="close" @click="close_phone">×</span>
        </div>
        <div class="modify">
          <div class="box" v-show="is_phone">
            <span class="tit">原手机号</span>
            <Input v-model="old_phone" :placeholder="oldPhone" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">{{is_phone?'新手机号':'手机号'}}</span>
            <Input v-model="new_phone1" :placeholder="is_phone?'请输入新的手机号码':'请输入手机号码'" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">验证码</span>
            <Input type="text" v-model="vcode" placeholder="验证码..." :maxlength="vcodeLength" clearable class="w110 vcode" @on-focus="randomVerify1" style="display: inline-block">
            <div slot="append" style="overflow:hidden;width:60px;height:30px;" @click="randomVerify1">
              <span @click="randomVerify1" ref="randomVerifyImg1" style="display: inline-block;width: 100%;height: 100%;">
                <i v-for="(item, index) in verifyArr" :key="index" style="color: white">{{item}}</i>
              </span>
            </div>
            </Input>
          </div>
        </div>
        <div class="enter" @click="updateInfo(3)">确定</div>
      </div>
      <!-- 修改邮箱 -->
      <div class="loginpass" v-show="emailBox">
        <div class="head">{{is_email?'修改密保邮箱':'绑定密保邮箱'}}
          <span class="close" @click="close_email">×</span>
        </div>
        <div class="modify">
          <div class="box" v-show="is_email">
            <span class="tit">旧邮箱</span>
            <Input v-model="old_email" :placeholder="oldEmail" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">{{is_email?'新邮箱':'邮箱'}}</span>
            <Input v-model="new_email1" :placeholder="is_email?'请输入新邮箱':'请输入邮箱'" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">验证码</span>
            <Input type="text" v-model="vcode" placeholder="验证码..." :maxlength="vcodeLength" clearable class="w110 vcode" @on-focus="randomVerify" style="display: inline-block">
            <div slot="append" style="overflow:hidden;width:60px;height:30px;" @click="randomVerify">
              <span @click="randomVerify" ref="randomVerifyImg" style="display: inline-block;width: 100%;height: 100%;">
                <i v-for="(item, index) in verifyArr" :key="index" style="color: white">{{item}}</i>
              </span>
            </div>
            </Input>
          </div>
        </div>
        <div class="enter" @click="updateInfo(2)">确定</div>
      </div>
      <!-- 设置密保问题 -->
      <div class="loginpass" v-show="questionBox">
        <div class="head">{{is_question?'修改密保问题':'设置密保问题'}}
          <span class="close" @click="close_question">×</span>
        </div>
        <div class="modify">
          <div class="box">
            <span class="tit">问题一</span>
            <Select v-model="question1" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="answer1" placeholder="" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">问题二</span>
            <Select v-model="question2" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="answer2" placeholder="" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">问题三</span>
            <Select v-model="question3" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="answer3" placeholder="" clearable style="width: 200px"></Input>
          </div>
        </div>
        <div class="enter" v-if="!is_question" @click="setQuestion">确定</div>
        <div class="enter" v-else @click="setNewQuestion">确定</div>
      </div>
      <!-- 校验密保问题 -->
      <div class="loginpass" v-show="verifyQuestion">
        <div class="head">验证密保问题
          <span class="close" @click="close_verifyQuestion">×</span>
        </div>
        <div class="modify">
          <div class="box">
            <span class="tit">问题一</span>
            <Select v-model="verifyQuestion1" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="verifyAnswer1" placeholder="" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">问题二</span>
            <Select v-model="verifyQuestion2" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="verifyAnswer2" placeholder="" clearable style="width: 200px"></Input>
          </div>
          <div class="box">
            <span class="tit">问题三</span>
            <Select v-model="verifyQuestion3" style="width:180px;height:28px">
              <Option v-for="(item,key) in questionArr" :value="key" :key="key">{{ item }}</Option>
            </Select>
          </div>
          <div class="box">
            <span class="tit">答案</span>
            <Input v-model="verifyAnswer3" placeholder="" clearable style="width: 200px"></Input>
          </div>
        </div>
        <div class="enter" @click="verificationQuestion">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import passwordInput from '~/components/user/passwordInput';
import http from '~/api/http';
import verifyMixins from '~/components/auth/verifyMixins'
export default {
  name: 'userSafe',
  mixins: [verifyMixins],
  computed: {
    ...mapState({
      userinfo: state => state.userinfo.accountInfo,
      userLogin: state => state.userinfo.isLogin
    }),
    is_tk() {
      return this.userinfo.tkpass_ok;
    },
    is_name() {
      return !!this.userinfo.real_name;
    },
    is_phone() {
      return !!this.userinfo.phone;
    },
    is_email() {
      return !!this.userinfo.email;
    },
    is_question() {
      return this.userinfo.question_1 !== '0';
    },
    safe_num() {
      let num = 1;
      if (this.is_tk) num++;
      if (this.is_phone) num++;
      if (this.is_email) num++;
      if (this.is_question) num++;
      return num;
    },
    verifyQuestion1:{
      get:function(){
        return this.userinfo.question_1 * 1 || 0;
      },
      set:function(){
      }
    },
    verifyQuestion2:{
      get:function(){
        return this.userinfo.question_2 * 1 || 0;
      },
      set:function(){
      }
    },
    verifyQuestion3:{
      get:function(){
        return this.userinfo.question_3 * 1 || 0;
      },
      set:function(){
      }
    },
    oldName() {
      return this.userinfo.real_name;
    },
    oldPhone() {
      return this.userinfo.phone;
    },
    oldEmail() {
      return this.userinfo.email;
    },
  },
  components: {
    passwordInput,
  },
  data() {
    return {
      progress: 0,
      loginBox: false, //修改登录密码框
      nameBox: false,
      tkBox: false, //修改安全密码框
      phoneBox: false, //修改手机号码框
      emailBox: false, //修改邮箱框
      questionBox: false, //修改密保问题框
      verifyQuestion: false, //验证密保问题框
      vcodeLength: 4,
      old_login_pass: '',
      new_login_pass1: '',
      new_login_pass2: '',
      old_tk_pass: '',
      new_tk_pass1: '',
      new_tk_pass2: '',
      old_phone: '',
      new_phone1: '',
      new_phone2: '',
      old_email: '',
      new_email1: '',
      new_email2: '',
      question1: 0,
      answer1: '',
      question2: 0,
      answer2: '',
      question3: 0,
      answer3: '',
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
        '您配偶的生日是？',
      ],
      correctInfo: {},
      update: {},
      setLoginPassArr: {},
      setTradPassArr: {},
      addUserHintArr: {},
      FPchangeUserHintArr: {},
      FPcheckQuestionArr: {},
      old_name: '',
      new_name1: '',
      new_name2: '',
      verifyAnswer1: '',
      verifyAnswer2: '',
      verifyAnswer3: '',
      accessCode: '',
      verifyImg:'',
      vid:'',
      vcode:'',
    };
  },
  mounted() {
    this.randomVerify1()
    this.randomVerify()
  },
  methods: {
    ...mapActions('userinfo', ['encodeLogin']),
    ...mapActions('user', [
      'updateUserInfo',
      'setLoginPassVerify',
      'setTradPassVerify',
      'addUserHint',
      'FPchangeUserHint',
      'FPcheckQuestion',
      'getVerifyImage'
    ]),
    async getVerify() {
      let img = await http({
        ac: 'getVerifyImage'
      });
      this.verifyImg = img.img
      this.vid = img.vid
    },
    async toupdateUserInfo() {
      //设置/修改密保手机、邮箱
      let update = await this.updateUserInfo(this.update);
      // this.encodeLogin(this.userinfo);
      if (!!update) {
      }
      if (this.update.type === 3) {
        this.$Message.success('密保手机修改成功');
        this.close_phone();
      } else if (this.update.type === 1) {
        this.close_name();
      } else {
        this.$Message.success('密保邮箱修改成功');
        this.close_email();
      }
    },
    async tosetLoginPassVerify() {
      // 设置/修改登录密码
      let setLoginPassVerify = await this.setLoginPassVerify(
        this.setLoginPassArr
      );
      this.$Message.success('密码修改成功');
      this.close_login();
      if (this.userinfo.uid) {
        let logoutResult = await this.$store.dispatch(
          'userinfo/logout',
          this.userinfo
        );
        if (logoutResult) {
          this.$Message.success('您已成功退出');
        }
      }
    },
    async tosetTradPassVerify() {
      // 设置/修改交易密码
      let setTradPassVerify = await this.setTradPassVerify(this.setTradPassArr);
      this.encodeLogin(this.userinfo);
      this.$Message.success('安全密码修改成功');
      this.close_tk();
    },
    async toaddUserHint() {
      // 设置密保问题
      let addUserHint = await this.addUserHint(this.addUserHintArr);
      this.encodeLogin(this.userinfo);
      this.$Message.success('密保问题设置成功');
      this.close_question();
    },
    async toFPchangeUserHint() {
      // 设置新的密码问题
      let FPchangeUserHint = await this.FPchangeUserHint(
        this.FPchangeUserHintArr
      );
      this.$Message.success('新密保问题设置成功');
      this.close_question();
    },
    async toFPcheckQuestion() {
      // 校验密码问题
      let FPchangeUserHint = await this.FPcheckQuestion(
        this.FPcheckQuestionArr
      );
      this.$Message.success('密保问题校验成功，请设置新的密保问题');
      if (!!FPchangeUserHint) {
        this.accessCode = FPchangeUserHint.accessCode;
        this.close_verifyQuestion();
        this.open_question();
      }
    },
    // 设置/修改登录密码
    setLoginPass() {
      if (this.old_login_pass === '' || this.new_login_pass1 === '' || this.new_login_pass2 === '') {
        this.$Message.warning('密码不能为空');
        return;
      }
      if(!/^[0-9a-zA-Z]{6,20}$/.test(this.new_login_pass1)) {
        this.$Message.warning("请输入正确格式密码" )
        return
      }
      if(this.old_login_pass ==this.new_login_pass1){
        this.$Message.warning('新密码与旧密码一致，请重新输入');
        return;
      }
      if (this.new_login_pass1 !== this.new_login_pass2) {
        this.$Message.warning('两次输入的密码不同,请重新输入');
        return;
      }
      this.setLoginPassArr.oldpass = this.old_login_pass;
      this.setLoginPassArr.newpass = this.new_login_pass1;
      this.tosetLoginPassVerify();
    },
    // 设置/修改密保手机、邮箱、真实姓名
    async updateInfo(type) {
      this.update = {};
      if (type === 3) {
        if(this.is_phone){
          if(this.old_phone === '' || this.vcode === '' || this.new_phone1 === ''){
            this.$Message.warning('手机号或验证码不能为空');
            return
          } else if(this.old_phone ==this.new_phone1){
            this.$Message.warning('新手机号与旧手机号一致，请重新输入');
            return
          }
          this.update.type = type;
          this.update.oldphone = this.old_phone;
          this.update.phone = this.new_phone1;
        } else {
          if(this.new_phone1 === '' || this.vcode === ''){
            this.$Message.warning('手机号或验证码不能为空');
            return
          }
          this.update.type = type;
          this.update.phone = this.new_phone1;
        }
        if(this.vcode != this.verifyArr.join('')) {
          this.$Message.warning('验证码错误！')
          return false
        }
      } else if (type === 1) {
        if(this.is_name){
          if(this.new_name1 === '' || this.old_name === ''){
            this.$Message.warning('真实姓名不能为空')
            return
          } else if(this.new_name1 === this.old_name){
            this.$Message.warning('新姓名与旧姓名一致，请重新输入')
            return
          }
          this.update.type = type;
          this.update.oldname = this.old_name;
          this.update.realname = this.new_name1;
        } else {
          if(this.new_name1 === ''){
            this.$Message.warning('真实姓名不能为空')
            return
          }
          this.update.type = type;
          this.update.realname = this.new_name1;
        }
        if (this.new_name1.length === 1) {
          this.$Message.warning('真实姓名字符串过短，请重新输入');
          return;
        }
        // if (this.new_name1 !== this.new_name2) {
        //   this.$Message.warning("两次输入的姓名不同");
        //   return;
        // }
      } else {
        if(this.is_email){
          if(this.new_email1 === '' || this.old_email === ''|| this.vcode === ''){
            this.$Message.warning('邮箱或验证码不能为空')
            return
          } else if(this.new_email1 === this.old_email) {
            this.$Message.warning('新邮箱与旧邮箱一致，请重新输入');
            return
          }
          this.update.type = type;
          this.update.oldemail = this.old_email;
          this.update.email = this.new_email1;
        } else {
          if(this.new_email1 === '' || this.vcode === ''){
            this.$Message.warning('邮箱或验证码不能为空')
            return
          }
          this.update.type = type;
          this.update.email = this.new_email1;
        }
        if(this.vcode != this.verifyArr.join('')) {
          this.$Message.warning('验证码错误！')
          return false
        }
      }
      this.toupdateUserInfo();
      if (this.update.type === 1) {
        this.close_name();
      }
    },
    // 设置/修改交易密码
    correctPW() {
      if(this.is_tk){
        if(this.old_tk_pass === '' || this.new_tk_pass1 === '' || this.new_tk_pass2 === ''){
          this.$Message.warning('安全密码不能为空');
          return;
        }
        if(!(/^\d{4}$/.test(this.old_tk_pass)) || !(/^\d{4}$/.test(this.new_tk_pass1)) || !(/^\d{4}$/.test(this.new_tk_pass2))){
			  	this.$Message.warning('请输入纯数字的四位交易密码');
			  	return
        }
        this.setTradPassArr.oldpass = this.old_tk_pass;
        this.setTradPassArr.newpass = this.new_tk_pass1;
        this.setTradPassArr.tkpassok = this.userinfo.tkpass_ok;
      } else {
        if(this.new_tk_pass2 === '' || this.new_tk_pass1 === ''){
          this.$Message.warning('安全密码不能为空');
          return;
        }
        if(!(/^\d{4}$/.test(this.new_tk_pass1)) || !(/^\d{4}$/.test(this.new_tk_pass2))){
			  	this.$Message.warning('请输入纯数字的四位交易密码');
			  	return
        }
        this.setTradPassArr.newpass = this.new_tk_pass1;
        this.setTradPassArr.tkpassok = this.userinfo.tkpass_ok;
      }
      if (this.new_tk_pass1 !== this.new_tk_pass2) {
        this.$Message.warning('两次密码输入不一致');
        return;
      }
      this.tosetTradPassVerify();
    },
    // 设置密保问题
    setQuestion() {
      if (this.question1 === 0 || this.question2 === 0 || this.question3 === 0) {
        this.$Message.warning('请选择密保问题');
        return;
      }
      if (
        this.question1 === this.question2 ||
        this.question1 === this.question3 ||
        this.question2 === this.question3
      ) {
        this.$Message.warning('请选择不同的密保问题');
        return;
      }
      this.addUserHintArr.hint_1 = this.question1;
      this.addUserHintArr.hint_2 = this.question2;
      this.addUserHintArr.hint_3 = this.question3;
      this.addUserHintArr.answer_1 = this.answer1;
      this.addUserHintArr.answer_2 = this.answer2;
      this.addUserHintArr.answer_3 = this.answer3;
      this.toaddUserHint();
    },
    // 设置新的密保问题
    setNewQuestion() {
      if (this.question1 === 0 || this.question2 === 0 || this.question3 === 0) {
        this.$Message.warning('请选择密保问题');
        return;
      }
      if (
        this.question1 === this.question2 ||
        this.question1 === this.question3 ||
        this.question2 === this.question3
      ) {
        this.$Message.warning('请选择不同的密保问题');
        return;
      }
      this.FPchangeUserHintArr.hint_1 = this.question1;
      this.FPchangeUserHintArr.hint_2 = this.question2;
      this.FPchangeUserHintArr.hint_3 = this.question3;
      this.FPchangeUserHintArr.answer_1 = this.answer1;
      this.FPchangeUserHintArr.answer_2 = this.answer2;
      this.FPchangeUserHintArr.answer_3 = this.answer3;
      this.FPchangeUserHintArr.accessCode = this.accessCode;
      this.toFPchangeUserHint();
    },
    // 校验密保问题
    verificationQuestion() {
      this.FPcheckQuestionArr.question_1 = this.verifyQuestion1;
      this.FPcheckQuestionArr.question_2 = this.verifyQuestion2;
      this.FPcheckQuestionArr.question_3 = this.verifyQuestion3;
      this.FPcheckQuestionArr.answer_1 = this.verifyAnswer1;
      this.FPcheckQuestionArr.answer_2 = this.verifyAnswer2;
      this.FPcheckQuestionArr.answer_3 = this.verifyAnswer3;
      this.FPcheckQuestionArr.username = this.userinfo.username;
      this.toFPcheckQuestion();
    },
    open_login() {
      this.loginBox = true;
    },
    open_tk() {
      this.tkBox = true;
    },
    open_phone() {
      this.phoneBox = true;
    },
    open_email() {
      this.emailBox = true;
    },
    open_question() {
      this.questionBox = true;
    },
    open_verifyQuestion() {
      this.verifyQuestion = true;
    },
    close_login() {
      this.old_login_pass = '';
      this.new_login_pass1 = '';
      this.new_login_pass2 = '';
      this.loginBox = false;
    },
    close_tk() {
      this.$refs.old.obj = ['', '', '', ''];
      this.$refs.new1.obj = ['', '', '', ''];
      this.$refs.new2.obj = ['', '', '', ''];
      this.tkBox = false;
    },
    close_phone() {
      this.old_phone = '';
      this.new_phone1 = '';
      this.new_phone2 = '';
      this.phoneBox = false;
      this.vcode = ''
    },
    close_email() {
      this.old_email = '';
      this.new_email1 = '';
      this.new_email2 = '';
      this.emailBox = false;
      this.vcode = ''
    },
    close_question() {
      this.question1 = 0;
      this.question2 = 0;
      this.question3 = 0;
      this.answer1 = '';
      this.answer2 = '';
      this.answer3 = '';
      this.questionBox = false;
    },
    close_verifyQuestion() {
      this.verifyAnswer1 = '';
      this.verifyAnswer2 = '';
      this.verifyAnswer3 = '';
      this.verifyQuestion = false;
    },
    close_name() {
      this.old_name = '';
      this.new_name1 = '';
      this.new_name2 = '';
      this.nameBox = false;
    },
    open_name() {
      this.nameBox = true;
    },
    sendTime(t) {
      let timestamp = t * 1000;
      let assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = m => {
          return m > 9 ? m : '0' + m;
        };
      return y + '-' + add0(M) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(m) + ':' + add0(s);
    },
  },
};
</script>
<style lang="scss">
.safe_body {
  width: 827px;
  .safe_level {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 5px;
    .line_1 {
      color: #f02c2d;
      font-size: 14px;
      height: 40px;
      padding: 6px;
      line-height: 28px;
      float: left;
      width: 165px;
    }
    .ivu-progress {
      float: left;
      width: 610px;
      padding: 10px 0;
      margin-left: 35px;
      .ivu-progress-inner {
        height: 20px;
        .ivu-progress-bg {
          height: 20px !important;
        }
      }
    }
    .ivu-progress.safe_1 {
      .ivu-progress-bg {
        background: url(../../../assets/img/safe_1.png) 0% 0% / 40px 30px;
      }
    }
    .ivu-progress.safe_2 {
      .ivu-progress-bg {
        background: url(../../../assets/img/safe_2.png) 0% 0% / 40px 30px;
      }
    }
    .ivu-progress.safe_3 {
      .ivu-progress-bg {
        background: url(../../../assets/img/safe_3.png) 0% 0% / 40px 30px;
      }
    }
    .ivu-progress.safe_4 {
      .ivu-progress-bg {
        background: url(../../../assets/img/safe_4.png) 0% 0% / 40px 30px;
      }
    }
    .ivu-progress.safe_5 {
      .ivu-progress-bg {
        background: url(../../../assets/img/safe_5.png) 0% 0% / 40px 30px;
      }
    }
    .line_2 {
      font-size: 12px;
      color: #333;
      margin-top: 50px;
      .btn_editpass {
        color: #00a0e9;
        cursor: pointer;
      }
    }
  }
  .box_container {
    width: 100%;
    border: 1px Solid #ccc;
    box-sizing: border-box;
    height: 550px;
    .title {
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      padding-left: 10px;
      box-sizing: border-box;
      background-color: #eee;
      border-bottom: 1px Solid #ccc;
    }
    .content {
      padding: 30px 0 5px 0;
      .item {
        width: 100%;
        border-bottom: 1px dashed #eee;
        height: 70px;
        white-space: nowrap;
        overflow: hidden;
        margin: 10px 0px 10px 0px;
        ._icon.login_pass {
          background-position: -250px 0px;
        }
        ._icon.tk_pass {
          background-position: -250px -64px;
        }
        ._icon.phone {
          background-position: -250px -128px;
        }
        ._icon.email {
          background-position: -314px -128px;
        }
        ._icon.question {
          background-position: -314px -64px;
        }
        ._icon.real_name {
          background-position: -382px -64px;
        }
        ._icon {
          width: 64px;
          height: 64px;
          top: 3px;
          float: left;
          background: url(../../../assets/img/user_center_icons.png) NO-REPEAT;
          margin: 0px 20px 0px 30px;
        }
        ._content {
          // padding-left: 20px;
          box-sizing: border-box;
          width: 600px;
          height: 64px;
          top: 3px;
          float: left;
          ._title {
            font-size: 18px;
            height: 32px;
            line-height: 32px;
            color: #25c5c4;
          }
          ._info {
            color: #666;
            font-size: 14px;
          }
        }
        ._tools {
          width: 150px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          top: 3px;
          a {
            color: #333333;
            font-size: 14px;
          }
          a:hover {
            color: red;
          }
        }
      }
      .item.disable ._icon {
        filter: grayscale(100%);
      }
      .item.disable ._content ._title {
        color: #999;
      }
    }
    .loginpass {
      width: 400px;
      // height: 300px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: #ccc 2px 3px 4px;
      padding: 0 10px 20px 10px;
      .head {
        padding: 5px 0;
        color: rgb(250, 132, 65);
        border-bottom: 1px solid rgb(250, 132, 65);
        position: relative;
        font-size: 13px;
      }
      .modify {
        padding: 10px 0;
        .box {
          width: 260px;
          margin: 0 auto;
          position: relative;
          .tit {
            display: inline-block;
            width: 60px;
            text-align: right;
            margin-right: 10px;
          }
          .tk_index {
            height: 25px;
            line-height: 25px;
            color: #999;
            width: 35px;
            text-align: center;
            font-size: 14px;
            margin: 0 5px;
            display: inline-block;
            background: -webkit-gradient(
              linear,
              0% 0%,
              0% 100%,
              from(#ffffff),
              to(#f3f3f3)
            );
            border: 1px Solid #cccccc;
          }
          .ivu-select-selection {
            height: 28px;
            border-radius: 2px;
            .ivu-select-placeholder {
              height: 28px;
              line-height: 28px;
            }
          }
          .ivu-input-wrapper {
            width: 180px !important;
          }
          .ivu-input {
            border-radius: 2px;
            height: 28px !important;
          }
          .verify_img {
            position: absolute;
            top: 5px;
            right: 10px;
            height: 28px;
          }
          .deal_pw {
            input {
              height: 28px;
            }
          }
          .vcode {
            position: relative;
            .ivu-input-group-append {
              position: absolute;
              right: 0;
              top: 0;
              z-index: 100;
              width: 60px;
              > div {
                height: 26px !important;
                i {
                  font-size: 1.4rem !important;
                }
              }
            }
          }
        }
      }
    }
    .modify {
      > div {
        padding: 5px 0;
      }
    }
    .enter {
      width: 70px;
      line-height: 24px;
      display: block;
      margin: 0 auto;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background-color: rgb(62, 63, 64);
    }
    .close {
      display: inline-block;
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .verifyImg {
      position: absolute;
      top: 5px;
      right: 10px;
      height: 28px;
    }
  }
}
</style>
