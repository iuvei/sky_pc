<template>
  <!-- 现金交易页面 -->
  <div class="agent_that_that">
    <div class="top_content_that">
      <p class="using_tips">使用提示</p>
      <span class="again_to_determine">钱将实时转入对方账户,无法退款</span>
    </div>
    <div class="intro_word_that">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
        <FormItem label="*请输入对方账户:" prop="other">
          <Input type="text" v-model="formCustom.other"></Input>
        </FormItem>
        <FormItem>
          <Button class="next_button_button" type="error" @click="nextClick('formCustom')">
            下一步
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'cashTransaction',
  data() {
    const validateUser = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('您输入的账号不合法,请重新输入!'));
      } else if (value === this.accountInfo.username) {
        callback(new Error('您不能给自己转账!'));
      }
      callback();
    };
    return {
      other: '',
      formCustom: {
        other: ''
      },
      ruleCustom: {
        other: [{ validator: validateUser, trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapState('userinfo', ['accountInfo'])
  },
  methods: {
    ...mapActions('agent', ['modifyField', 'TradGetUserInfo']),
    nextClick(name) {
      // if (this.other.trim() === "") {
      //   return this.$Message.error({
      //     content: "您输入的账号不合法,请重新输入!",
      //     closable: true
      //   });
      // } else if (this.other === this.accountInfo.username) {
      //   return this.$Message.error({
      //     content: "您不能给自己转账",
      //     closable: true
      //   });
      // }
      // console.error(this.other);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.verifyAccount();
        }
      });
    },
    async verifyAccount() {
      let data = await this.TradGetUserInfo({
        username: this.formCustom.other
      });
      // console.error(data)
      if (data && data.real_name) {
        this.modifyField({
          prefix: 'cashTransaction',
          params: {
            view: 'confirmation',
            other: this.formCustom.other,
            otherInfo: data
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
    width: 60%;
    margin-top: 50px;
    margin-left: 10%;
  }
  .next_button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .next_button_button {
    }
  }
}
</style>
