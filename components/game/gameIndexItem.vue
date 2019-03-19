<template>
  <div class="detail ft14">
    <template v-if="!['sport_key','jingcai_key','JC_BK','JC_FT'].includes(item.js_tag)">
      <div class="info">
        <div class="left"><img :src="item.icon" alt=""></div>
        <div class="right">
          <div class="name">{{item.game_name}}</div>
          <div class="next">
            <span>距离开奖：</span>
            <AppTimer :openTime="openTime" v-if="openTime.length" :callback="nextOpen" repeat='3'></AppTimer>
            <div v-else>欢迎下注</div>
          </div>
        </div>
      </div>
      <div class="lottery">
        <div>上期开奖：</div>
        <AppLotteryNum class="num" v-if="openNum.balls" :number="openNum.balls" :type="item.js_tag" :qishu="openNum.qishu"></AppLotteryNum>
        <div v-else>正在开奖......</div>
      </div>
      <div class="btn-group">
        <div class="trend" @click="goTrend">号码走势</div>
        <div class="about">
          <nuxt-link :to="{path:'/gamehelp/tag/'+item.js_tag,query:{game_name:item.game_name}}">玩法说明</nuxt-link>
        </div>
        <div class="bet" @click="goBetting">立即投注</div>
      </div>
    </template>

    <template v-if="['sport_key','jingcai_key','JC_BK','JC_FT'].includes(item.js_tag)">
      <div class="sport">
        <div class="img"><img :src="item.icon" alt=""></div>
        <div class="txt">
          <div class="name">{{item.game_name}}</div>
          <div class="btn" @click="goBetting">
            立即投注
            <span class="icon"></span>
          </div>
        </div>
      </div>
    </template>
  </div>

</template>




<script>
let otherJsTag = ['qxc', 'pkniuniu', 'xypk', 'xync', 'tzyx']

export default {
  name: 'gameIndexItem',
  props: {
    item: {
      default() {
        return {}
      }
    },
    openTime: {
      default() {
        return []
      }
    },
    openNum: {
      default() {
        return {}
      }
    }
  },
  methods: {
    nextOpen(length) {
      // console.log(length, this.item.tag);
      this.$emit('openNext', {
        tag: this.item.tag,
        length
      })
    },
    goTrend() {
      let excludeArr = ['xypk', 'tzyx']
      console.log(this.item)
      if (excludeArr.includes(this.item.js_tag)) {
        this.$Message.warning('此彩种暂无走势')
        return
      }
      this.$router.push({ name: 'trend', params: this.item })
    },
    goBetting() {
      // if (otherJsTag.includes(this.item.js_tag) && this.item.enable !== 2) {
      //   this.$router.push(`/game/${this.item.js_tag}/${this.item.game_id}`)
      //   return
      // }
      if (this.item.js_tag === 'sport_key') {
        window.location.replace('/sport')
        return
      } else if (['jingcai_key', 'JC_BK', 'JC_FT'].includes(this.item.js_tag)) {
        window.location.replace('/jingcai')
        return
      }
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
        ].includes(this.item.js_tag) &&
        this.item.enable !== 2
      ) {
        let path = `/game/${this.item.js_tag}${
          process.env.static ? '?id=' : '/'
        }${this.item.game_id}`
        if (this.item.js_tag == '3d') {
          path = process.env.static
            ? `/game/f3d?id=${this.item.game_id}`
            : `/game/f3d/${this.item.game_id}`
          this.$router.push(path)
          return
        }
        // this.$router.push(`/game/${this.item.js_tag}/${this.item.game_id}`)
        this.$router.push(path)
      } else {
        this.$Message.warning('彩种正在维护中')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #ffffff;
  border-radius: 6px;
  .info {
    height: 90px;
    display: flex;
    padding: 10px;

    .left {
      width: 75px;
      img {
        width: 70px;
      }
    }

    .right {
      // height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // align-items:
      .name {
        font-size: 17px;
        color: #424242;
      }
      .next {
        display: flex;
      }
    }
  }
  .lottery {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px 10px;
  }
  .btn-group {
    display: flex;
    height: 40px;
    cursor: pointer;
    > div {
      // flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      // align-items: center;
      border-top: 1px solid #cacaca;
      border-right: 1px solid #cacaca;
    }
    .trend {
      width: 108px;
      padding-left: 20px;
      background: url('~/assets/img/game/trend.png') no-repeat 10px center;
    }
    .lottery {
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 10px 10px;
    }
    .about {
      width: 108px;
      padding-left: 20px;
      background: url('~/assets/img/game/about.png') no-repeat 10px center;
      a {
        color: #666;
      }
    }
    .bet {
      flex: 1;
      border-right: none;
      font-size: 16px;
      background-color: #e93248;
      color: #fff;
      border-bottom-right-radius: 6px;
      //  border-radius-right: 6px;
    }
  }
  .sport {
    display: flex;
    height: 160px;
    .img {
      padding: 10px;
      display: flex;
      align-items: center;
      img {
        width: 100px;
      }
    }
    .txt {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .name {
        padding: 15px;
        color: #424242;
        font-size: 18px;
      }
      .btn {
        display: flex;
        height: 40px;
        padding: 5px 10px 5px 30px;
        border: 1px solid #cacaca;
        border-radius: 20px;
        font-size: 14px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          background-color: #f54444;
          border-color: #f54444;
          color: #fff;
        }
        .icon {
          display: inline-block;
          width: 28px;
          height: 28px;
          margin-left: 10px;
          background: url('~/assets/img/game/game-center-foot-icon.png');
        }
      }
    }
  }
}
</style>


