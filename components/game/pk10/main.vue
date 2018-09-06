<template>
  <div class='pk10-main'>
    <commonMenu :playConfig="menuPlayConfig" class="pk10"></commonMenu>
    <commonBet :playObj="playObj">
      <betArea slot='area'></betArea>
    </commonBet>
    <commonCart></commonCart>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import commonMenu from "../common/commonMenu";
import commonBet from "../common/commonBet";
import commonCart from "../common/commonCart";
import betArea from "./betArea";
import {getField} from "./field.js";

export default {
  name: "pk10Main",
  props: ["item"],
  components: { commonMenu, commonBet, betArea, commonCart },
  data() {
    return {
      menuPlayConfig: []
    };
  },
  computed: {
    ...mapState("gameBet", ["playObj"]),
    betSelectSet() {
      return getField(this.playObj.playid || 1);
    }
  },
  methods: {
    ...mapActions("game", ["getGamePlayConfig"]),
    async getInitData() {
      this.$store.commit("game/setGameId", this.$route.params.id);
      this.$store.commit("game/setGameItem", this.item);
      let ret = await this.getGamePlayConfig(this.item.js_tag);
      this.menuPlayConfig = ret.list;
    }
  },
  async mounted() {
    await this.getInitData();
  },
  watch: {
    "$route.params.id"(val) {
      this.getInitData();
    }
  }
};
</script>
<style lang='scss' scoped>
.pk10-main {
  min-height: 500px;
  margin-top: 40px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  // overflow-x: hidden;
}
</style>

<style lang='scss'>
.pk10-main {
  .common-menu .bet-menu {
    background: url(~/assets/img/game/pk10/header_bg.png) repeat top center;
    background-size: auto 58px !important;
    border-radius: 26px;
    height: 58px !important;
    transform: translateY(-18px);
    background-color: #fff !important;
    box-shadow: 4px 4px 1px rgba(183, 183, 183, 0.75),
      -4px 4px 1px rgba(183, 183, 183, 0.75);
    margin-top: 20px !important;
    border-radius: 50px !important;
    .left {
      padding-left: 20px;
      > div {
        font-size: 16px;
        height: 56px !important;
        line-height: 55px !important;
        width: 100px;
        text-align: center;
        margin-right: -5px !important;
        &:hover,
        &.active {
          background: transparent url(~/assets/img/game/pk10/header_active.png)
            no-repeat top center !important;
          color: #e93248 !important;
        }
      }
    }
    .right {
      > div {
        span {
          border: 1px solid rgb(236, 236, 236);
          &:first-child {
            border-right: none;
          }
        }
      }
    }
  }
}

.pk10 {
}
</style>
