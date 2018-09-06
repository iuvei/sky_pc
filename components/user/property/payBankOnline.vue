<template>
  <Row class="payBankOnline_main_body">
    <Steps :current="current" class="online_steps">
      <Step :title="current==0 ? txt[1] : txt[2]" content="请选择您欲转入的银行卡号"></Step>
      <Step :title="current==1 ? txt[1] : current > 1 ? txt[2] : txt[0]" content="请选择您使用的银行"></Step>
      <Step :title="current==2 ? txt[1] : current > 2 ? txt[2] : txt[0]" content="填写您的转账资料"></Step>
      <Step :title="current==3 ? txt[1] : current > 3 ? txt[2] : txt[0]" content="提交完成"></Step>
    </Steps>
    <Row class="payBankOnline_main_content">
      <Row class="step_one" v-show="current==0">
        <Row>
          <Col :span="11" v-for="(item, index) in basicData" :key="index" :offset="index%2 !== 0 ? 2 : 0" style="margin-bottom: 20px">
          <Card @click.native="choosedOne(item, index)" :class="{active: acIndex==index}">
            <Row>
              <Col :span="8">开户行网点：</Col>
              <Col :span="14" :offset="2" class="open-place" :title="item.bank_home">{{item.bank_home}}</Col>
              <Col :span="8">收款人：</Col>
              <Col :span="14" :offset="2">{{item.real_name}}</Col>
              <Col :span="8">银行：</Col>
              <Col :span="14" :offset="2">{{item.bank_type}}</Col>
              <Col :span="8">账号：</Col>
              <Col :span="14" :offset="2">{{item.bank_card}}</Col>
            </Row>
          </Card>
          </Col>
        </Row>
        <Row class="tips">
          <p>{{choosedData.pc_tip}}</p>
          <Button size="large" type="primary" @click.native="oneToNext" :disabled="acIndex<0" :loading="loadingOne">下一步
            <Icon type="chevron-right"></Icon>
          </Button>
        </Row>
        <Row class="bottom_tips">
          <div v-html="PayPCtips"></div>
        </Row>
      </Row>
      <Row class="step_two" v-show="current==1">
        <Form ref="formOne" :model="thisForm" :rules="ruleValidate" :label-width="80" class="this_form">
          <FormItem label="入款姓名" prop="name">
            <Input v-model="thisForm.name" placeholder="请输入真实姓名"></Input>
          </FormItem>
          <FormItem label="开户银行" prop="bank">
            <Select v-model="thisForm.bank" placeholder="请选择开户银行">
              <Option v-for="(item ,index) in bankList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="其他银行" prop="else" v-if="thisForm.bank=='else'">
            <Input v-model="thisForm.else" placeholder="请输入银行名称"></Input>
          </FormItem>
          <FormItem label="充值金额" prop="price">
            <Input v-model="thisForm.price" placeholder="请输入充值金额" number></Input>
          </FormItem>
          <Row class="tips">
            <p>{{choosedData.pc_tip}}</p>
            <Row class="bottom_button">
              <Button type="primary" @click.native="current-=1" style="margin-right:40px;" size="large">
                <Icon type="chevron-left"></Icon>上一步</Button>
              <Button type="primary" @click.native="twoToNext">下一步
                <Icon type="chevron-right" size="large"></Icon>
              </Button>
            </Row>
          </Row>
        </Form>
      </Row>
      <Row class="step_three" v-show="current==2">
        <p>
          <i style="color:#e33939;">*</i>以下是您欲转账的银行账户信息</p>
        <Row class="up_table">
          <Col :span="12">
          <span>开户行网点：</span>
          <span>{{choosedData.bank_home}}</span>
          </Col>
          <Col :span="12">
          <span>收款人：</span>
          <span>{{choosedData.real_name}}</span>
          </Col>
          <Col :span="12">
          <span>银行：</span>
          <span>{{choosedData.bank_type}}</span>
          </Col>
          <Col :span="12">
          <span>账号：</span>
          <span>{{choosedData.bank_card}}</span>
          </Col>
          <Col :span="24">
          <span>有效时间：</span>
          <span>{{validTime | formatTimer}}</span>
          </Col>
        </Row>
        <Row class="down_box">
          <p>
            <i style="color:#e33939;">*</i>接下来您可以通过以下方式完成转帐...</p>
          <Row class="down_title">
            <Col :span="4" :offset="4">请选择开户银行：</Col>
            <Col :span="6">
            <Select v-model="choosedStepThreeBank">
              <Option v-for="(item, index) in stepThreeBank" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col :span="6" :offset="1">
            <Button type="primary" class="jump_button">
              <a :href="choosedStepThreeBank" target="_blank">前往官网</a>
            </Button>
            </Col>
          </Row>
          <Row class="down_form">
            <Col :span="24">
            <Form :model="thatForm" :rules="thatFormRule" :label-width="120" ref="formTwo">
              <FormItem label="入款姓名">
                <Input v-model="thatForm.name" disabled></Input>
              </FormItem>
              <FormItem label="开户银行">
                <Input v-model="thatForm.bank" disabled></Input>
              </FormItem>
              <FormItem label="存入金额">
                <Input v-model="thatForm.price" disabled></Input>
              </FormItem>
              <FormItem label="存入时间" prop="date">
                <DatePicker type="datetime" placeholder="请选择日期" @on-change="setDate" :value="thatForm.date" format="yyyy-MM-dd HH:mm:ss" :options="disableOptions"></DatePicker>
              </FormItem>
            </Form>
            </Col>
          </Row>
          <p>※1.请确实填写转帐金额与时间。</p>
          <p>※2.每笔转帐请提交一次。</p>
          <p>※3.若您使用ATM存款，请填写ATM所属分行，会加快您的款项到帐时间。</p>
        </Row>
        <Row class="bottom_button">
          <Button size="large" type="primary" @click="current-=1">
            <Icon type="chevron-left"></Icon>上一步</Button>
          <Button size="large" type="primary" @click.native="havePaied" :loading="loadingTwo">我已付款
            <Icon type="chevron-right" size="large"></Icon>
          </Button>
        </Row>
      </Row>
      <Row class="step_four" v-show="current==3">
        <p>
          <i style="color: #e33939">*</i>您的存款申请已成功提交!以下是您的存款资料，请妥善保存。</p>
        <Row class="order_info">
          <Col :span="12">存入银行：</Col>
          <Col :span="12">{{result.bank_type}}</Col>
          <Col :span="12">存入金额：</Col>
          <Col :span="12">{{result.pay_price}}</Col>
          <Col :span="12">存入时间：</Col>
          <Col :span="12">{{thatForm.date + ' ' + thatForm.time}}</Col>
          <Col :span="12">您使用的银行：</Col>
          <Col :span="12">{{thatForm.bank}}</Col>
          <Col :span="12">存款人姓名：</Col>
          <Col :span="12">{{thatForm.name}}</Col>
          <Col :span="12">订单号：</Col>
          <Col :span="12">{{result.order}}</Col>
        </Row>
        <p>※1.同行转帐:完成转帐后请于30分钟内查收您的会员账号余额，如未加上请联系在线客服。</p>
        <p>※2.跨行转帐:银行不承诺跨行汇款到帐时间， 如您的款项在24小时内未加上， 烦请您联系在线客服为您提供帮助。</p>
        <Row class="bottom_button">
          <Button size="large" type="primary" @click="current=0">离开此页
            <Icon type="log-out"></Icon>
          </Button>
        </Row>
      </Row>
    </Row>
  </Row>
