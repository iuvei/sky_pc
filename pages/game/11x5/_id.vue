<template>
  <div class='cp11x5'>
    <gameHead
      :item='item'
      v-if="item"
    ></gameHead>
    <cp11x5-main
      :item="item"
      v-if="item"
    ></cp11x5-main>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import gameHead from '~/components/game/gameHead';
import cp11x5Main from '~/components/game/11x5/main';
export default {
  name: 'cp11x5',
  components: { gameHead, cp11x5Main },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    initItem() {
      return this.gameList.find(item => item.game_id == (this.$route.params.id || this.$route.query.id))
    }
  }
};
</script>
<style lang='scss' scoped>
.cp11x5 {
  width: 1000px;
  margin: 20px auto 0;
}
</style>
