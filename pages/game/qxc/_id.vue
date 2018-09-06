<template>
  <div class='qxc'>
    <gameHead :item='item'></gameHead>
    <!-- <sscMain :item="item"></sscMain> -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import gameHead from '~/components/game/gameHead'
import sscMain from '~/components/game/ssc/main'
export default {
  name: 'ssc',
  components: { gameHead, sscMain },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem()
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    initItem() {
      return (
        this.gameList.find(item => item.game_id == this.$route.params.id) || {}
      )
    }
  }
}
</script>
<style lang='scss' scoped>
.qxc {
  width: 1000px;
  margin: 20px auto 0;
  overflow-x: hidden;
}
</style>
