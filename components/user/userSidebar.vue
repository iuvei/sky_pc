<template>
  <section class="sidebar-c">
    <div
      v-for="(item,key) in category"
      :key="key"
      class="item"
    >
      <div
        class="item-title"
        @click="toggle(key)"
      >
        <div
          class="icon"
          :class="item.icon"
        ></div>
        <div>{{item.title}}</div>
        <div
          class="arrow"
          :class="{'close':!collapse[key]}"
        ></div>
      </div>
      <ul v-toggle="collapse[key]">
        <div
          v-for="(v,k) in item.li"
          :key="k"
          @click="toGo(item,v)"
          v-damon="[v.label, profit_status]"
        >
          <li :class="{active:liActive===('/user/'+item.icon+'/'+v.url)}">{{v.label}}</li>
        </div>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import category from './userSidebarData.js'
import { toggle } from '~/directives/user/index'
export default {
  name: 'userSidebar',
  data() {
    return {
      category,
      collapse: new Array(category.length).fill(true)
    }
  },
  directives: {
    toggle: toggle,
    damon: {
      bind(el, { value }) {
        if (value[0] === '今日盈亏' && !value[1]) {
          el.style.display = 'none'
        }
      },
      update(el, { value }) {
        if (value[0] === '今日盈亏' && !value[1]) {
          el.style.display = 'none'
        }
      }
    }
  },
  computed: {
    ...mapState('sysinfo', ['sysinfo']),
    // 判断是否显示今日盈亏
    profit_status() {
      const profit_status =
        this.sysinfo[0] && this.sysinfo[0].profit_status == 1
      return profit_status
    },
    liActive() {
      return this.$route.path
    },
    rebate() {
      return this.$store.state.userinfo.accountInfo.rebate ? 1 : 0
    }
  },
  methods: {
    toggle(key) {
      this.$set(this.collapse, key, !this.collapse[key])
      // if (this.keyActive.includes(key)) {
      //   this.keyActive.splice(this.keyActive.indexOf(key), 1);
      // } else {
      //   this.keyActive.push(key);
      // }
    },
    toGo(i, v) {
      if (v.url == 'backwater' && this.rebate != 1) {
        this.$Message.warning('该活动暂未开放，敬请期待！')
        return
      } else {
        this.$router.push({
          name: 'user-' + i.icon + '-' + v.url
        })
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.collapse-transition {
  transition: 500 height ease-in-out, 500 padding-top ease-in-out,
    500 padding-bottom ease-in-out;
}
.sidebar-c {
  border: 1px solid #ddd;
  .item {
    width: 148px;
    // height: 31px;
    .item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      line-height: 35px;
      padding: 0 4px;
      background: #f3f3f3;
      font-size: 14px;
      color: rgba(79, 80, 80, 1);
      border-bottom: 1px Solid #d9d9d9;
      cursor: pointer;
      > div {
        text-align: center;
      }
      .icon {
        width: 30px;
        height: 30px;
        background: url('~assets/img/user_center_icons.png') no-repeat;
      }
      .arrow {
        width: 30px;
        height: 24px;
        background: url('~assets/img/select_arrow.png') center center no-repeat;
        background-size: 10px 10px;
        transition: all 0.5s;
      }
      .close {
        transform: rotate(90deg);
      }

      .acount {
        background-position: 0px 0px;
      }
      .betting {
        background-position: 0px -31px;
      }
      .promotion {
        background-position: -26px -60px;
      }
      .property {
        background-position: 0px -62px;
      }
      .agent {
        background-position: 0px -93px;
      }
      .message {
        background-position: 0px -124px;
      }
    }

    li {
      height: 31px;
      display: flex;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      color: #2c99e5;
    }
    .active {
      background: url(~assets/img/user_center_icons.png) no-repeat 15px -155px;
      color: #f13131;
    }
    ul {
      div {
        cursor: pointer;
      }
    }
  }
}
</style>


