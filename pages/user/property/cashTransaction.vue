<template>
  <component :is="getCashView"></component>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import addBank from "~/components/user/agent/cashTransaction/addBank";
import cashTransaction from "~/components/user/agent/cashTransaction/cashTransaction";
import confirmation from "~/components/user/agent/cashTransaction/confirmation";
import success from "~/components/user/agent/cashTransaction/success";
export default {
  name: "user-cash-trade",
  data() {
    return {};
  },
  components: {
    addBank,
    cashTransaction,
    confirmation,
    success
  },
  computed: {
    ...mapState("userinfo", ["accountInfo"]),
    ...mapState("agent", ["cashTransaction"]),
    ...mapGetters("agent", ["getCashView"]),
    currentView: {
      get() {
        return this.cashTransaction.view;
      },
      set(v) {
        let obj = { prefix: "cashTransaction", params: { view: v } };
        this.modifyField(obj);
      }
    }
  },
  mounted() {
    let obj = {
      prefix: "cashTransaction",
      params: { view: "cashTransaction" }
    };
    this.modifyField(obj);
  },
  methods: {
    ...mapActions("agent", ["modifyField"]),
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
    margin-left: 220px;
    .intro_word_that_srzh {
      width: 400px;
      height: 200px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px #dbdbdb;
      .intro_word_that_srzh_left {
        margin-right: 5px;
      }
    }
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
