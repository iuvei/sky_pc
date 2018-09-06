<template>
    <!-- 现金交易页面 -->
    <div class="agent_that_that">
        <div class="top_content_that">
            <Icon type="ios-checkmark-empty" style="width:30px;font-size:50px;color:#0cef2d"></Icon>
            转账成功
        </div>
        <div class="intro_word_that">
            <p class="sub-title">转账详情</p>
            <div class="intro_word_that_srzh">
                <div class="intro_word_that_srzh_left">转入账号:</div>
                <div class="intro_word_that_srzh_right">{{tradeInfo.userName}}</div>
            </div>
            <div class="intro_word_that_srzh">
                <div class="intro_word_that_srzh_left">转账金额:</div>
                <div class="intro_word_that_srzh_right">{{tradeInfo.price}}</div>
            </div>
            <div class="intro_word_that_srzh">
                <div class="intro_word_that_srzh_left">转账时间:</div>
                <div class="intro_word_that_srzh_right">{{tradeInfo.time}}</div>
            </div>
        </div>
        <div class="next_button">
            <Button class="next_button_button" type="error" @click="nextClick">
                返回继续转账
            </Button>
        </div>
        <nuxt/>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "cash-trade-success",
  data() {
    return {};
  },
  computed: {
    ...mapState("agent", ["cashTransaction"]),
    tradeInfo() {
      return { userName: this.cashTransaction.other, ...this.cashTransaction.tradeInfo };
    }
  },
  methods: {
    ...mapActions("agent", ["modifyField"]),
    nextClick() {
      this.modifyField({
        prefix: "cashTransaction",
        params: {
          view: "cashTransaction",
          other: "",
          otherInfo: {},
          tradeInfo: {}
        }
      });
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
    line-height: 50px;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 50px;
    border-bottom: solid 1px #dbdbdb;
    display: flex;
    .using_tips {
      color: rgb(12, 238, 132);
    }
    .again_to_determine {
      color: #ff7c34;
    }
  }
  .intro_word_that {
    margin-top: 40px;
    .sub-title {
      color: #434343;
      font-size: 14px;
      padding-left: 40%;
      padding-bottom: 10px;
    }
    .intro_word_that_srzh {
      width: 100%;
      height: 30px;
      font-size: 12px;
      color: #666666;
      display: flex;
      justify-content: center;
      align-items: top;
      .intro_word_that_srzh_left {
        width: 50%;
        text-align: right;
        padding-right: 10px;
      }
      .intro_word_that_srzh_right {
        flex: 1;
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
