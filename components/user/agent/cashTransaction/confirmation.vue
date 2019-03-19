<template>
  <!--现金交易, 确认转账页面-->
  <div class="agent_that_that">
    <div class="top_content_that">
      <span class="again_to_determine">收款人:</span>
      <Avatar icon="md-person" v-if="otherInfo.head_icon" :src="otherInfo && otherInfo.head_icon" />
      <!-- <img v-if="otherInfo.head_icon" :src="otherInfo.head_icon" alt=""> -->
      <span>{{otherInfo.real_name}}</span>
      <span>({{otherInfo.userName}})</span>
    </div>
    <div class="intro_word_that">
      <div class="intro_word_that_srzh">
        <div class="intro_word_that_srzh_box">
          <div class="intro_word_that_srzh_left">
            <i>＊</i>转账金额:</div>
          <InputNumber type="number" v-model="money" placeholder="" style="width: 170px" :min="1"></InputNumber>元
        </div>
        <div class="intro_word_that_srzh_box">
          <div class="intro_word_that_srzh_left">
            <i>＊</i>真实姓名:</div>
          <Input v-model="real_name_confire" placeholder="" style="width: 180px"></Input>
        </div>
        <div class="intro_word_that_srzh_box">
          <div class="intro_word_that_srzh_left">
            <i>＊</i>交易密码:</div>
          <passwordInput v-model="trade_password" class="trade_password"></passwordInput>
        </div>
      </div>
    </div>
    <div class="next_button">
      <Button class="next_button_button" type="error" @click="nextClick">
        确认转账
      </Button>
    </div>
    <div class="warm_prompt">
      <p class="warm_prompt_prompt">温馨提示:</p>
      <p class="warm_prompt_prompt-bottom">❈1.请认真核对好以上信息在转账,避免出现失误,造成不必要的损失,谢谢!</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import passwordInput from '~/components/user/passwordInput';
export default {
  name: 'cash-trade-confirmation',
  components: { passwordInput },
  data() {
    return {
      money: 10,
      real_name_confire: '',
      trade_password: ''
    };
  },
  computed: {
    ...mapState('agent', ['cashTransaction']),
    otherInfo() {
      return {
        userName: this.cashTransaction.other,
        ...this.cashTransaction.otherInfo
      };
    }
  },
  methods: {
    ...mapActions('agent', ['modifyField', 'sendMoneyToChild']),
    async nextClick() {
      if (this.money <= 0) {
        return this.$Message.warning({
          content: '请输入正确的转账金额!',
          closable: true
        });
      } else if (this.real_name_confire.trim() === '') {
        return this.$Message.warning({
          content: '请输入对方的真实姓名!',
          closable: true
        });
      } else if (this.trade_password.split('').length < 4) {
        return this.$Message.warning({
          content: '请输入正确的交易密码!',
          closable: true
        });
      }

      let params = {
        price: this.money,
        realname: this.real_name_confire,
        username: this.otherInfo.userName,
        tk_pass: this.trade_password
      };
      let data = await this.sendMoneyToChild(params);
      //   console.error(data);
      if (data && data.price) {
        this.modifyField({
          prefix: 'cashTransaction',
          params: {
            view: 'success',
            tradeInfo: data
          }
        });
      }
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
    width: 88%;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    margin-left: 50px;
    border-bottom: solid 1px #dbdbdb;
    .again_to_determine {
      color: #eb0f0f;
      margin-right: 5px;
    }
    img{
      display: inline-block;
      height: 50px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .intro_word_that {
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    .intro_word_that_srzh {
      width: 46%;
      margin-left: 27%;
      .intro_word_that_srzh_box {
        height: 60px;
        font-size: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .intro_word_that_srzh_left {
          margin-right: 5px;
          i {
            color: rgb(240, 11, 11);
            margin-top: -10px;
          }
        }
        .trade_password {
          width: 180px;
        }
      }
    }
  }
  .next_button {
    display: flex;
    justify-content: center;
    align-items: center;
    .next_button_button_qdzz {
      color: #fff;
      font-size: 14px;
    }
  }
  .warm_prompt {
    width: 100%;
    margin: 80px 20px;
    font-size: 15px;
    .warm_prompt_prompt {
      color: rgb(54, 240, 25);
    }
    .warm_prompt_prompt-bottom {
      margin-top: 10px;
    }
  }
}
</style>
