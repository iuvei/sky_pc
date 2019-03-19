<template>
  <div class='k3-main'>
    <commonMenu
      :playConfig="menuPlayConfig"
      :hideDouble='true'
      :animateKey='animateKey'
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
  name: 'k3Main',
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
      this.menuPlayConfig = ret.list
    }
  },
  created() {
    if(!process.browser) return
    this.$store.commit('gameBet/setBetPlay', {})
  },
  async mounted() {
    await this.getInitData()
  },
  watch: {
    // 监控路由变化
    async '$route.params.id'(val) {
      await this.getInitData()
    }
  }
}
</script>
<style lang='scss' scoped>
.k3-main {
  min-height: 500px;
  margin-top: 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
</style>
