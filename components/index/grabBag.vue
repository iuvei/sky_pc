<template>
  <div class="GB" :class="{right:position==='rightss'}">
    <!-- <div class="grab_bag" @click="grabclose" v-show="sysInfo.event_gift == 1 && this.$store.state.userinfo.isLogin"> -->
    <div class="grab_bag" v-show="sysInfo.event_gift == 1">
      <div class="icon_btn" v-drag></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'index-grabBag',
  props: {
    showType: {
      default: []
    },
    position: {
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters('sysinfo', ['sysInfo']),
    // ...mapGetters('userinfo', ['isLogin'])
    ...mapState('userinfo', ['accountInfo']),
    ...mapState({
      accountInfo: state => state.userinfo.accountInfo
    }),
    isTestUser() {
      return this.accountInfo.test === 2
    }
  },
  methods: {
    ...mapActions('userinfo', ['isLogin']),
    grabclose() {
      window && window.open('/redenvelope')
      // if (this.userinfo.accountInfo.test === 2) {
      //   this.$Message.warning('抱歉!试玩账号不能参与本活动!')
      // }
      // if (!this.$store.state.userinfo.isLogin) {
      //   this.$Message.warning('请先登录账号再参与本活动')
      // } else {
      // window && window.open('/redenvelope')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.GB {
  position: fixed;
  z-index: 1000;
  width: 110px;
  height: 140px;
  box-sizing: border-box;
  top: 590px;
  left: 50%;
}

.GB .grab_bag {
  position: relative;
}
.GB .grab_bag .icon_btn {
  right: 10px;
  top: 590px;
  width: 110px;
  height: 140px;
  line-height: 140px;
  // border: 1px solid red;
  background-image: url('~/assets/img/rob/redbag1.png');
  // background-size: cover;
  position: fixed;
  // margin-left: 520px;
}
</style>
