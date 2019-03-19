<template>
	<div class="bank_body">
		<div class="card_list" v-for="(item,key) in cardData" :key="key">
			<div class="line1">
				<div class="bank_icon" :class="'bank_type_'+item.bank_type" :type="item.bank_type"></div>
				<span class="bank_title">{{item.bank_typename}}</span>
				<span class="num">尾号{{item.card_num.substr(-4)}}</span>
			</div>
			<div class="line2"></div>
			<div class="line3">
				<input type="checkbox" :checked="(item.is_default==1)?'checked':''" @click="setdefault(item.id,$event,key)">设置为默认银行卡
				<a class="relieve" @click="del(item.id,key)">解绑</a>
				<a class="relieve" @click="update(item,key)">修改</a>
			</div>
		</div>
		<div class="add_card" @click="open_addCard">
			<div class="add_icon"></div>
			<span class="add_txt">添加银行卡</span>
		</div>
		<!-- 添加银行卡 -->
		<div class="loginpass" v-show="addCard">
			<div class="head">{{isShow?'绑定银行卡':'修改银行卡'}}
				<span class="close" @click="close_addCard">×</span>
			</div>
			<div class="modify">
				<div class="box">
					<span class="tit">选择银行</span>
					<Select v-model="card" style="width:175px;height:28px" v-show="card!==-1">
						<Option value="0">请选择银行卡</Option>
						<Option v-for="(item,key) in bankList" :value="item.id" :key="key">{{ item.name }}</Option>
					</Select>
					<Input v-model="more_bank" placeholder="请输入其它银行卡" clearable style="width: 175px" v-show="card===-1"></Input>
					<Icon class="icon_down" type="arrow-down-b  ivu-select-arrow" @click.native="resetSelect" v-show="card===-1"></Icon>
				</div>
				<div class="box">
					<span class="tit">持卡人</span>
					<Input v-if="isName" v-model="username" placeholder="" clearable style="width: 175px" disabled></Input>
					<Input v-else v-model="username" placeholder="请输入真实的姓名" clearable style="width: 175px"></Input>
				</div>
				<div class="box">
					<span class="tit">银行卡卡号</span>
					<input class="ivu-input" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" v-model="cardNum" placeholder="请输入银行卡账号" clearable style="width: 175px" :disabled="!isShow"></input>
				</div>
				<div class="box">
					<span class="tit">开户地省市</span>
					<Input v-model="province" placeholder="请输入省市" clearable style="width: 175px"></Input>
				</div>
				<div class="box">
					<span class="tit">开户行详细地址</span>
					<Input v-model="district" placeholder="请输入详细地址" clearable style="width: 175px"></Input>
				</div>
				<div class="box">
					<span class="tit">安全密码</span>
					<password-input v-model="tk_pass" ref="safePass"></password-input>
				</div>
			</div>
			<div class="enter" v-if="isShow" @click="addBankCard">确定绑定</div>
			<div class="enter" v-else @click="updateCard">确定修改</div>
		</div>
		<!-- 解绑银行卡 -->
		<div class="loginpass delcard" v-show="delCard">
			<div class="head">解绑银行卡
				<span class="close" @click="close_delCard">×</span>
			</div>
			<div class="modify">
				<div class="box">
					<span class="tit">安全密码</span>
					<password-input v-model="tk_pass" ref="delPass"></password-input>
				</div>
			</div>
			<div class="enter" @click="delBankCard">确定解绑</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import passwordInput from '~/components/user/passwordInput'
