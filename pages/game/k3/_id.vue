<template>
  <div class='k3'>
    <gameHead
      :item='item'
      v-if="item"
    ></gameHead>
    <k3Main
      :item="item"
      v-if="item"
    ></k3Main>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import gameHead from '~/components/game/gameHead';
import k3Main from '~/components/game/k3/main';
export default {
  name: 'k3',
  components: { gameHead, k3Main },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem();
    }
  },
  methods: {
    initItem() {
      const gameId = this.$route.params.id || this.$route.query.id;
      return this.gameList.find(item => item.game_id == gameId);
    }
  }
};
</script>
<style lang='scss' scoped>
.k3 {
  width: 1000px;
  margin: 20px auto 0;
  background-color: #ececec;
}
</style>