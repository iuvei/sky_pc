<template>
  <div class="main">
    <!-- sidebar -->
    <gameSidebar class="sidebar"></gameSidebar>
    <!-- main -->
    <div class="content">
      <!-- 欢迎提示 -->
      <div class="top">
        Hi, 欢迎来到购彩大厅
      </div>
      <!-- 子路由 -->
      <nuxt-child :key="$route.fullpath" class="game-view" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import gameSidebar from '~/components/game/sidebar';
;
export default {
  layout: 'gameCenter',
  name: 'gameCenter',
   
  data() {
    return {};
  },
  components: { gameSidebar },
  computed: {
  },
  methods: {
    ...mapActions('game', ['getGameListAtin'])
  },
  async created() {
    if(!process.browser) return
    if(process.env.static) await this.$store.dispatch("game/getGameListAtin");
  },
  async asyncData({ store }) {
    if(process.env.static) return
    return await store.dispatch('game/getGameListAtin');
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  min-width: 1200px;
  .sidebar {
    width: 205px;
  }
  .content {
    flex: 1;
    margin-top: 1px;
    background-color: #ececec;
    overflow-x: hidden;
    .top {
      height: 37px;
      display: flex;
      // justify-content: ;
      align-items: center;
      padding-left: 40px;
      border: 1px solid #cacaca;
      border-left: none;
      background: url('~assets/img/game/broadcast.png') no-repeat 20px center;
      background-color: #fff5f5;
      color: #3a3a3a;
      font-size: 12px;
    }
  }
}
</style>

<style lang="scss">
@import '~/components/game/style/animate.scss';
.main {
  .fadeInLeftBig {
    animation: fadeInLeftBig 1s ease-out;
  }
  .fadeInDownBig {
    animation: fadeInDownBig 1s ease-out;
  }
  .fadeInDown {
    animation: fadeInDown 1s ease-out;
  }
  .fadeInRight {
    animation: fadeInRightBig 0.5s ease-out;
  }
  .fadeInRightBig {
    animation: fadeInRightBig 1s ease-out;
  }
  .shake {
    animation: shake 1s ease-out;
  }
}
</style>

