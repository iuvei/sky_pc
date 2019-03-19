<template>
  <div class="wrap">
    <div class="main_title">
      最新彩票开奖结果
    </div>
    <Table stripe :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import dayjs from 'dayjs';
import AppLotteryNum from '~/plugins/App/Lottery';
export default {
  name: "lottery-notice-all",
  components: {
    AppLotteryNum
  },
  props: ['jstag'],
  data() {
    return {
      columns: [
        {
          title: '彩种',
          align: 'center',
          key: 'game_name'
        },
        {
          title: '期号',
          align: 'center',
          width: 90,
          key: 'qishu'
        },
        {
          title: '开奖时间',
          align: 'center',
          width: 120,
          key: '_opentime'
        },
        {
          title: '开奖号码',
          align: 'center',
          width: 400,
          key: 'balls',
          render: (h, params) => {
            let pk10 = params.row.js_tag === 'pk10' ? 'big' : '';
            return (
              <AppLotteryNum
                class={'num ' + pk10}
                qishu={params.row.qishu}
                number={params.row.balls}
                type={params.row.js_tag}
              />
            );
          }
        },
        {
          title: '期数（每天）',
          align: 'center',
          key: 'total'
        },
        {
          title: '开奖频率',
          align: 'center',
          key: 'pinlv'
        },
        {
          title: '详情',
          align: 'center',
          width: 50,
          render: (h, params) => {
            return (
              <i
                class="icon xq"
                onClick={this.handleClick.bind(this, params)}
              />
            );
          }
        },
        {
          title: '走势',
          align: 'center',
          width: 50,
          render: (h, { row }) => {
            return (
              <div
                onClick={() => {
                  this.goTrend(row);
                }}
              >
                <i class="icon zs" />
              </div>
            );
          }
        },
        {
          title: '购买彩票',
          align: 'center',
          key: 'openless',
          render: (h, { row }) => {
            return (
              <div>
                <a
                  href={`/game/${row.js_tag}/${row.game_id || row.gameid}`}
                  target="_blank"
                >
                  <button
                    type="button"
                    class="ivu-btn ivu-btn-error ivu-btn-small"
                  >
                    <span>投注</span>
                  </button>
                </a>
              </div>
            );
          }
        }
      ],
      data: [],
      allData: []
    };
  },
  async created() {
    if(!process.browser) return
    let data = await this.getKjCpLog();
    await this.getQishus(data);
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        if (item.prev && item.prev.length) {
          let obj = item.prev[0];
          item = Object.assign(item, obj);
          item._opentime = this.formatTime(item.opentime);
          this.calcTotal(item); //每天开奖期数
          delete item.opentime;
          delete item.prev;
        }
      });
      this.allData = data;
      this.data = data;
      data = null;
    }
  },
  methods: {
    ...mapActions({
      getKjCpLog: 'game/getKjCpLog',
      getQishus: 'game/getQishus'
    }),
    goTrend(row) {
       if(['tzyx','xypk'].includes(row.js_tag)){
        this.$Message.warning("该彩种暂无走势")
        return false
      }
      row.game_id = row.gameid;
      this.$router.push({ name: 'trend', params: row });
    },
    handleClick(params) {
      this.$emit('gotoDetail', params.row);
    },
    //格式化时间
    formatTime(opentime) {
      return dayjs(opentime * 1000).format('YYYY-MM-DD HH:mm');
    },
    //每天开奖期数
    calcTotal(item) {
      if (item.xglhc === 'xglhc') {
        item.total = '';
      } else if (this.game && Array.isArray(this.game.gameList)) {
        let game = this.game.gameList.find(x => x.tag === item.tag);
        if (game && game.tip) {
          item.total = game.tip.replace('全天', '').replace('期', '');
        }
      }
    }
  },
  watch: {
    jstag(val) {
      if (val === 'total') {
        this.data = this.allData;
      } else if (val === 'lows') {
        const gamenames = this.$store.state.game.gameList
          .filter(x => x.speed === 0)
          .map(x => x.game_name);

        this.data = this.allData.filter(x => gamenames.includes(x.game_name));
      } else {
        this.data = this.allData.filter(x => x.js_tag === val);
      }
    }
  },
  computed: {
    ...mapState(['game'])
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  border: none;
}
.wrap .main_title {
  margin: 10px 0px;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
  color: #333;
  background: url(~/assets/img/zoushi_biao.png) no-repeat;
  height: 30px;
  text-indent: 30px;
}
</style>
<style>
.ivu-table-cell {
  padding: 0;
}
.th.num {
  justify-content: center;
}
.icon {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  background-size: 26px 26px;
  width: 26px;
  height: 26px;
}
.xq {
  background: url(~/assets/img/zoushi_xq.png);
}
.zs {
  background: url(~/assets/img/index_zoushi.png);
}
</style>


