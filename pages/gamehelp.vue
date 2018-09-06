<template>
    <div class="gamehelp wrap">
        <!-- 主体内容 -->
        <sidebarplay class="left_list"></sidebarplay>
        <div class="right_top">
            <div class="right_top_top">
                <span class="right_top_icon"></span>
                <span class="right_top_title">{{$route.query.game_name}}</span>
            </div>
            <nuxt-child/>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import sidebarplay from "~/components/gamehelp/sidebarplay.vue";
export default {
  name: "gamehelp",
  serverCacheKey() {
    return Math.floor(Date.now() / 1000 * 60 * 60 * 24);
  },
  components: {
    sidebarplay
  },
  data() {
    return {};
  },
  computed: {},

  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.gamehelp {
  display: flex;
  .left_list {
    width: 230px;
  }
  .right_top {
    flex: 1;
    margin-left: 20px;
    .right_top_top {
      width: 100%;
      height: 80px;
      margin-top: 15px;
      border: 1px solid #cacaca;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right_top_icon {
        width: 163px;
        height: 78px;
        background-image: url("~/assets/img/game_help_title.jpg");
      }
      .right_top_title {
        font-size: 30px;
        margin-right: 20px;
      }
    }
  }
}
</style>


