<template>
  <div class='qxc-main'>
    <commonMenu
      :playConfig="menuPlayConfig"
      class="cp11x5"
      :animateKey='animateKey'
    ></commonMenu>
    <commonBet
      :playObj="playObj"
      :hideDouble='true'
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
// import getField from './field.js'

export default {
  name: 'qxcMain',
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
    // betSelectSet() {
    //   let a = getField(this.playObj.playid || 1)
    //   console.log('aaaaaa', a)
    //   return a
    // }
  },
  methods: {
    ...mapActions('game', ['getGamePlayConfig']),
    async getInitData() {
      this.$store.commit('game/setGameId', this.$route.params.id || this.$route.query.id)
      this.$store.commit('game/setGameItem', this.item)
      let ret = await this.getGamePlayConfig(this.item.js_tag)
      // this.menuPlayConfig = ret.list
      // this.menuPlayConfig = ret.list.filter(item => item.showofficial == 1);
      this.menuPlayConfig = ret.list
      // 日后有用，不要删
      // let item = this.menuPlayConfig.filter(item => item.menuid == 53);
      // let arr = ['万、千', '万、百', '万、拾', '万、个', '千、百', '千、十', '千、个', '百、十', '百、个', '拾、个']
      // for(let i = 0; i < 10; i ++) {
      //   item[0].playlist[0].playname = arr[i]
      //   item[0].playlist.push(item[0].playlist[0])
      // }
      // item[0].playlist.splice(0, 1)
      // console.log(this.menuPlayConfig)
    }
  },
  mounted() {
    this.getInitData()
  },
  watch: {
    '$route.params.id'(val) {
      this.getInitData()
    }
  }
}
</script>
<style lang='scss' scoped>
.qxc-main {
  min-height: 500px;
  margin-top: 40px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
</style>

<style lang='scss'>
.qxc-main {
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
          // background: url(~/assets/img/game/pk10/header_active.png) no-repeat top
          // center !important;
          background: rgb(233, 50, 72) !important;
          color: #fff;
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
</style>
