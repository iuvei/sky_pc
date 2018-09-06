<template>
  <!-- 现金交易页面 -->
  <div class="agent_that_that">
    <div class="top_content_that">
      <p class="using_tips">使用提示</p>
      <span class="again_to_determine">为保护您的资金安全，绑定银行卡后，如需修改请联系客服，以免造成不必要的损失，谢谢。</span>
    </div>
    <div class="intro_word_that">
      <div class="modify">
        <div class="box">
          <span class="l-block">选择银行</span>
          <Select class="r-block" v-model="cardId">
            <Option value="0">请选择银行卡</Option>
            <Option v-for="(item,key) in bankList" :value="item.id" :key="key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="box">
          <span class="l-block">持卡人</span>
          <Input class="r-block" v-model="real_name" placeholder="" :disabled="!!accountInfo.real_name"></Input>
        </div>
        <div class="box">
          <span class="l-block">银行卡卡号</span>
          <Input class="r-block" v-model="cardNo" placeholder="" clearable></Input>
        </div>
        <div class="box">
          <span class="l-block">开户地省份</span>
          <Input class="r-block" v-model="province" placeholder="" clearable></Input>
        </div>
        <div class="box">
          <span class="l-block">开户所在市</span>
          <Input class="r-block" v-model="region" placeholder="" clearable></Input>
        </div>
        <div class="box">
          <span class="l-block">安全密码</span>
          <passwordInput v-model="tk_pass" class="r-block"></passwordInput>
        </div>
      </div>
      <div class="enter">
        <Button type="error" @click="addBankCard">确认提交</Button>
      </div>

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import passwordInput from "~/components/user/passwordInput";
export default {
  name: "addBank",
  data() {
    return {
      real_name: "",
      cardId: "",
      bankList: [],
      cardNo: "",
      province: "",
      region: "",
      tk_pass: ""
    };
  },
  computed: {
    ...mapState("userinfo", ["accountInfo"])
  },
  components: {
    passwordInput
  },
  mounted() {
    this.getBanks();
  },
  methods: {
    ...mapActions("user", ["getBankCardList", "addUserBankCard"]),
    ...mapActions("agent", ["modifyField"]),
    async getBanks() {
      let data = (await this.getBankCardList()) || [];
      this.bankList = data;
    },
    async addBankCard() {
      let realname = this.accountInfo.real_name || this.real_name;
      if (realname.trim() === "") {
        return this.$Message.info({
          content: "请输入真实的姓名",
          closable: true
        });
      }

      let tk_pass = this.tk_pass;
      if (tk_pass.split("").length < 4) {
        return this.$Message.info({
          content: "设置安全密码长度不对",
          closable: true
        });
      }

      let params = {
        type: this.cardId,
        realname,
        card_num: this.cardNo,
        card_sheng: this.province,
        address: this.region,
        tk_pass
      };

      let data = await this.addUserBankCard(params);
      // console.error(data);

      // this.modifyField({
      //   prefix: "cashTransaction",
      //   params: {
      //     view: "cashTransaction"
      //   }
      // });
      this.$Message.success({
        content: "添加成功",
        closable: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.agent_that_that {
  margin-top: 12px;
  width: 100%;
  height: 626px;
  border: solid 1px #dbdbdb;
  .top_content_that {
    width: 89%;
    height: 50px;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 50px;
    border-bottom: solid 1px #dbdbdb;
    .using_tips {
      color: rgb(12, 238, 132);
    }
    .again_to_determine {
      color: #ff7c34;
    }
  }
  .intro_word_that {
    width: 73%;
    margin-top: 40px;
    text-align: center;
  }
  .modify {
    padding: 10px 0;
    .box {
      width: 80%;
      margin: 0 auto;
      padding: 5px 0;
      display: flex;
      align-items: center;
      .l-block {
        width: 100px;
        text-align: right;
        margin-right: 10px;
      }
      .r-block {
        flex: 1;
        text-align: left;
      }
    }
  }
}
</style>
