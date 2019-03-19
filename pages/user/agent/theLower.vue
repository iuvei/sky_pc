<template>
  <!-- 下级报表页面 -->
  <div class="agent_that">
    <div class="top_content">

      <!-- top 部分 -->
      <div class="top_top">
        <p class="time_list">用户类型:</p>
        <Select class="all_types" v-model="userType" style="width:15%">
          <Option class="select_box" v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        时间:
        <statusGroup v-model="lasttime" :data="lasttimes"></statusGroup>
        <Input v-model="userName" class="the_search_box" placeholder="请输入下级账户" clearable></Input>
        <Button size="small" class="the_query" @click="queryClick">
          <span>查询</span>
        </Button>
      </div>

      <!-- 插件表格用 -->
      <Table class="top_the_lower_form" border :columns="tableColumns" :data="tableData"></Table>
      <!-- 分页 -->
      <Button class="the_query" @click="nextClick" v-if="tableData.length && tableData.length % 20 === 0" style="display: block;margin: 17px auto;">
        <span>下一页</span>
      </Button>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import statusGroup from '~/components/user/statusGroup'
export default {
  name: 'userTheLower',
  components: {
    statusGroup
  },
  data() {
    return {
      superiorArr: [''], // 可返回的层级
      userType: 0,
      userTypes: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '会员',
          value: 1
        },
        {
          label: '代理',
          value: 2
        }
      ],
      lasttimes: [
        { label: '今日', value: 0 },
        { label: '昨天', value: 1 },
        { label: '本周', value: 2 },
        { label: '本月', value: 3 },
        { label: '上月', value: 4 }
      ],
      lasttime: 0,
      userName: '',
      tableColumns: [
        { title: '用户名', width: 130, key: 'username' },
        { title: '用户类型', key: 'actype' },
        { title: '投注金额', key: 'tz_price' },
        { title: '中奖金额', key: 'win_price' },
        { title: '返点金额', key: 'fandian_price' },
        { title: '充值金额', key: 'pay_price' },
        { title: '提款金额', key: 'get_price' },
        { title: '下级代理', key: 'next_daili' },
        { title: '下级会员', key: 'next_user' },
        {
          title: '操作',
          render: (h, params) => {
            const row = params.row
            return (
              <div class="operation">
                {this.superiorArr.length > 1 && (
                  <a
                    class="btn_log"
                    title="查看上级"
                    href="javascript:void(0)"
                    onClick={() => this.lookUp(row)}
                  >
                    查看上级
                  </a>
                )}
                {row.next_count > 0 && (
                  <a
                    class="btn_static"
                    title="查看下级"
                    href="javascript:void(0)"
                    onClick={() => this.lookDown(row)}
                  >
                    查看下级
                  </a>
                )}
              </div>
            )
          }
        }
      ],
      tableData: [],
      loadMore: false
    }
  },
  computed: {
    ...mapState('userinfo', ['accountInfo']),
    uid() {
      return this.accountInfo.uid
    }
  },
  watch: {
    userType: 'queryClick',
    lasttime: 'queryClick'
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions('agent', ['getChlidStatic', 'getDailiStaticData']),
    lookUp() {
      this.superiorArr.splice(-1, 1)
      this.queryClick()
    },
    lookDown({ uid }) {
      this.superiorArr.push(uid)
      this.queryClick()
    },
    nextClick() {
      this.loadMore = true
      this.pageid++
      this.initData()
    },
    queryClick() {
      this.loadMore = false
      this.pageid = 0
      this.tableData = []
      this.initData()
    },
    async initData() {
      let user_id = this.superiorArr[this.superiorArr.length - 1]
      let params = {
        loading: true,
        username: this.userName,
        user_type: this.userType,
        pageid: this.pageid,
        user_id,
        lasttime: this.lasttime,
        count: 20
      }
      let data = (await this.getChlidStatic(params)) || []
      if (this.loadMore) {
        data = [...this.tableData, ...data]
      }
      this.tableData = data
      // console.error(data);
    }
  }
}
</script>
<style lang="scss" scoped>
.agent_that {
  .time-group {
    width: 40%;
    height: 33px;
    margin: 13px 2px;
    display: flex;
    font-size: 14px;
    line-height: 24px;
    .check_box {
      width: auto;
      height: 24px;
      cursor: pointer;
      line-height: 24px;
      padding: 0px 5px 0px 5px;
      margin-left: 5px;
      color: #999;
      display: inline-block;
      border: 1px Solid #ccc;
      font-size: 14px;
    }
    .check_box.active {
      border: 1px Solid red;
      color: red;
    }
  }
  .top_content {
    margin-top: 12px;
    width: 100%;
    min-height: 300px;
    font-size: 14px;
    border: solid 1px #dbdbdb;
    .top_top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .time_list {
        margin-left: 22px;
        margin-right: 5px;
      }
      .all_types {
        margin-right: 10px;
        .select_box {
          text-align: center;
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
        height: 30px;
        line-height: 22px;
        // border-radius: 0;
        border: solid 1px rgb(13, 111, 231);
        span {
          color: rgb(13, 111, 231);
        }
      }
    }
    .the_lower_form {
      .the_lower_form_paging {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px 0px;
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
  }
  .ivu-table:after {
    width: 0;
  }
  .ivu-table th,
  .ivu-table-cell {
    text-align: center;
  }
  .ivu-table-border td {
    height: 40px;
    line-height: 40px;
  }

  .operation {
    line-height: 30px;
    a {
      display: inline-block;
    }
  }
}
</style>
