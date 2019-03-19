<template>

  <div class='pk10'>
    <gameHead
      :item='item'
      v-if="item"
    ></gameHead>
    <pk10Main
      :item="item"
      v-if="item"
      class="container"
    ></pk10Main>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import gameHead from '~/components/game/pk10/PK10Head';
import pk10Main from '~/components/game/pk10/main';
export default {
  name: 'pk10',
  components: { gameHead, pk10Main },
  computed: {
    ...mapState('game', ['gameList']),
    item() {
      return this.initItem();
    }
  },
  methods: {
    ...mapActions('game', ['getCplogList', 'getKjCpLog']),
    initItem() {
      return this.gameList.find(item => item.game_id == (this.$route.params.id || this.$route.query.id));
    }
  }
};
</script>
<style lang='scss' scoped>
.pk10 {
  width: 1000px;
  margin: 20px auto 0;
}
</style>
<style lang='scss'>
.game-head .center-balls {
  .pk10-balls {
    .td {
      position: relative;
      span {
        width: 28px !important;
        height: 36px !important;
        border-radius: 2px;
        border: 3px solid rgb(193, 193, 193);
      }
      &:after {
        position: absolute;
        bottom: -32px;
        // left: 1px;
        line-height: 26px;
        display: block;
        border: 1px solid #b5b5b5;
        font-size: 14px;
        width: 26px;
        height: 26px;
        text-align: center;
        border-radius: 3px;
      }
      &:nth-child(1):after {
        content: '冠';
      }
      &:nth-child(2):after {
        content: '亚';
      }
      &:nth-child(3):after {
        content: '季';
      }
      &:nth-child(4):after {
        content: '四';
      }
      &:nth-child(5):after {
        content: '五';
      }
      &:nth-child(6):after {
        content: '六';
      }
      &:nth-child(7):after {
        content: '七';
      }
      &:nth-child(8):after {
        content: '八';
      }
      &:nth-child(9):after {
        content: '九';
      }
      &:nth-child(10):after {
        content: '十';
      }
    }
  }
}
</style>