</template>
<script>
import { mapState, mapActions } from "vuex";
import to from "../../../api/await-to";
import dayjs from 'dayjs';
export default {
  props: ["basicData"],
  filters: {
    formatTimer(val) {
      if (val === 0) {
        return "支付信息已过期";
      }
      let s = val % 60 > 9 ? val % 60 : "0" + val % 60,
        m = Math.floor(val / 60);
      return `${m}:${s}`;
    }
  },
  data() {
    return {
      disableOptions: {
        disabledDate (date) {
          let nowTime = dayjs(Date.now()).format('YYYY-MM-DD 00:00')
          // console.log(nowTime)
          return date && date.valueOf() < (dayjs(nowTime) - 1000 * 60 * 60 * 24 * 2) || (date.valueOf() > dayjs(nowTime) + 1000 * 60 * 60 * 24 - 1000);
        }
      },
      current: 0,
      txt: ["待进行", "进行中", "已完成"],
      acIndex: -1,
      choosedData: {},
      loadingOne: false,
      loadingTwo: false,
      thisForm: {
        name: "",
        bank: "",
        else: "",
        price: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请填写入款姓名" }],
        bank: [{ required: true, message: "请选择入款银行" }],
        else: [{ required: true, message: "请填写其他银行名称" }],
        price: [
          { required: true, message: "请填写入款金额" },
          { type: "number", message: "请填写正确入款金额" }
        ]
      },
      bankList: [],
      stepThreeBank: [
        { value: "http://www.95599.cn/cn/", label: "中国农业银行" },
        { value: "http://www.ccb.com/", label: "中国建设银行" },
        { value: "http://www.icbc.com.cn/icbc/", label: "中国工商银行" },
        { value: "http://www.cmbchina.com/", label: "中国招商银行" },
        { value: "http://www.boc.cn/", label: "中国银行" },
        {
          value: "http://www.psbc.com/cn/index.html",
          label: "中国邮政储蓄银行"
        },
        { value: "http://www.cmbc.com.cn/", label: "中国民生银行" },
        { value: "http://www.citicbank.com/", label: "中信银行" },
        { value: "http://www.cebbank.com/", label: "中国光大银行" },
        { value: "http://www.cib.com.cn/cn/index.html", label: "兴业银行" },
        { value: "http://www.hxb.com.cn/home/cn/", label: "华夏银行" },
        { value: "http://www.bankofbeijing.com.cn/", label: "北京银行" },
        { value: "http://www.spdb.com.cn/", label: "浦发银行" },
        { value: "http://www.cgbchina.com.cn/", label: "广发银行" },
        { value: "http://bank.pingan.com/index.shtml", label: "平安银行" }
      ],
      choosedStepThreeBank: "http://www.95599.cn/cn/",
      thatForm: {
        name: "",
        bank: "",
        price: "",
        time: "",
        date: ""
      },
      thatFormRule: {
        date: [{ required: true, message: "请选择转账时间" }],
        time: [{ required: true, message: "请选择转账时间" }]
      },
      validTime: 1800,
      timer: Function,
      result: {}
    };
  },
  methods: {
    ...mapActions("property", ["getBankList", "submitPayCompany"]),
    choosedOne(n, i) {
      this.acIndex = i;
      this.choosedData = n;
    },
    async oneToNext() {
      this.loadingOne = true;
      let [err, list] = await to(this.getBankList());
      if (list) {
        this.bankList = list;
        this.current += 1;
      }
      this.loadingOne = false;
    },
    twoToNext() {
      this.$refs.formOne.validate(valid => {
        if (valid) {
          this.thatForm.name = this.thisForm.name;
          this.thatForm.bank = this.bankList.find(
            item => item.id == this.thisForm.bank
          ).name;
          this.thatForm.price = this.thisForm.price;
          this.current += 1;
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.validTime--;
            if (this.validTime == 0) {
              clearInterval(this.timer);
            }
          }, 1000);
        }
      });
    },
    havePaied() {
      this.loadingTwo = true;
      this.$refs.formTwo.validate(async valid => {
        if (valid) {
          let params = {
            price: this.thisForm.price,
            pay_id: this.choosedData.id,
            card_name: this.thisForm.name,
            bank_type: this.thisForm.bank,
            time: this.thatForm.date
          };
          let [err, res] = await to(this.submitPayCompany(params));
          if (res) {
            this.result = res;
            this.current += 1;
          }
          this.loadingTwo = false;
        } else {
          this.loadingTwo = false
        }
      });
    },
    setDate(val, type) {
      this.thatForm.date = val;
    }
  },
  computed: {
    ...mapState("property", ["payTips"]),
    PayPCtips() {
      let temp = document.createElement("div");
      temp.innerHTML = this.payTips.bank_step || "";
      let output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    }
  }
};
</script>
<style lang="scss">
.open-place {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.payBankOnline_main_body {
  padding: 10px 20px;
  .online_steps {
    margin-bottom: 20px;
  }
  .payBankOnline_main_content {
    padding: 10px 20px;
    .step_one {
      padding: 10px 20px;
      .active {
        border: 1px dashed #e33939;
      }
      .tips {
        text-align: center;
        > p {
          padding: 20px;
        }
      }
      .bottom_tips {
        padding: 20px;
      }
    }
    .step_two {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .this_form {
        width: 50%;
      }
      .tips {
        text-align: center;
        > p {
          padding: 20px;
        }
      }
    }
    .step_three {
      // display:flex;
      // flex-direction: column;
      // align-items: center;
      line-height: 30px;
      .up_table {
        border: 1px solid #ddd;
        border-bottom: none;
        .ivu-col {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          &:nth-child(even) {
            border-left: 1px solid #ddd;
          }
          span {
            &:nth-child(2) {
              color: #e33939;
            }
          }
        }
      }
      .down_box {
        .down_title {
          padding: 10px 40px;
          margin-bottom: 50px;
          border-bottom: 1px solid #ddd;
          .jump_button {
            a {
              color: #fff;
            }
          }
        }
        .down_form {
          border: 1px solid #ddd;
          padding: 10px 20%;
        }
        p {
          &:last-child {
            border-bottom: 1px solid #ddd;
          }
        }
      }
      .bottom_button {
        text-align: center;
        padding: 40px 20% 0 20%;
        .ivu-btn {
          // width: 80px;
          // display: flex;
          // justify-content: center;
          &:first-child {
            margin-right: 40px;
          }
        }
      }
    }
    .step_four {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 40px 20%;
      > p {
        line-height: 30px;
        text-align: center;
      }
      .order_info {
        border: 1px solid #e33939;
        padding: 20px;
        line-height: 30px;
        .ivu-col {
          &:nth-child(odd) {
            text-align: right;
          }
        }
      }
      .bottom_button {
        text-align: center;
      }
    }
  }
}
</style>

