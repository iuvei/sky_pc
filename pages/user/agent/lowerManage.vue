<template>
  <div class="lower-manage">
    <div class="one-block">
      <span>用户类型:</span>
      <Select class="user-type" v-model="userType" style="width:15%">
        <Option class="select_box" v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

      <Input v-model="userName" class="user-search" placeholder="请输入会员账号" clearable style="width: 20%"></Input>
      <Button size="small" class="query-btn" @click="queryClick">
        <span>查询</span>
      </Button>
    </div>

    <Table :data="tableData" :columns="tableColumns"></Table>
    <Button class="the_query" @click="nextClick" v-if="tableData.length && tableData.length % 20 === 0" style="display: block;margin: 17px auto;">
        <span>下一页</span>
      </Button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "lowerManage",
  data() {
    return {
      pageid: 0,
      userType: 0,
      userTypes: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "代理",
          value: 2
        },
        {
          label: "会员",
          value: 1
        }
      ],
      userName: "",
      tableData: [],
      tableColumns: [
        {
          title: "用户名",
          width: 120,
          key: "username"
        },
        {
          title: "用户类型",
          key: "actype",
          width: 150
        },
        {
          title: "下级代理",
          key: "next_daili",
          width: 100
        },
        {
          title: "下级会员",
          key: "next_user"
        },
        {
          title: "余额",
          key: "price"
        },
        {
          title: "最后登录",
          width: 160,
          key: "last_login_time"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            return (
              <div>
                <a
                  class="btn_log"
                  title="投注明细"
                  href="javascript:void(0)"
                  onClick={() => this.lookBet(row)}
                />
                <a
                  class="btn_static"
                  title="交易明细"
                  href="javascript:void(0)"
                  onClick={() => this.lookTrade(row)}
                />
              </div>
            );
          }
        }
      ],
      loadMore: false
    };
  },
  components: {},
  computed: {
    ...mapState("agent", ["lowerLevelAccount"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("agent", ["getChlidStatic"]),
    nextClick() {
      this.loadMore = true;
      this.pageid++;
      this.initData();
    },
    queryClick() {
      this.loadMore = false
      this.pageid=0
      this.tableData = []
      this.initData();
    },
    lookBet(n) {
      console.error(n);
      this.$router.push('/user/agent/devotethedetail');
    },
    lookTrade(n) {
      console.error(n);
      this.$router.push('/user/agent/trading');
    },
    async initData() {
      let params = {
        loading: true,
        username: this.userName,
        user_type: this.userType,
        pageid: this.pageid,
        user_id: "",
        lasttime: 0
      };
      let data = (await this.getChlidStatic(params)) || [];
      if (this.loadMore) {
        data = [...this.tableData, ...data];
      }
      this.tableData = data;
      // console.error(data);
    }
  }
};
</script>
<style lang="scss">
.lower-manage {
  .btn_log {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(~/assets/img/user_center_icons.png) -128px 0px;
  }
  .btn_static {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(~/assets/img/user_center_icons.png) -105px 0px;
  }
}
</style>
<style lang="scss" scoped>
.lower-manage {
  .one-block {
    display: flex;
    width: 100%;
    line-height: 32px;
    padding-bottom: 15px;
    .user-type {
      margin: 0 20px;
    }
    .query-btn {
      margin: 0 20px;
      border: 1px solid #00a0e9;
      color: #00a0e9;
    }
  }
}
</style>
