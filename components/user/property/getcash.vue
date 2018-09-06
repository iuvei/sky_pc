<template>
  <div class="getcash_main_body">
    <h4>使用提示</h4>
    <p class="tips">为保护您的资金安全，绑定银行卡后，如需修改请联系客服，以免造成不必要的损失，谢谢。</p>
    <hr>
    <Row class="getcash_main_content">
      <Row class="info_one">
        <Col :span="12">收款人: {{basicData.real_name}}</Col>
        <Col :span="12">本次可提余额:
        <i style="color: #e33939">{{basicData.min_take}}元 ~ {{basicData.max_take}}元</i>
        </Col>
      </Row>
      <Row class="info_two">
        <p>*提款需达有效投注:
          <i style="color: #e33939">{{basicData.price_rq}}</i>
          <Button type="primary" style="margin-left: 20px;" @click.native="freshData">刷新</Button>
          *已达投注量<i style="color: #e33939">{{basicData.tz_count}}</i>
        </p>
        <p>
          *今日剩余免手续费次数:
          <i style="color: #e33939">{{basicData.price_fee_count}}次</i>
        </p>
        <p>
          *提款手续费
          <i style="color: #e33939">
            {{basicData.xz_take+basicData.get_take+basicData.youhui}}元 (行政费:{{basicData.xz_take}}元 + 手续费: {{basicData.get_take}}元 + 优惠扣除: {{basicData.youhui}}元)
          </i>
        </p>
        <Form :label-width="130" label-position="right" class="getcash_form">
          <FormItem label="请选择收款银行：">
            <Col :span="8">
            <!-- <Input type="text" v-model="getForm.bankName" placeholder="银行名称"></Input> -->
            <Select class="r-block" v-model="bankid">
              <Option v-for="(item,key) in basicData.banklist" :value="item.id" :key="key">{{ item.bank_typename }}</Option>
            </Select>
            </Col>
            <!-- <Col :span="4" :offset="1">
            <Button type="primary">更换</Button>
            </Col> -->
          </FormItem>
          <FormItem label="收款银行卡账号：">
            <Col :span="8">
            <Input type="text" :value="bankCard" placeholder="银行卡号" disabled></Input>
            </Col>
          </FormItem>
          <FormItem label="提款金额：">
            <Col :span="8">
            <Input type="text" v-model="getNum" placeholder="" :number="true"></Input>
            </Col>
            <Col :span="4" :offset="1">
            <Button type="primary" @click="getNum=basicData.max_take">最大</Button>
            </Col>
          </FormItem>
          <FormItem label="安全密码：">
            <password-input v-model="tk_pass" ref="pass"></password-input>
          </FormItem>
          <Row class="submit_button">
            <Button type="primary" size="large" @click="okClick">确认提交</Button>
          </Row>
        </Form>
      </Row>
    </Row>
  </div>
</template>
<script>
import passwordInput from "~/components/user/passwordInput";
import { mapState, mapActions } from "vuex";
import { debounce } from "lodash";
export default {
  components: {
    passwordInput
  },
  data() {
    return {
      bankid: "",
      bankCard: "",
      bankName: "",
      getNum: "",
      getForm: {
        bankid: "",
        bankName: "",
        getNum: ""
      },
      tk_pass: "",
      basicData: {}
    };
  },
  async mounted() {
    this.freshData();
    // console.log(this.basicData);
  },
  watch: {
    bankid(bankid) {
      if (!bankid) return;
      let banklist = this.basicData.banklist || [];
      let bank = banklist.filter(el => el.id === bankid)[0];
      bank = (bank && bank.card) || "";
      this.bankCard = bank;
    },
    getNum(v) {
      if (v > this.basicData.max_take) {
        this.getNum = this.basicData.max_take;
      }
    }
  },
  methods: {
    ...mapActions("property", ["getCashState", "getTkPrice"]),
    okClick() {
      let tk_pass = this.tk_pass;
      if (this.getNum <= 0) {
        return this.$Message.info({
          content: "请输入一个有效的提款金额!",
          closable: true
        });
      } else if (tk_pass.split("").length < 4) {
        return this.$Message.info({
          content: "提款密码不合法,请重新输入!",
          closable: true
        });
      }
      this.handleTk();
    },
    handleTk: debounce(async function() {
      let params = {
        bankid: this.bankid,
        price: this.getNum,
        tk_pass: this.tk_pass
      };
      let data = await this.getTkPrice(params);

      this.getNum = "";
      this.$refs.pass.obj = ["", "", "", ""]
      this.tk_pass = "";
      this.freshData();
      this.$Message.success({
        content: "提款成功",
        closable: true
      });
    }, 500),
    async freshData() {
      let data = (await this.getCashState()) || {};
      this.basicData = data;
      this.bankid = data.bink_id + "";
      this.bankCard = data.card_num;
    }
  }
};
</script>
<style lang="scss">
.getcash_main_body {
  width: 100%;
  padding: 20px 40px;
  .ivu-input-number {
    width: 100%;
  }
  h4 {
    font-size: 16px;
    color: rgb(0, 160, 233);
    margin-bottom: 10px;
  }
  .tips {
    font-size: 14px;
    color: #e33939;
    margin-bottom: 20px;
  }
  .getcash_main_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    padding: 0 5%;
    .info_one {
      width: 100%;
      font-size: 16px;
      padding: 20px 0;
      .ivu-col {
        // text-align: center;
      }
    }
    .info_two {
      width: 100%;
      padding-left: 7%;
      display: flex;
      flex-direction: column;
      > p {
        line-height: 30px;
      }
      .getcash_form {
        .ivu-form-item-label {
          font-size: 14px;
        }
      }
      .submit_button {
        text-align: center;
        margin-left: -100px;
      }
    }
  }
}
</style>

