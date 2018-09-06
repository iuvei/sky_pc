<template>
  <Row>
    <Tabs v-model="currentId" @on-click="getPayBasicData">
      <TabPane :label="item.name" :name="item.id+''" v-for="(item, index) in basicData" :key="index"></TabPane>
    </Tabs>
    <component :is="currentView" :basicData="childrenData" :parentId="currentId" @defaultChoose="chooseFirst"></component>
  </Row>

</template>
<script>
import http from "~/api/http";
import { mapActions } from "vuex";
import payOnline from "~/components/user/property/payOnline";
import payBankOnline from "~/components/user/property/payBankOnline";
import payScan from "~/components/user/property/payScan";
import quickPay from "~/components/user/property/quickPay";
export default {
  components: {
    payOnline,
    payBankOnline,
    payScan,
    quickPay
  },
  data() {
    return {
      basicData: [
        // {
        //   code: "bank_app",
        //   icon: "quick_bank.png",
        //   id: 13,
        //   name: "在线支付",
        //   sort: 1,
        //   status: 0,
        //   type: 1
        // }
      ],
      currentId: "",
      // currentId: 12,
      childrenData: []
    };
  },
  methods: {
    ...mapActions("property", [
      "getRechargeType",
      "getPayTips",
      "getPayDataByUtype",
      "getBankList"
    ]),
    async getPayBasicData() {
      let params = { type: this.currentId,https:window.location.protocol.indexOf('https')==0?'1':'0' };
      this.childrenData = await this.getPayDataByUtype(params);
    },
    chooseFirst() {
      this.currentId = this.basicData[0].id + "";
      this.getPayBasicData();
    }
  },
  async mounted() {
    await this.getPayTips();
    this.basicData = await this.getRechargeType();
    this.currentId = this.basicData[0] && this.basicData[0].id + "";
    this.childrenData = await this.getPayDataByUtype({
      type: this.currentId * 1,
      https:window.location.protocol.indexOf('https')==0?'1':'0'
    });
    // console.log(this.currentValue)
  },
  computed: {
    currentView() {
      let currentId = this.currentId * 1;
      switch (currentId) {
        case 12: // 银联快捷
        case 2: // 微信
        case 7: // QQ
        case 4: // 支付宝
          return "payScan";
        case 1:
          return "payOnline";
        case 15:
          return "payBankOnline";
        case 6:
          return 'quickPay'
      }
    }
    // currentId() {
    //   let obj = this.basicData.find(item => item.name == this.currentValue)
    //   console.log(obj)
    //   if(obj && obj.id) {
    //     return obj.id
    //   } else {
    //     return 0
    //   }
    // }
  }
};
</script>
<style lang="scss">
</style>

