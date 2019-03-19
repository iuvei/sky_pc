<template>
  <div class='lhc-main'>
    <commonMenu :playConfig="menuPlayConfig" class="lhc" :hideDouble="true"></commonMenu>
    <lhcBet :playObj="playObj">
      <betArea slot='area'></betArea>
    </lhcBet>
    <commonCart></commonCart>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import commonMenu from '../common/commonMenu';
import lhcBet from './lhcBet';
import commonCart from '../common/commonCart';
import betArea from './betArea';
import { setBallList } from './field.js';

export default {
  name: 'lhcMain',
  props: ['item'],
  components: { commonMenu, lhcBet, betArea, commonCart },
  data() {
    return {
      menuPlayConfig: []
    };
  },
  computed: {
    ...mapState('gameBet', ['playObj']),
    betSelectSet() {
      return setBallList(this.playObj.playid || 1);
    }
  },
  methods: {
    ...mapActions('game', ['getGamePlayConfig']),
    async getInitData() {
      this.$store.commit('game/setGameId', this.$route.params.id || this.$route.query.id);
      this.$store.commit('game/setGameItem', this.item);
      let ret = await this.getGamePlayConfig(this.item.js_tag);
      this.menuPlayConfig = ret.list;
    },
    isBall() {
      const flag = [
        3,
        8,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35
      ].includes(this.playObj.playid);
      this.$store.commit('gameBet/setLhcPlay', flag);
      return flag;
    }
  },
  mounted() {
    this.getInitData();
    this.isBall();
  },
  watch: {
    '$route.params.id'(val) {
      this.getInitData();
    },
    'playObj.playid'(val) {
      this.isBall();
    }
  }
};
</script>
<style lang='scss' scoped>
.lhc-main {
  min-height: 500px;
  margin-top: 40px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
</style>

<style lang='scss'>
.lhc-main {
  .common-menu {
    .bet-menu {
      .left {
        width: auto !important;
      }
    }
  }
  .left {
    width: auto !important;
  }
}
.lhc-main .common-menu .bet-menu {
  border-radius: 26px !important;
  height: 58px !important;
  -webkit-transform: translateY(-18px);
  transform: translateY(-18px) !important;
  background: #fff !important;
  -webkit-box-shadow: 4px 4px 1px rgba(183, 183, 183, 0.75),
    -4px 4px 1px rgba(183, 183, 183, 0.75);
  box-shadow: 4px 4px 1px rgba(183, 183, 183, 0.75),
    -4px 4px 1px rgba(183, 183, 183, 0.75);
}

.lhc-main .common-menu .bet-menu .left > div {
  border-radius: 60px;
  font-size: 16px;
  height: 40px !important;
  line-height: 40px !important;
  min-width: 100px;
  padding: 0 10px !important;
  text-align: center;
  margin-right: -5px !important;
}
.lhc-main .common-menu .bet-menu .left > div:hover,
.lhc-main .common-menu .bet-menu .left > div.active {
  background: #e93248 !important;
  color: #fff;
}
.lhc-main .common-menu .bet-menu .left {
  padding-left: 20px;
}
</style>
