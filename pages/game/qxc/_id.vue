<template>
  <div class='xy-qxc'>
    <gameHead
      :item='item'
      v-if="item"
    ></gameHead>
    <qxcMain
      :item="item"
      v-if="item"
    ></qxcMain>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import gameHead from '~/components/game/gameHead'
import qxcMain from '~/components/game/qxc/main'
export default {
  name: 'qxc',
  components: { gameHead, qxcMain },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem()
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    initItem() {
      return this.gameList.find(item => item.game_id == (this.$route.params.id || this.$route.query.id))
    }
  }
}
</script>
<style lang='scss' scoped>
.xy-qxc {
  width: 1000px;
  margin: 20px auto 0;
  overflow-x: hidden;
}
</style>
