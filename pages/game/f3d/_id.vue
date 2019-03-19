<template>
  <div class='f3d'>
    <gameHead :item='item' v-if="item"></gameHead>
    <pcddMain :item="item"  v-if="item"></pcddMain>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import gameHead from '~/components/game/gameHead';
import pcddMain from '~/components/game/f3d/main';
export default {
  name: 'f3d',
  components: { gameHead, pcddMain },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    initItem() {
      let gameId = this.$route.params.id || this.$route.query.id;
      return this.gameList.find(item => item.game_id == gameId);
    }
  }
};
</script>
<style lang='scss' scoped>
.f3d {
  width: 1000px;
  margin: 20px auto 0;
}
</style>