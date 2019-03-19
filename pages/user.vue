<template>
  <div class="main">
    <userSidebar class="sidebar"></userSidebar>
    <div class="content">
      <div v-if="topIcon.label" class="top_instructions">
        <div v-if="topIcon.label == '今日盈亏'" class="left_icon_jryk"></div>
        <span v-else class="left_icon" :style="{'background-position':`${topIcon.iconPosition}`}"></span>
        <span>{{topIcon.label}}</span>
      </div>
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import userSidebar from '~/components/user/userSidebar.vue'
import category from '~/components/user/userSidebarData.js'
// import { find, compact } from 'lodash'
import find from 'lodash/find';
import compact from 'lodash/compact';
export default {
  layout: 'user',
  name: 'user',
  middleware: ['user-agent', 'guest'],
  data() {
    return {}
  },
  computed: {
    topIcon() {
      let s = compact(this.$route.path.split('/'))
      let item = find(category, o => o.icon === s[1])
      item = item || {}
      item = find(item.li, o => o.url === s[2])
      item = item || {}
      return item
    }
  },
  components: { userSidebar },
  methods: {
    ...mapActions('agent', ['isDailiVerify'])
  },
  mounted() {
    this.isDailiVerify()
  },
  fetch({ store }) {
    // 代理是否审核
    store.dispatch('agent/isDailiVerify')
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  .sidebar {
    width: 148px;
  }
  .content {
    flex: 1;
    margin-left: 25px;
    width: 0;
    .top_instructions {
      display: flex;
      width: 100%;
      line-height: 36px;
      font-size: 14px;
      color: #666;
      border: 1px solid #cccccc;
      background-color: #f3f3f3;
      text-align: left;
      margin-bottom: 20px;
      .left_icon {
        display: inline-block;
        width: 30px;
        height: 36px;
        background-image: url('~/assets/img/user_center_icons.png');
        background-repeat: no-repeat;
        background-position: 0px -212px;
      }
      .left_icon_jryk {
        display: inline-block;
        width: 28px;
        height: 24px;
        background-image: url('~/assets/img/todaywin.png');
        background-repeat: no-repeat;
        margin-top: 0.4375rem;
        margin-left: 0.625rem;
      }
    }
  }
}
</style>
