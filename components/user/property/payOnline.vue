<template>
  <Row class="payOnline_main_body">
    <Form :model="formData" :label-width="100" :rules="formRule" ref="thisForm">
      <FormItem label="选择银行" prop="bank">
        <Select v-model="formData.bank">
          <Option v-for="(item, index) in basicData" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="充值金额" prop="price">
        <Input v-model="formData.price" placeholder="请输入充值金额"></Input>
      </FormItem>
      <Row class="submit_button">
        <Button type="primary" size="large" @click.native="submitData">提交</Button>
      </Row>
    </Form>
    <p class="tips">支付遇问题？<a :href="sysinfo.service_url">点击联系在线客服</a></p>
    <form :action="dynamicFormData.url" :method="dynamicFormData.method" v-show="false" ref="payThirdForm" target="_blank">
      <input type="text" v-for="(val,key) in dynamicFormData.data" :key="key" :name="key" :value="val">
    </form>
  </Row>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import http from "~/api/http"
  export default {
    props: ['basicData'],
    data() {
      return {
        formData: {
          bank: '',
          price: ''
        },
        formRule: {
          bank: [{required: true, message: '请选择银行'}],
          price: [{required: true, message: '请输入充值金额'}]
        },
        choosedBank: '',
        dynamicFormData: []
      }
    },
    methods: {
      ...mapActions('property', ['submitThird']),
      submitData() {
        this.$refs.thisForm.validate(async (validate) => {
          if(validate) {
            const data = {
              price: this.formData.price,
              type: 1,
              subtype: this.formData.bank
            }
            let res = await this.submitThird(data)
            let recombine = res.data.split("&").map(r => {
              let obj = r.split("=>")
              return { [obj[0]]: obj[1] }
            })
            // console.log(recombine)
            this.dynamicFormData = {
              url: res.url.replace(/\\\//g, "/"),
              method: res.method,
              data: Object.assign(...recombine),
              qrcode: res.qrcode,
              money: res.price,
              showQrcode: true,
              show: true,
              dingdan: res.dingdan
            }
            // console.log(this.dynamicFormData)
            this.$nextTick(() => {
              this.$refs.payThirdForm.submit()
            })
          }
        })
      }
    },
    computed: {
      ...mapState('sysinfo', ['sysinfo'])
    }
  }
</script>
<style lang="scss">
.payOnline_main_body {
  width: 100%;
  padding: 5% 30%;
  .submit_button {
    text-align: center;
  }
  .tips {
    padding-top: 40px;
    font-size: 20px;
    text-align: center;
  }
}
</style>

