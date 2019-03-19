<template>
  <section class="sidebar-c">
    <div
      class="home"
      @click="()=>{this.$router.push('/game')}"
    >购彩大厅</div>
    <div class="game-menu">
      <div
        v-for="(item,key) in data"
        :key="key"
        class="item"
      >
        <div
          class="item-title"
          @click="toggle(key,item.group)"
        >
          <div class="item-title-txt">
            <div :class="[`_${item.group}`,'icon']"></div>
            {{item.title}}
          </div>
          <div
            class="arrow"
            :class="{'open':openArr[key]}"
          ></div>
        </div>
        <AppCollapse
          :open="openArr[key]"
          class="app-collapse"
        >
          <li
            v-for="(v,k) in item.li "
            :key="k"
            :class="[{active:liActive==v.game_id},'li']"
            @click="goBetting(v)"
          >
            <img
              :src="v.icon"
              alt=""
            >
            <span>{{v.game_name}}</span>
          </li>
        </AppCollapse>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

let otherJsTag = ['qxc', 'pkniuniu', 'xypk', 'xync', 'tzyx']
export default {
  name: 'userSidebar',
  data() {
    return {
      openArr: new Array(9).fill(false)
    }
  },
  computed: {
    ...mapState('game', ['game2txt', 'gameList']),
    liActive() {
      return this.$route.path.split('/').pop()
    },
    data() {
      let obj = {
        otherJsTag: []
      }
      this.gameList.forEach(item => {
        if (!obj[item.js_tag]) {
          obj[item.js_tag] = []
        }
        obj[item.js_tag].push(item)
        if (otherJsTag.includes(item.js_tag)) {
          obj.otherJsTag.push(item)
        }
      })
      let data = Object.keys(this.game2txt).map(key => {
        return {
          title: this.game2txt[key],
          group: key,
          li: obj[key]
        }
      })
      return data
    }
  },
  methods: {
    ...mapActions('game', [
      'getGameListAtin',
      'setNowGameTag',
      'setShowAllGame'
    ]),
    toggle(key, js_tag) {
      this.setNowGameTag(js_tag)
      this.setShowAllGame(this.openArr[key])
      //左边siderbar关闭跳回/game目录
      if (this.openArr[key]) {
        this.$router.push('/game')
      }

      if (!this.openArr[key]) {
        this.openArr = new Array(9).fill(false)
      }
      this.$set(this.openArr, key, !this.openArr[key])
    },
    async togetGameListAtin() {
      this.data = await this.getGameListAtin()
    },
    goBetting(item) {
      if (item.js_tag === 'sport_key') {
        window.location.replace('/sport')
        return
      }
      let path = `/game/${item.js_tag}${process.env.static?'?id=':'/'}${item.game_id}`

      if (
        [
          'pcdd',
          '3d',
          'k3',
          'lhc',
          'pk10',
          'ssc',
          '11x5',
          'qxc',
          'pkniuniu',
          'xypk',
          'xync',
          'tzyx'
        ].includes(item.js_tag) &&
        item.enable !== 2
      ) {
        if (item.js_tag == '3d') {
          path = `/game/f3d${process.env.static?'?id=':'/'}${item.game_id}`
          this.$router.push(path)
          return
        }
        this.$router.push(path)
      } else {
        this.$Message.warning('彩种正在维护中')
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
  border-top-color: #cacaca;
  background: #fff;
  margin-right: 5px;
  // box-shadow: 5px 0px 4px #d0d0d0;
  z-index: 1;
  .home {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    text-align: center;
    background: url('~assets/img/touzhu_home.png') no-repeat 20px center;
    background-color: #e94335;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .app-collapse {
    height: 0;
    overflow: hidden;
    .li {
      cursor: pointer;
      img {
        width: 40px;
      }
    }
  }
  .item {
    // height: 31px;
    .item-title {
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: #feffff;
      font-size: 16px;
      color: rgba(79, 80, 80, 1);
      border-bottom: solid 1px #eaeaea;
      cursor: pointer;
      > div {
        text-align: center;
      }
      .item-title-txt {
        display: flex;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
          margin-right: 20px;
          background-size: contain;
        }
      }
      .arrow {
        width: 30px;
        height: 24px;
        background: url('~assets/img/game/arrow.png') center center no-repeat;
        transition: all 0.5s;
      }
      .open {
        transform: rotate(180deg);
      }
      ._ssc {
        background: url('~assets/img/touzhu_ssc.png') no-repeat;
      }
      ._pk10 {
        background: url('~assets/img/touzhu_pk10.png') no-repeat;
      }
      ._k3 {
        background: url('~assets/img/touzhu_k3.png') no-repeat;
      }
      ._11x5 {
        background: url('~assets/img/touzhu_11x5.png') no-repeat;
      }
      ._3d {
        background: url('~assets/img/touzhu_3d.png') no-repeat;
      }
      ._lhc {
        background: url('~assets/img/touzhu_lhc.png') no-repeat;
      }
      ._pcdd {
        background: url('~assets/img/touzhu_pcdd.png') no-repeat;
      }
      ._sport_key {
        background: url('~assets/img/touzhu_sport.png') no-repeat;
      }
      ._otherJsTag {
        background: url('~assets/img/touzhu_otherLottery.png') no-repeat;
      }
    }
    li {
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f4f5f6;
      border-bottom: solid 1px #eaeaea;
      font-size: 14px;
      cursor: pointer;
      span {
        // flex: 1;
        // text-align: center;
        display: inline-block;
        width: 100px;
      }
      .li-img {
        text-align: center;
        img {
          height: 40px;
          width: 40px;
        }
      }
    }
    .active {
      background-color: #f3e4d2;
      color: #f13131;
    }
  }
}
</style>


