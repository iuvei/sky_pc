<template>
  <Row class="payScan_main_body">
    <!-- <p>选择支付渠道：</p> -->
    <Form
      :model="formData"
      :label-width="150"
      class="pay_form"
      :rules="formRule"
      ref="thisForm"
      v-show="!stepTwoShow"
    >
      <FormItem
        label="选择支付渠道："
        prop="radio"
      >
        <RadioGroup v-model="formData.radio">
          <Row>
            <Col
              :span="8"
              v-for="(item, index) in basicData"
              :key="index"
            >
            <Radio :label="index">{{item.name}}<br><span class="tips">{{item.tips}}</span></Radio>
            </Col>
          </Row>
        </RadioGroup>
      </FormItem>
      <FormItem
        label="充值账号:"
        prop="account"
        class="form_price"
        v-if="accountIsShow"
      >
        <Input
          v-model="formData.account"
          placeholder="请输入充值账号"
        ></Input>
      </FormItem>
      <FormItem
        label="充值金额:"
        prop="price"
        class="form_price"
      >
        <Input
          v-model="formData.price"
          placeholder="请输入充值金额"
          :number="true"
        ></Input>
      </FormItem>
      <Row style="text-align:center;">
        <Button
          size="large"
          type="primary"
          @click.native="confirmPay"
          :loading="submitting"
        >确认充值</Button>
      </Row>
    </Form>
    <Row
      class="payScan_step_two"
      v-show="stepTwoShow"
    >
      <Row class="payScan_step_two_top">
        <Col
          :span="4"
          class="left"
        >
        <Icon
          type="checkmark-round"
          style="font-size: 75px;color:rgb(34,172,56)"
        ></Icon>
        </Col>
        <Col
          :span="20"
          class="right"
        >
        <p>订单提交成功，请扫描以下二维码付款！</p>
        <p class="order">订单号：<span>{{order}}</span></p>
        <p class="price">付款金额：<span>{{price}}元</span></p>
        <p v-if="accountIsShow && isNickname">入款账号：{{account}}</p>
        <p v-if="accountIsShow && isNickname">入款昵称：{{nickName}}</p>
        </Col>
      </Row>
      <Row class="payScan_step_two_middle">
        <Col
          :span="12"
          :offset="6"
        >
        <p>请使用{{scanDevice}}扫描下方二维码</p>
        <img
          :src="qrCode"
          alt=""
        >
        </Col>
      </Row>
      <Row class="payScan_step_two_bottom">
        <Button
          type="primary"
          size="large"
          @click.native="stepTwoShow=false"
        >返回</Button>
        <Button
          type="primary"
          size="large"
          @click.native="getBack"
        >我已付款</Button>
      </Row>
    </Row>
    <p
      v-html="tips"
      class="payScan_tips"
    ></p>
  </Row>
</template>
<script>
import { mapState, mapActions } from "vuex";
import to from "../../../api/await-to";
export default {
  props: ["basicData", "parentId"],
  data() {
    return {
      formData: {
        radio: "",
        price: "",
        account: ""
      },
      formRule: {
        price: [{ required: true, message: "请输入充值金额" }],
        radio: [{ required: true, message: "请选择支付渠道" }],
        account: [{ required: true, message: "请输入充值账号" }]
      },
      stepTwoShow: false,
      submitting: false,
      qrCode: "",
      order: "",
      price: "",
      account: "",
      nickName: "",
      isNickname: false
    };
  },
  computed: {
    ...mapState("property", ["payTips"]),
    tips() {
      let html;
      switch (this.parentId) {
        case "12":
        case "2":
          html = this.payTips.weixin_step;
          break;
        case "7":
          html = this.payTips.qq_step;
          break;
        case "4":
          html = this.payTips.alipay_step;
          break;
      }
      var temp = document.createElement("div");
      temp.innerHTML = html;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    scanDevice() {
      switch (this.parentId) {
        case "12":
          return "手机";
        case "2":
          return "微信/云闪付";
        case "7":
          return "QQ";
        case "4":
          return "支付宝";
      }
    },
    accountIsShow() {
      if (this.basicData.length > 0) {
        let data = this.basicData.find(
          (item, index) => index == this.formData.radio
        );
        return data ? data.man : data;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions("property", ["payQrcode"]),
    confirmPay() {
      this.$refs.thisForm.validate(async valid => {
        if (valid) {
          this.submitting = true;
          let params;
          if (this.accountIsShow) {
            let manData = this.basicData.find(
              (item, index) => index == this.formData.radio
            );
            this.account = manData.account;
            this.nickName = manData.nickname;
            this.qrCode = manData.qrcode;
            this.isNickname = manData.show;
            params = {
              ac: "submitPayQrcode",
              type: this.basicData[this.formData.radio].type,
              account: this.formData.account,
              price: this.formData.price,
              id: this.basicData[this.formData.radio].id
            };
          } else {
            params = {
              ac: "submitPayThrid",
              type: this.basicData[this.formData.radio].type,
              price: this.formData.price,
              thrid_id: this.basicData[this.formData.radio].id
            };
          }
          let [err, res] = await to(this.payQrcode(params));
          if (res) {
            if (this.accountIsShow) {
              let manData = this.basicData.find(
                (item, index) => index == this.formData.radio
              );
              this.account = manData.account;
              this.nickName = manData.nickname;
              this.qrCode = manData.qrcode;
              this.isNickname = manData.show;
              params = {
                ac: "submitPayQrcode",
                type: this.basicData[this.formData.radio].type,
                account: this.formData.account,
                price: this.formData.price,
                id: this.basicData[this.formData.radio].id
              };
              this.order = res.order;
              this.price = res.price;
            } else {
              this.order = res.dingdan;
              this.price = res.price;
              this.qrCode = res.url;
            }
            this.stepTwoShow = true;
          }
          this.submitting = false;
        }
      });
    },
    getBack() {
      this.stepTwoShow = false;
      this.$emit("defaultChoose");
    }
  },
  watch: {
    parentId() {
      this.formData = Object.assign(this.formData, {
        radio: ""
        // price: '',
        // account: ''
      });
      this.stepTwoShow = false;
    }
  }
};
</script>
<style lang="scss">
.payScan_main_body {
  .tips {
    padding-left: 18px;
    font-style: italic;
    font-size: 12px;
    font-weight: normal;
    color: #999;
  }
  .ivu-radio-wrapper {
    white-space: pre-wrap;
    font-size: 14px;
    font-weight: bold;
  }
  .ivu-radio-wrapper-checked {
    color: #e93248;
  }
  .pay_form {
    padding-top: 20px;
    .ivu-radio-group {
      width: 100%;
    }
    .form_price {
      padding: 0 30%;
    }
  }
  .payScan_tips {
    padding: 40px 5%;
  }
  .payScan_step_two {
    line-height: 30px;
    padding: 0 20%;
    .payScan_step_two_top {
      .right {
        p {
          &:first-child {
            font-size: 18px;
            color: rgb(34, 172, 56);
          }
        }
        .order {
          color: #aaa;
          span {
            color: #00a0e9;
          }
        }
        .price {
          color: #aaa;
          span {
            color: #e33939;
          }
        }
      }
    }
    .payScan_step_two_middle {
      text-align: center;
      p {
        color: rgb(34, 172, 56);
      }
      img {
        border: 1px solid #ddd;
        width: 200px;
        height: 200px;
      }
    }
    .payScan_step_two_bottom {
      text-align: center;
      .ivu-btn {
        &:last-child {
          margin-left: 40px;
        }
      }
    }
  }
}
</style>
