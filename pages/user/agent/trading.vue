<template>
  <!-- 交易明细页面 -->
  <div class="agent_that">
    <div class="top_content">
      <!-- top 部分 -->
      <div class="account_query">
        <p>账户:</p>
        <Input v-model="userName" class="the_search_box" placeholder="请输入下级账户" clearable style="width:20%"></Input>
        <Button size="small" class="the_query" @click="queryClick">
          <span>查看</span>
        </Button>
      </div>
      <!-- 快捷时间查询部分 -->
      <div class="top_top">
        <p class="time_list">摘要:</p>
        <Select @on-change="queryClick" class="all_types" v-model="tradtype" style="width:12%">
          <Option class="select_box" v-for="item in tradtypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <statusGroup v-model="lasttime" :data="lasttimes"></statusGroup>
      </div>
      <nuxt />
      <!-- 插件表格 -->
      <Table class="top_the_lower_form" border :columns="columns1" :data="tableData"></Table>
      <Button class="the_query" @click="nextClick" v-if="tableData.length && tableData.length % 40 === 0" style="display: block;margin: 17px auto;">
        <span>下一页</span>
      </Button>
      <!-- 分页 -->
      <!-- <div class="the_lower_form">
        <Page class="the_lower_form_paging" :total="100" show-total></Page>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import statusGroup from '~/components/user/statusGroup.vue'
export default {
  name: 'userTrading',
  components: { statusGroup },
  data() {
    return {
      tradtype: 0, // 类型
      lasttime: 0, // 日期时间默认选择
      lasttimes: [
        { label: '今日', value: 0 },
        { label: '昨天', value: 1 },
        { label: '本周', value: 2 },
        { label: '本月', value: 3 },
        { label: '上月', value: 4 }
      ],
      pageid: 0, // 数据分页
      userName: '', //  账户
      tableData: [], // 数据源
      tradtypes: [
        { value: 0, label: '全部' },
        { value: 1, label: '公司入款' },
        { value: 2, label: '线上入款' },
        { value: 3, label: '人工存款' },
        { value: 4, label: '活动优惠' },
        { value: 5, label: '投注退款' },
        { value: 6, label: '提款退还' },
        { value: 7, label: '代理返点' },
        { value: 9, label: '中奖派送' },
        { value: 50, label: '提款' },
        { value: 51, label: '投注记录' },
        { value: 52, label: '现金交易' }
      ],
      sub_types: [
        { value: 1, label: '线上提出' },
        { value: 2, label: '人工提出' },
        { value: 3, label: '误存提出' },
        { value: 4, label: '现金转账' },
        { value: 5, label: '重复入款' },
        { value: 6, label: '会员负数回冲' },
        { value: 7, label: '手动申请入款' },
        { value: 8, label: '扣除非法派彩' },
        { value: 9, label: '放弃优惠' },
        { value: 10, label: '误存提出2' },
        { value: 11, label: '其他' },
        { value: 12, label: '提款申请' }
      ],
      columns1: [
        { title: '账户', key: 'username' },
        { title: '时间', width: 180, key: 'pay_time' },
        { title: '摘要', width: 180, key: 'trad_type' },
        { title: '交易金额', key: 'price' },
        { title: '可用金额', key: 'price_new' },
        {
          title: '状态',
          render: (h, params) => {
            let status = params.row.status
            let tradtype =
              this.tradtypes.filter(el => el.value == status)[0] || {}
            tradtype = tradtype.label
            return <div>{tradtype}</div>
          }
        }
      ],
      loadMore: false
    }
  },
  watch: {
    lasttime: 'queryClick',
    tradtypes: 'queryClick'
  },
  mounted() {
    this.userName = this.$route.query.username
    this.initData()
  },
  methods: {
    ...mapActions('agent', ['getChildTradLog']),
    queryClick() {
      this.loadMore = false
      this.pageid = 0
      this.initData()
    },
    nextClick() {
      this.loadMore = true
      this.pageid++
      this.initData()
    },
    async initData() {
      let params = {
        loading: true,
        username: this.userName,
        // user_type: this.userType,
        pageid: this.pageid,
        user_id: '',
        lasttime: this.lasttime,
        tradtype: this.tradtype
      }
      let data = (await this.getChildTradLog(params)) || []
      if (this.loadMore) {
        data = [...this.tableData, ...data]
      }
      this.tableData = data
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
        margin-left: 22px;
      }
      .all_types {
        margin-right: 10px;
        .select_box {
          text-align: center;
        }
      }
    }
    .the_lower_form {
      .the_lower_form_paging {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0px;
        width: 99%;
        height: 50px;
      }
    }
  }
}
</style>
<style lang="scss">
.top_the_lower_form {
  border-left: none;
  border-right: none;
  .ivu-table-border td:last-child,
  .ivu-table-border th:last-child {
    border-right: none;
    // border-bottom: none;
  }
  .ivu-table:after {
    width: 0;
  }
  .ivu-table th,
  .ivu-table-cell {
    text-align: center;
    padding: 0;
    font-size: 14px;
  }
  .ivu-table-border td {
    height: 35px;
    line-height: 35px;
  }
}
</style>
