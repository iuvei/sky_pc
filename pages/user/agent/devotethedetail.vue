<template>
  <!-- 投注明细页面 -->
  <div class="agent_that">
    <div class="top_content">
      <!-- top 部分 -->
      <div class="account_query">
        <p>账户:</p>
        <Input v-model="userName" class="the_search_box" placeholder="请输入下级账户" clearable style="width: 20%"></Input>
        <Button size="small" class="the_query" @click="queryClick">
          <span>查询</span>
        </Button>
      </div>
      <!-- top 部分时间快捷查询部分 -->
      <div class="top_top">
        <p class="time_list">彩种:</p>
        <Select class="all_types" v-model="gameId" style="width:15%" filterable @on-change="getGameList">
          <Option class="select_box" :value="0">--全部--</Option>
          <Option class="select_box" v-for="item in gameList" :value="item.game_id" :key="item.game_id">{{ item.game_name }}</Option>
        </Select>
        <div class="time_to_choose_the">
          时间:
          <statusGroup v-model="lasttime" :data="lasttimes"></statusGroup>
        </div>
        <div class="time_to_choose_the">
          状态:
          <statusGroup v-model="type" :data="types"></statusGroup>
        </div>
      </div>
      <!-- 插件表格 -->
      <!-- <Table class="top_the_lower_form" border :columns="columns1" :data="data1"></Table> -->
      <!-- 表格部分 -->
      <div class="the_detail_list">
        <ul class="thelist_list">
          <li>
            <div class="account">账号</div>
            <div>彩种</div>
            <div>玩法</div>
            <div>期号</div>
            <div class="issue">投注时间</div>
            <div class="number">投注金额</div>
            <div class="desc">投注详情</div>
            <div class="state">状态</div>
          </li>
        </ul>

        <ul class="thelist_list" v-for="(item,index) in touzhus" :key="index">
          <li>
            <div class="account">{{item.username}}</div>
            <div>{{item.game_name}}</div>
            <div>{{item.wanfa}}</div>
            <div>{{item.qishu}}</div>
            <div class="issue">{{item.tz_time}}</div>
            <div class="number">{{item.price}}</div>
            <div class="desc" @click="lookInfo(item)">
              <div class="desc_details">{{item.xiangqing}}</div>
            </div>
            <div class="state">
              <div :class="['state_the', item.status === 2 && item.win > 0 ? 'win':'lose']">
                {{getStatusTxt(item)}}
              </div>
            </div>
          </li>
        </ul>

      </div>
      <!-- 分页 -->
      <Button class="the_query" @click="nextClick" v-if="touzhus.length && touzhus.length % 40 === 0" style="display: block;margin: 17px auto;">
        <span>下一页</span>
      </Button>

    </div>

    <!-- 订单详情模态框 -->
    <Modal class="order_details_modal_box" v-model="modalShow" title="订单详情" @on-cancel="cancel">
      <div class="note_number">
        <span>注单号:{{row.zhudan}}</span>
      </div>
      <ul class="order_details_list">
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">彩种:</div>
            <div class="order_details_list_list_box_right">{{row.game_name}}</div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">单注金额:</div>
            <span class="order_details_list_list_box_right">{{row.price/row.zhushu}}</span>
          </div>
        </li>
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">下注时间:</div>
            <div class="order_details_list_list_box_right">{{row.tz_time}}</div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 投注注数:</div>
            <span class="order_details_list_list_box_right">{{row.zhushu}}</span>
          </div>
        </li>
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 期号:</div>
            <div class="order_details_list_list_box_right">{{row.qishu}}</div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">投注总额:</div>
            <span class="order_details_list_list_box_right">{{row.price}}</span>
          </div>
        </li>
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 玩法:</div>
            <div class="order_details_list_list_box_right">{{row.wanfa}}</div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">开奖号码:</div>
            <span class="order_details_list_list_box_right">
              <span class="kjhm">{{row.kj_balls}}</span>
            </span>
          </div>
        </li>
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 状态:</div>
            <div class="order_details_list_list_box_right">
              <div>
                {{getStatusTxt(row)}}
              </div>
            </div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left">中奖金额:</div>
            <span class="order_details_list_list_box_right">{{row.win}}</span>
          </div>
        </li>
        <li class="order_details_list_list">
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 赔率:</div>
            <div class="order_details_list_list_box_right">{{row.peilv}}</div>
          </div>
          <div class="order_details_list_list_box">
            <div class="order_details_list_list_box_left"> 盈亏:</div>
            <span class="order_details_list_list_box_right">{{row.status === 0 ? '敬请期待':row.is_win}}</span>
          </div>
        </li>
      </ul>
      <div class="bet_number">
        <div class="bet_number_hm">
          <span class="bet_number_xzhm">下注号码 </span>
          <Icon type="ios-arrow-thin-down"></Icon>
        </div>
        <div class="bet_number_number">{{row.xiangqing}}</div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import statusGroup from '~/components/user/statusGroup'