export default {
  name: 'userBank',
  data() {
    return {
      addCard: false, //添加银行卡
      delCard: false,
      card: '0',
      username: '',
      cardNum: '',
      province: '',
      district: '',
      more_bank: '',
      bankCardInfo: {},
      bankList: [],
      cardData: [],
      id: '',
      cardId: '',
      isShow: true,
      tk_pass: '',
      isName: false,
      newBankId: 0,
      key: 0
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo.accountInfo
    })
  },
  components: {
    passwordInput
  },
  mounted() {
    this.togetUserBankCard()
    this.togetBankCardList()
  },
  methods: {
    ...mapActions('user', [
      'getUserBankCard',
      'addUserBankCard',
      'getBankCardList',
      'updateUserBankCard',
      'delUserBankCard',
      'setUserBankDefault'
    ]),
    async togetUserBankCard() {
      // 获取银行卡列表
      this.username = this.userinfo.real_name
      if (this.username) {
        this.isName = true
      }
      let bankCard = await this.getUserBankCard()
      // console.log(bankCard)
      this.cardData = bankCard
      if (bankCard.length == 1) {
        if (bankCard[0].is_default == 1) {
          return
        }
        this.cardId = bankCard[0].id
        this.tosetUserBankDefault()
      }
    },
    async toaddUserBankCard() {
      // 添加银行卡
      // console.log(this.bankCardInfo)
      let card = await this.addUserBankCard(this.bankCardInfo)
      this.$Message.success('添加银行卡成功')
      // this.togetUserBankCard();
      this.close_addCard()
      // if(card){
      let newcard = {
        address: this.bankCardInfo.address,
        bank_type: this.bankCardInfo.type,
        bank_typename: this.cardName(this.bankCardInfo.type),
        card_num: this.bankCardInfo.card_num,
        card_sheng: this.bankCardInfo.card_sheng,
        // card_shi:'',
        id: card.bank_id,
        is_default: 0
      }
      this.cardData.push(newcard)
      // console.log(this.cardData)
      if (this.cardData.length == 1) {
        this.cardData[0].is_default = 1
      }
      // console.log(this.cardData)
      // }
    },
    async toupdateUserBankCard() {
      // 修改银行卡
      // console.log(this.bankCardInfo)
      let updateCard = await this.updateUserBankCard(this.bankCardInfo)
      // this.togetUserBankCard();
      this.$Message.success('修改银行卡成功')
      this.close_addCard()
      // if(updateCard){
      this.cardData[this.key].address = this.bankCardInfo.address
      this.cardData[this.key].bank_type = this.bankCardInfo.type
      this.cardData[this.key].bank_typename = this.cardName(
        this.bankCardInfo.type
      )
      this.cardData[this.key].card_num = this.bankCardInfo.card_num
      this.cardData[this.key].card_sheng = this.bankCardInfo.card_sheng
      // console.log(this.cardData)
      // }
    },
    async todelUserBankCard() {
      // 解绑银行卡
      // console.log(this.bankCardInfo)
      let delCard = await this.delUserBankCard(this.bankCardInfo)
      // this.togetUserBankCard();
      this.$Message.success('解除绑定银行卡成功')
      this.close_delCard()
      // if(delCard){
      this.cardData.splice(this.key, 1)
      // console.log(this.cardData)
      // }
    },
    async tosetUserBankDefault() {
      // 设置默认银行卡
      let setCard = await this.setUserBankDefault(this.cardId)
      this.$Message.success('设置默认银行卡成功')
      // this.togetUserBankCard();
    },
    async togetBankCardList() {
      // 获取支持银行卡列表
      let cardList = await this.getBankCardList()
      cardList.push({ id: -1, name: '其他银行' })
      this.bankList = cardList
    },
    cardName(type) {
      if (type == -1) {
        return this.more_bank
      }
      for (let i = 0; i < this.bankList.length; i++) {
        if (this.bankList[i].id == type) {
          return this.bankList[i].name
        }
      }
    },
    addBankCard() {
      if (this.card == '0') {
        this.$Message.warning('请选择银行卡类型')
        return
      } else if ((this.card == '-1') & (this.more_bank == '')) {
        this.$Message.warning('请输入其它银行卡类型')
        return
      }
      if (this.username == '') {
        this.$Message.warning('请输入姓名')
        return
      } else if (this.cardNum == '') {
        this.$Message.warning('请输入卡号')
        return
      } else if (this.province == '') {
        this.$Message.warning('请输入省/市')
        return
      } else if (this.tk_pass == '') {
        this.$Message.warning('请输入安全密码')
        return
      }
      if (this.card == '0') {
        this.$Message.warning('请选择正确的银行卡类型')
        return
      }
      if (!/^(\d{10,20})$/.test(this.cardNum)) {
        this.$Message.warning('请输入正确的银行卡号')
        return
      }
      if (!/^\d{4}$/.test(this.tk_pass)) {
        this.$Message.warning('请输入纯数字的四位交易密码')
        return
      }
      if (this.username.length == 1) {
        this.$Message.warning('真实姓名字符串过短，请重新输入')
        return
      }
      this.bankCardInfo.tk_pass = this.tk_pass
      this.bankCardInfo.type = this.card
      this.bankCardInfo.card_num = this.cardNum
      this.bankCardInfo.card_sheng = this.province
      this.bankCardInfo.address = this.district
      this.bankCardInfo.more_bank = this.more_bank
      this.bankCardInfo.realname = this.username
      this.toaddUserBankCard()
    },
    updateCard() {
      if (this.card == 0) {
        this.$Message.warning('请选择银行卡类型')
        return
      } else if ((this.card == '-1') & (this.more_bank == '')) {
        this.$Message.warning('请输入其它银行卡类型')
        return
      }
      if (this.username == '') {
        this.$Message.warning('请输入姓名')
        return
      } else if (this.cardNum == '') {
        this.$Message.warning('请输入卡号')
        return
      } else if (this.province == '') {
        this.$Message.warning('请输入省/市')
        return
      } else if (this.tk_pass == '') {
        this.$Message.warning('请输入安全密码')
        return
      }
      if (this.card == '0') {
        this.$Message.warning('请选择正确的银行卡类型')
        return
      }
      if (!/^(\d{10,20})$/.test(this.cardNum)) {
        this.$Message.warning('请输入正确的银行卡号')
        return
      }
      if (!/^\d{4}$/.test(this.tk_pass)) {
        this.$Message.warning('请输入纯数字的四位交易密码')
        return
      }
      if (this.username.length == 1) {
        this.$Message.warning('真实姓名字符串过短，请重新输入')
        return
      }
      this.bankCardInfo.tk_pass = this.tk_pass
      this.bankCardInfo.type = this.card
      this.bankCardInfo.card_num = this.cardNum
      this.bankCardInfo.card_sheng = this.province
      this.bankCardInfo.address = this.district
      this.bankCardInfo.more_bank = this.more_bank
      this.bankCardInfo.realname = this.username
      this.bankCardInfo.id = this.id
      this.toupdateUserBankCard()
    },
    update(item, k) {
      this.key = k
      this.more_bank = item.bank_typename
      this.card = item.bank_type
      this.cardNum = item.card_num
      this.province = item.card_sheng
      this.district = item.address
      this.id = item.id
      this.open_addCard()
      this.isShow = false
    },
    delBankCard() {
      this.bankCardInfo.tk_pass = this.tk_pass
      this.bankCardInfo.id = this.id
      if (!/^\d{4}$/.test(this.tk_pass)) {
        this.$Message.warning('请输入纯数字的四位交易密码')
        return
      }
      this.todelUserBankCard()
    },
    setdefault(id, e, k) {
      e.target.checked = true
      this.cardId = id
      this.tosetUserBankDefault()
      for (let i = 0; i < this.cardData.length; i++) {
        this.cardData[i].is_default = 0
      }
      this.cardData[k].is_default = 1
    },
    resetSelect() {
      if (this.card === -1) this.card = '0'
    },
    del(id, k) {
      this.key = k
      this.id = id
      this.delCard = true
    },
    open_addCard() {
      this.addCard = true
    },
    close_addCard() {
      this.addCard = false
      this.card = '0'
      this.cardNum = ''
      this.province = ''
      this.district = ''
      this.id = ''
      this.$refs.safePass.obj = ['', '', '', '']
      this.tk_pass = ''
      this.isShow = true
    },
    close_delCard() {
      this.delCard = false
      this.id = ''
      this.$refs.delPass.obj = ['', '', '', '']
      this.tk_pass = ''
    }
  }
}
</script>
<style lang="scss">
.bank_body {
  padding: 20px;
  width: 827px;
  height: 700px;
  border: 1px solid #ccc;
  .card_list:hover {
    box-shadow: #ccc 2px 2px 5px;
  }
  .card_list {
    display: inline-block;
    width: 242px;
    height: 130px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 18px;
    margin-bottom: 18px;
    float: left;
    .line1 {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      padding: 0 5px 0 30px;
      background: url(../../../assets/img/user_center_icons.png) -66px -237px;
      position: relative;
      .bank_icon.bank_type_0 {
        background-position: 0px -580px;
      }
      .bank_icon.bank_type_1 {
        background-position: 0px 0px;
      }
      .bank_icon.bank_type_2 {
        background-position: 0px -20px;
      }
      .bank_icon.bank_type_3 {
        background-position: 0px -40px;
      }
      .bank_icon.bank_type_4 {
        background-position: 0px -60px;
      }
      .bank_icon.bank_type_5 {
        background-position: 0px -80px;
      }
      .bank_icon.bank_type_6 {
        background-position: 0px -100px;
      }
      .bank_icon.bank_type_7 {
        background-position: 0px -120px;
      }
      .bank_icon.bank_type_8 {
        background-position: 0px -140px;
      }
      .bank_icon.bank_type_9 {
        background-position: 0px -160px;
      }
      .bank_icon.bank_type_10 {
        background-position: 0px -180px;
      }
      .bank_icon.bank_type_11 {
        background-position: 0px -200px;
      }
      .bank_icon.bank_type_12 {
        background-position: 0px -220px;
      }
      .bank_icon.bank_type_13 {
        background-position: 0px -240px;
      }
      .bank_icon.bank_type_14 {
        background-position: 0px -260px;
      }
      .bank_icon.bank_type_15 {
        background-position: 0px -280px;
      }
      .bank_icon.bank_type_16 {
        background-position: 0px -300px;
      }
      .bank_icon.bank_type_17 {
        background-position: 0px -320px;
      }
      .bank_icon.bank_type_18 {
        background-position: 0px -340px;
      }
      .bank_icon.bank_type_19 {
        background-position: 0px -360px;
      }
      .bank_icon.bank_type_20 {
        background-position: 0px -380px;
      }
      .bank_icon.bank_type_21 {
        background-position: 0px -400px;
      }
      .bank_icon.bank_type_22 {
        background-position: 0px -420px;
      }
      .bank_icon.bank_type_23 {
        background-position: 0px -440px;
      }
      .bank_icon.bank_type_24 {
        background-position: 0px -460px;
      }
      .bank_icon.bank_type_25 {
        background-position: 0px -480px;
      }
      .bank_icon.bank_type_26 {
        background-position: 0px -500px;
      }
      .bank_icon.bank_type_27 {
        background-position: 0px -520px;
      }
      .bank_icon.bank_type_28 {
        background-position: 0px -540px;
      }
      .bank_icon.bank_type_29 {
        background-position: 0px -560px;
      }
      .bank_icon {
        width: 20px;
        height: 20px;
        background: url(../../../assets/img/bank_logo_list.png);
        display: inline-block;
        background-size: 20px;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
      }
      .bank_title,
      .num {
        display: inline-block;
        font-size: 13px;
        line-height: 40px;
      }
      .bank_title {
        margin-right: 15px;
      }
    }
    .line2 {
      height: 48px;
      background: url(../../../assets/img/user_center_icons.png) #eee;
      background-position: -220px -190px;
    }
    .line3 {
      line-height: 42px;
      height: 42px;
      font-size: 12px;
      color: #666;
      box-sizing: border-box;
      padding-left: 10px;
      position: relative;
      input {
        vertical-align: middle;
        margin-right: 2px;
      }
      .relieve {
        color: #00a0e9;
        float: right;
        padding: 0 10px;
      }
    }
  }
  .add_card {
    display: inline-block;
    width: 242px;
    height: 130px;
    border: 1px dashed rgb(255, 154, 0);
    border-radius: 4px;
    margin-right: 20px;
    cursor: pointer;
    margin-bottom: 18px;
    float: left;
    .add_icon {
      width: 64px;
      height: 50px;
      background: url(../../../assets/img/user_center_icons.png);
      background-position: -250px -280px;
      margin: 25px auto 0 auto;
    }
    .add_txt {
      display: block;
      text-align: center;
      color: #00a0e9;
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
        width: 280px;
        margin: 0 auto;
        position: relative;
        .tit {
          display: inline-block;
          width: 85px;
          text-align: right;
          margin-right: 10px;
        }
        .icon_down.ivu-icon {
          position: absolute;
          top: 13px;
          right: 16px;
          width: 26px;
          line-height: 26px;
          text-align: center;
        }
        .tk_index {
          height: 25px;
          line-height: 25px;
          color: #999;
          width: 37px;
          text-align: center;
          font-size: 14px;
          margin-right: 10px;
          display: inline-block;
          background: -webkit-gradient(
            linear,
            0% 0%,
            0% 100%,
            from(#ffffff),
            to(#f3f3f3)
          );
          border: 1px Solid #cccccc;
          &:last-child {
            margin-right: 0;
          }
        }
        .ivu-select-selection {
          height: 28px;
          border-radius: 2px;
          .ivu-select-placeholder {
            height: 28px;
            line-height: 28px;
          }
        }
        .ivu-input {
          border-radius: 2px !important;
          height: 28px !important;
        }
        .deal_pw {
          input {
            height: 28px;
          }
        }
      }
    }
  }
  .delcard {
    .modify {
      padding: 50px 0 !important;
    }
  }
  .modify {
    > div {
      padding: 5px 0;
    }
  }
  .enter {
    width: 80px;
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
}
</style>

