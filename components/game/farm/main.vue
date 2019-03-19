<template>
  <div class='farm-main'>
    <commonMenu
      :playConfig="menuPlayConfig"
      :hideDouble='true'
      :animateKey='animateKey'
      class="ssc"
    ></commonMenu>
    <commonBet
      :playObj="playObj"
      :animateKey='animateKey'
    >
      <betArea slot='area'></betArea>
    </commonBet>
    <commonCart></commonCart>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import commonMenu from '../common/commonMenu'
import commonBet from '../common/commonBet'
import commonCart from '../common/commonCart'
import betArea from './betArea'

export default {
  name: 'farmMain',
  props: ['item'],
  components: { commonMenu, commonBet, betArea, commonCart },
  data() {
    return {
      menuPlayConfig: []
    }
  },
  computed: {
    ...mapState('gameBet', ['playObj']),
    animateKey() {
      return (this.$route.params.id || this.$route.query.id) + this.playObj.playid
    }
  },
  methods: {
    ...mapActions('game', ['getGamePlayConfig']),
    async getInitData() {
      this.$store.commit('game/setGameId', this.$route.params.id || this.$route.query.id)
      this.$store.commit('game/setGameItem', this.item)
      let ret = await this.getGamePlayConfig(this.item.js_tag)
      // this.menuPlayConfig = ret.list.filter(item => item.showofficial == 1);
      this.menuPlayConfig = ret.list
    }
  },
  created() {
    if(!process.browser) return
    this.$store.commit('gameBet/setBetPlay', {})
  },
  mounted() {
    this.getInitData()
  },
  watch: {
    // 监控路由变化
    '$route.params.id'(val) {
      this.getInitData()
    }
  }
}
</script>
<style lang='scss' scoped>
.farm-main {
  min-height: 500px;
  margin-top: 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
</style>
<style lang='scss'>
.farm-main {
  .common-menu .bet-menu {
    // background: url(~/assets/img/game/pk10/header_bg.png) repeat top center;
    // background-size: auto 100%;
    border-radius: 26px;
    height: 58px !important;
    transform: translateY(-18px);
    background: #fff !important;
    box-shadow: 4px 4px 1px rgba(183, 183, 183, 0.75),
      -4px 4px 1px rgba(183, 183, 183, 0.75);
    .left {
      padding-left: 20px;
      > div {
        border-radius: 60px;
        font-size: 16px;
        height: 40px !important;
        line-height: 40px !important;
        width: 120px;
        text-align: center;
        margin-right: -5px !important;
        &:hover,
        &.active {
          background: #e93248;
          color: #fff;
        }
      }
    }
    .right {
      > div {
        span {
          border: 1px solid rgb(236, 236, 236);
        }
      }
    }
  }
  .common-bet .bet-tool .multiple-group {
    .odds {
      width: auto !important;
    }
  }
}
</style>
