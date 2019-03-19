<template>
  <div class="fast-bet">
    <Card>
      <Tabs :value="firstGameName" @on-click="clickTab">
        <TabPane v-for="(item, index) in list" :label="item.game_name" :name="item.game_name" :key="index">
          <div class="_title">
            <p>
              <span id="less_time_data"></span>
              <a @click.stop.prevent="goDes(item)">
                <span class="sprite-index_footer index_footer-wenhao"></span>玩法说明</a>
              <a @click.stop.prevent="goTrend(item)">
                <span class="sprite-index_footer index_footer-ups"></span>走势图表</a>
            </p>
          </div>

          <div class="wai">
            <div class="_nei">
              <span v-for="(x, y) in balls" :key="y" class="_balls_wai ">
                <strong class="_balls">{{x}}</strong>
              </span>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div class="actions">
        <div>
          <AppNumberSide v-model="betNum"></AppNumberSide>
          倍 共
          <span style="color:red">{{totalPrice}}</span> 元
        </div>
        <div>
          <div class="index_sprite flsh-price" @click="changeBall"></div>
          <span @click="changeBall">换一注</span>
          <Button type="primary" @click="goBet" size="large">
            立即投注
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'fast-bet',
  data() {
    return {
      names: ['重庆时时彩', '新疆时时彩', '安徽快三'],
      curGame: '',
      betNum: 1,
      price: 2,
      balls: []
    };
  },
  created() {
    if(!process.browser) return
    if(process.env.static) return
    if (!this.curGame.length && this.list && this.list.length) {
      this.curGame = this.list[0].game_name;
      this.balls = this.getBalls();
    }
  },

  computed: {
    // ...mapState('game', ['gameList']),
    gameList(){
      return this.$store.getters['game/gameList']
    },
    list() {
      if (
        this.gameList &&
        Array.isArray(this.gameList) &&
        this.gameList.length
      ) {
        let res = this.gameList.filter(
          x => x.type === 1 && x.game_name.enable !== 2
        ),
        def = this.gameList.filter(
          x => this.names.includes(x.game_name)
        )
        return res.length < 3 ? res.slice(0, 3) : def
      }
    },
    firstGameName() {
      return this.list && this.list[0].game_name;
    },
    totalPrice() {
      return this.price * this.betNum;
    }
  },
  methods: {
    changeBall() {
      this.balls = this.getBalls();
    },
    getBalls() {
      let balls = [];
      const game = this.gameList.find(x => x.game_name === this.curGame);
      switch (game.js_tag) {
        case 'ssc':
          balls = this.getRow(0, 9, 4);
          break;
        case 'k3':
          balls = this.getRow(1, 6, 2, true);
          break;
      }
      return balls;
    },
    goDes(game) {
      this.$router.push(`/gamehelp/tag/pcdd?game_name=${game.game_name}`);
    },
    goTrend(item) {
      let excludeArr = ['xypk', 'tzyx']
      if (excludeArr.includes(item.js_tag)) {
        this.$Message.warning('此彩种暂无走势')
        return
      }
      this.$router.push({ name: 'trend', params: item })
    },
    goBet() {
      const game = this.list.find(x => x.game_name === this.curGame);
      if(game.enable === 2) {
        this.$Message.warning('该彩种正在维护中···')
        return
      }
      this.$router.push(`/game/${game.js_tag}/${game.game_id}`);
    },
    clickTab(name) {
      this.curGame = name;
      this.balls = this.getBalls();
    },
    getRamNum(start, end) {
      return parseInt(Math.random(0, 9) * 10);
    },
    getRow(start, end, length, repeat = false) {
      let arr = [];
      let i = 0;
      //let flag = i === 0 ? i<
      if (!repeat) {
        let set = new Set();
        while (i < 30 && set.size <= length) {
          i++;
          set.add(this.getRamNum(start, end));
        }
        arr = Array.from(set);
      } else {
        for (i; i <= length; i++) {
          arr[i] = this.getRamNum(start, end);
        }
      }
      return arr;
    }
  },
  watch: {
    list(val){
      if(val && val.length){
        this.curGame = this.list[0].game_name;
        this.balls = this.getBalls();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
._title {
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  padding: 0 0 0 306px;
  a {
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    color: #666;
  }
}
.index_footer-ups {
  width: 13px;
  height: 13px;
  background-position: -303px -109px;
  margin-right: 5px;
}

.index_footer-wenhao {
  width: 13px;
  height: 13px;
  background-position: -318px -109px;
  margin-right: 5px;
}
.wai {
  width: 460px;
  height: 76px;
  margin: 25px auto;
  background: rgb(252, 242, 239);
  border-radius: 50px;
  text-align: center;
  line-height: 76px;
  padding: 7px 18px;
  box-sizing: border-box;
}
._nei {
  width: 100%;
  height: 100%;
  border-radius: 32px;
  line-height: 60px;
  padding: 10px 27px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  ._balls_wai {
    // float: left;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 32px;
    background: #e93248;
    line-height: 35px;
    margin-right: 10px;
    box-sizing: border-box;
  }

  ._balls {
    font-size: 18px;
    width: 40px;
    height: 40px;
    display: inline-block;
    color: #ffffff;
    border-radius: 32px;
    line-height: 40px;
    font-weight: 400;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
.index_sprite {
  background: url(~/assets/img/index_sprite.png) no-repeat top center;
  // background-size: 20px 20px;
}
.flsh-price {
  // float: left;
  display: block;
  width: 21px;
  height: 21px;
  background-position: -436px -26px;
  transition: all 1s ease;
  cursor: pointer;
  margin-top: 3px;
  &:hover {
    transform: rotate(360deg);
  }
}
</style>
<style>
.fast-bet .ivu-card-body {
  padding-top: 12px;
}
.fast-bet .app-input-number-side .l,
.fast-bet .app-input-number-side .r {
  border-radius: unset !important;
  background: #fff !important;
}
.fast-bet .app-input-number-side .active {
  background: #fff !important;
}
</style>

