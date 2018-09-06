<template>
  <!-- 代理报表页面 -->
  <div class="agent_that">
    <div class="top_content">
      <!-- top 部分 -->
      <div class="top_top">
        时间:<statusGroup v-model="lasttime" :data="lasttimes"></statusGroup>
        <Input v-model="userName" class="the_search_box" placeholder="请输入下级账户" clearable size="small"></Input>
        <Button size="small" class="the_query" @click="queryClick">
          <span>查询</span>
        </Button>
      </div>
      <nuxt/>
      <!-- 表格部分 -->
      <div class="grids_box">
        <div class="grids_pieces">
          <p>{{baseData.tz_price}}</p>
          <p>投注金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.win_price}}</p>
          <p>中奖金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_fandian}}</p>
          <p>团队返点</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_win}}</p>
          <p>团队盈利</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.get_price}}</p>
          <p>提现金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.event_price}}</p>
          <p>活动礼金</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.first_pay_count}}</p>
          <p>首充人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.tz_count}}</p>
          <p>投注人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.reg_count}}</p>
          <p>注册人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.xiaji_count}}</p>
          <p>下级人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.pay_count}}</p>
          <p>充值人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.pay_price}}</p>
          <p>充值金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.daili_fandian}}</p>
          <p>代理返点</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_price}}</p>
          <p>团队余额</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import statusGroup from "~/components/user/statusGroup";
export default {
  name: "userTheReport",
  components: { statusGroup },
  data() {
    return {
      baseData: {},
      lasttimes: [
        { label: "今日", value: 0 },
        { label: "昨天", value: 1 },
        { label: "本周", value: 2 },
        { label: "本月", value: 3 },
        { label: "上月", value: 4 }
      ],
      lasttime: 0,
      userName: "",
      pageid: 0
    };
  },
  watch:{
    lasttime: 'initData'
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("agent", ["getDailiStaticData"]),
    queryClick(){
      this.initData();
    },
    async initData() {
      let params = {
        search: this.userName,
        pageid: this.pageid,
        user_id: "",
        lasttime: this.lasttime,
        count: 20
      };
      let data = (await this.getDailiStaticData(params)) || {};
      this.baseData = data;
    }
  }
};
</script>
<style lang="scss" scoped>
.agent_that {
  .top_content {
    margin-top: 12px;
    width: 100%;
    font-size: 14px;
    border: solid 1px #dbdbdb;
    .top_top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 17px;
      .time_list {
        margin-top: 16px;
        margin-left: 13px;
      }
      .time_to_choose {
        width: 40%;
        height: 33px;
        margin: 13px 18px;
        .to_choose_time {
          margin-right: 10px;
          width: 130px;
        }
      }
      .the_search_box {
        width: 20%;
        display: flex;
        align-items: center;
        margin: 0 16px;
      }
      .the_query {
        width: 40px;
        border: solid 1px rgb(13, 111, 231);
        span {
          color: rgb(13, 111, 231);
        }
      }
    }
    .grids_box {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      border-top: solid 1px #dbdbdb;
      .grids_pieces {
        width: 165px;
        margin-top: 30px;
        margin-bottom: 30px;
        p {
          font-size: 15px;
          text-align: center;
          &:first-child {
            color: #ff7c34;
            line-height: 40px;
          }
        }
        &:nth-child(1n),
        &:nth-child(2) {
          color: #666;
          border-right: 1px dashed #d3d3d3;
        }
        &:nth-child(5n) {
          border-right: 0 dashed #d3d3d3;
        }
      }
    }
  }
}
</style>
