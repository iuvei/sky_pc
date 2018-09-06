<template>
  <Row class="quickPay_main_body">
    <p class="tip">选择支付渠道</p>
    <RadioGroup v-model="radioVal" style="width: 100%;">
      <Row>
        <Col :span="8" v-for="(item, index) in basicData" :key="index">
          <Radio :label="index">{{item.name}}</Radio>
        </Col>
      </Row>
      <Row class="qrcode">
        <img :src="basicData[radioVal].qrcode_url" alt="">
      </Row>
    </RadioGroup>
  </Row>
</template>
<script>
  export default {
    props: ['basicData', 'parentId'],
    data() {
      return {
        radioVal: 0
      }
    }
  }
</script>
<style lang="scss">
  .quickPay_main_body {
    padding: 20px;
    .tip {
      font-size: 18px;
      line-height: 30px;
    }
    .qrcode {
      width: 100%;
      padding: 40px;
      text-align: center;
      img {
        width: 300px;
        height: 300px;
      }
    }
  }
</style>