export default {
  name: 'userDevotethedetail',
  components: {
    statusGroup
  },
  data() {
    return {
      pageid: 0,
      userName: '',
      type: 0,
      lasttime: 0,
      lasttimes: [
        { label: '今日', value: 0 },
        { label: '昨天', value: 1 },
        { label: '本周', value: 2 },
        { label: '本月', value: 3 },
        { label: '上月', value: 4 }
      ],
      types: [
        { label: '全部', value: 0 },
        { label: '追号', value: 1 },
        { label: '中奖', value: 2 },
        { label: '待开奖', value: 3 },
        { label: '撤单', value: 4 },
        { label: '未中奖', value: 5 }
      ],
      gameId: 0,
      modalShow: false,
      // 插件表格用
      // columns1: [
      //     { title: "账号", key: "name" },
      //     { title: "彩种", key: "age" },
      //     { title: "玩法", key: "address" },
      //     { title: "期号", key: "address" },
      //     { title: "投注时间", key: "address" },
      //     { title: "投注金额", key: "address" },
      //     { title: "投注详情", key: "address" },
      //     { title: "状态", key: "address" }
      // ],
      touzhus: [],
      row: {},
      loadMore: false
    }
  },
  computed: {
    ...mapState('game', ['gameList'])
  },
  watch: {
    lasttime: 'queryClick',
    type: 'queryClick'
  },
  fetch({ store }) {
    store.dispatch('game/getGameListAtin')
  },
  mounted() {
    this.userName = this.$route.query.username
    this.getGameList()
  },
  methods: {
    ...mapActions('agent', ['getGameListAtin', 'getDailiTouzhuLog']),
    getStatusTxt({ status, win }) {
      if (status === undefined) return ''
      if (status === 0) return '待开奖'
      else if (status === 2 && win > 0) return '中奖'
      else if (status === 2 && win <= 0) return '未中奖'
      return this.types[status].label
    },
    nextClick() {
      this.loadMore = true
      this.pageid++
      this.getGameList()
    },
    queryClick() {
      this.loadMore = false
      this.pageid = 0
      this.getGameList()
    },
    lookInfo(n) {
      this.row = n
      this.modalShow = true
    },
    cancel() {
      //   this.$Message.info("点击了取消");
    },
    async getGameList() {
      let params = {
        username: this.userName,
        type: this.type,
        gameid: this.gameId,
        lasttime: this.lasttime,
        pageid: this.pageid
      }
      let data = (await this.getDailiTouzhuLog(params)) || []
      if (this.loadMore) {
        data = [...this.touzhus, ...data]
      }
      this.touzhus = data
    }
  }
}
</script>
<style lang="scss" scoped>
.agent_that {
  .top_content {
    margin-top: 10px;
    width: 100%;
    min-height: 500px;
    font-size: 14px;
    border: solid 1px #dbdbdb;
    .account_query {
      width: 100%;
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: solid 1px #dbdbdb;
      p {
        margin-left: 20px;
      }
      .the_search_box {
        margin: 8px;
      }
      .the_query {
        span {
          height: 25px;
          line-height: 25px;
        }
      }
    }
    .top_top {
      height: 60px;
      display: flex;
      align-items: center;
      .time_list {
        width: 40px;
        margin-left: 20px;
      }
      .all_types {
        margin-right: 10px;
        .select_box {
          text-align: center;
        }
      }
      .time_to_choose_the {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .time_to_choose_the_query {
          margin-left: 10px;
          span {
            height: 25px;
            line-height: 25px;
          }
        }
      }
    }
    .the_detail_list {
      width: 100%;
      border-bottom: 1px solid rgb(221, 221, 221);
      .thelist_list {
        li {
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          text-align: center;
          height: 40px;
          line-height: 40px;
          > div {
            width: 120px;
            border-top: 1px solid rgb(221, 221, 221);
            border-left: 1px solid rgb(221, 221, 221);
            font-size: 14px;
            color: rgb(103, 99, 99);
            border-collapse: collapse;
          }
          .account {
            border-left: 0 solid rgb(221, 221, 221);
          }
          .issue {
            width: 180px;
          }
          .number {
            width: 80px;
          }
          .desc {
            width: 180px;
            display: flex;
            justify-content: center;
            .desc_details {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              color: #e33939;
              border: none;
            }
          }
          .state {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .the_lower_form {
      .the_lower_form_paging {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0px;
        width: 825px;
        height: 50px;
      }
    }
  }
}
.state_the {
  width: 50px;
  height: 26px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  display: inline-block;
}
.state_the.win {
  border: 1px solid #43a00d;
  background: #43a00d;
}
.state_the.lose {
  border: 1px solid #ea2e08;
  background: #ea2e08;
}
</style>
<style lang="scss">
// 插件表格
// ul.ivu-select-dropdown-list {
// }
// .top_the_lower_form {
//     border-left: none;
//     border-right: none;
//     .ivu-table-border td:last-child,
//     .ivu-table-border th:last-child {
//         border-right: none;
//     }

//     .ivu-table:after {
//         width: 0;
//     }
//     .ivu-table th,
//     .ivu-table-cell {
//         text-align: center;
//     }
//     .ivu-table-border td {
//         height: 40px;
//         line-height: 40px;
//     }
// }
// 模态框
.order_details_modal_box {
  .ivu-modal-header {
    width: 90%;
    margin-left: 4%;
    border-bottom: 1px solid #ff9147;
    height: 40px;
  }
  .ivu-modal-close .ivu-icon-ios-close-empty,
  .ivu-modal-header-inner {
    color: #ff9147;
  }
  .note_number {
    color: #a0a0a0;
    text-align: center;
  }
  .ivu-modal-body {
    padding: 6%;
  }
  .order_details_list {
    width: 100%;
    .order_details_list_list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 30px;
      border-bottom: dashed 1px #dbdbdb;
      // border: dashed 1px #dbdbdb;
      .order_details_list_list_box {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .order_details_list_list_box_left {
          width: 80px;
          display: flex;
          justify-content: flex-end;
        }
        .order_details_list_list_box_right {
          flex: 1;
          width: 0;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }
  .kjhm {
    color: #e21212;
  }
  .bet_number {
    .bet_number_hm {
      height: 40px;
      .bet_number_xzhm {
        margin-top: 20px;
        line-height: 50px;
        margin-left: 30px;
      }
    }
    .bet_number_number {
      width: 100%;
      height: 100px;
      border: dashed 1px #dbdbdb;
      padding: 7px;
    }
  }
}
</style>
