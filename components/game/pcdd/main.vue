<template>
  <div class='pcdd-main'>
    <pcddBet
      :playConfig="menuPlayConfig"
      :animateKey='animateKey'
    ></pcddBet>
    <commonCart></commonCart>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import commonCart from '../common/commonCart';
import pcddBet from './pcddBet';

export default {
  name: 'pcddMain',
  props: ['item'],
  data() {
    return {
      menuPlayConfig: [],
    };
  },

  computed: {
    ...mapState('gameBet', ['playObj']),
    animateKey() {
      return (this.$route.params.id || this.$route.query.id) + this.playObj.playid;
    },
  },
  components: { commonCart, pcddBet },
  methods: {
    ...mapActions('game', ['getGamePlayConfig']),
    async getInitData() {
      this.$store.commit('game/setGameId', this.$route.params.id || this.$route.query.id);
      this.$store.commit('game/setGameItem', this.item);
      let ret = await this.getGamePlayConfig(this.item.js_tag);
      if(ret){
        this.menuPlayConfig = ret.list;
        this.$store.commit(
          'gameBet/setBetPlay',
          ret.list[0].submenu[0].playlist[0]
        );
      }
    },
  },
  created() {
    if(!process.browser) return
    this.$store.commit('gameBet/setBetPlay', {});
  },
  mounted() {
    this.getInitData();
  },
  watch: {
    // 监控路由变化
    '$route.params.id'(val) {
      this.getInitData();
    },
  },
};
</script>
<style lang='scss' scoped>
.pcdd-main {
  min-height: 500px;
  margin-top: 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  // height: 500px;
  // margin-top: 20px;
  // padding: 20px 15px;
}
</style>