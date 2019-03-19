<template>
  <Row>
    <Tabs v-model="currentId"
          @on-click="getPayBasicData">
      <TabPane :label="item.name"
               :name="item.id+''"
               v-for="(item, index) in basicData"
               :key="index"></TabPane>
    </Tabs>
    <component :is="currentView"
               :basicData="childrenData"
               :parentId="currentId"
               @defaultChoose="chooseFirst">
    </component>

    <Spin size="large"
          fix
          v-if="spinShow"></Spin>
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
      basicData: [],
      currentId: "",
      childrenData: [],
      spinShow: false
    };
  },
  methods: {
    ...mapActions("property", [
      "getRechargeType",
      "getPayTips",
      "getPayDataByUtype",
      "getBankList",
      "getCashState"
    ]),
    ...mapActions("user",["getUserBankCard"]),
    async getPayBasicData() {
      this.spinShow = true;
      let params = {
        type: this.currentId,
        https: window.location.protocol.indexOf("https") === 0 ? "1" : "0"
      };
      this.childrenData = [];
      this.childrenData = await this.getPayDataByUtype(params);
      console.warn(this.childrenData);
      this.spinShow = false;
    },
    chooseFirst() {
      this.currentId = this.basicData[0].id + "";
      this.getPayBasicData();
    }
  },
  async mounted() {
    // let isHasCard = await this.getUserBankCard();
    // console.log(isHasCard)
    // if (!isHasCard.length) {
    //   this.$Message.warning("您尚未绑定银行卡，请先绑定银行卡");
    //   this.$router.push("/user/account/bank");
    //   return false
    // }
    await this.getPayTips();
    this.basicData = await this.getRechargeType();
    this.currentId = this.basicData[0] && this.basicData[0].id + "";
    this.childrenData = await this.getPayDataByUtype({
      type: this.currentId * 1,
      https: window.location.protocol.indexOf("https") === 0 ? "1" : "0"
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
          return "quickPay";
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

