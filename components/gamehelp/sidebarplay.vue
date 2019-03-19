<template>
    <div class="gamehelp">
        <!-- 主体内容 -->
        <div class="container">
            <div class="help_to_play_tp">
            </div>
            <div class="help_to_play_czjs">
                <span>彩种介绍</span>
            </div>
            <div class="item" v-for="(item,key) in gameList.filter(x => x.type === 1)" :key="key" :class="{ active: activeName === item.game_name }" @click="selected(item)">
                <nuxt-link class="the_color_mc" :to="{path:'/gamehelp/tag/'+item.js_tag,query:{game_name:item.game_name}}">{{item.game_name}}</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'user',
  name: 'sidebarplay',
  components: {},
  data() {
    return {
      activeName: ''
    }
  },
  computed: {
    ...mapState('gamehelp', ['gametxt', 'gameList'])
  },
  directives: {},

  mounted() {
    this.activeName = this.$route.query.game_name
    this.getGameListAtinlist()
  },
  methods: {
    selected: function(item) {
      this.activeName = item.game_name
    },
    ...mapActions('gamehelp', ['getGameListAtin']),
    // 获取彩种列表
    async getGameListAtinlist(request = {}) {
      let obj = {}
      let ret = await this.getGameListAtin(request)
      ret.forEach(r => {
        Object.assign(obj, {
          [r.tag]: r.next
        })
      })
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
.gamehelp {
  margin-top: 15px;
  .container {
    .help_to_play_tp {
      width: 230px;
      height: 61px;
      border: 1px solid #cacaca;
      background-image: url('~/assets/img/help_menu_header.jpg');
    }
    .help_to_play_czjs {
      width: 230px;
      height: 46px;
      border-left: 1px solid #cacaca;
      border-right: 1px solid #cacaca;
      border-bottom: 1px solid #cacaca;
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        margin-left: 40px;
      }
    }
    .item {
      width: 230px;
      height: 35px;
      font-size: 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #cacaca;
      border-left: 1px solid #cacaca;
      border-right: 1px solid #cacaca;
      .the_color_mc {
        width: 100%;
        margin-left: 70px;
        color: #5e5959;
      }
    }
    .top_instructions {
      display: flex;
      width: 100%;
      line-height: 66px;
      font-size: 14px;
      color: #666;
      border: 1px solid #cccccc;
      background-color: #f3f3f3;
      text-align: left;
      margin-bottom: 20px;
      .left_icon {
        display: inline-block;
        width: 30px;
        height: 66px;
        background-image: url('~/assets/img/user_center_icons.png');
        background-repeat: no-repeat;
        background-position: 0px -212px;
      }
    }
    .active {
      background: #ff6600;
      .the_color_mc {
        color: #fff !important;
        font-size: 18px;
      }
    }
  }
}
</style>
