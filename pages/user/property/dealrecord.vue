<template>
  <Row type="flex" style="width: 827px" justify="start">
    <Col :span="24">
    <Form :model="title" :label-width="50" label-position="left" inline>
      <FormItem label="摘要：">
        <Col :span="24">
        <Select v-model="title.type" style="width:100px">
          <Option :value="item.type" v-for="(item, index) in options" :key="index">{{item.text}}</Option>
        </Select>
        </Col>
      </FormItem>
      <FormItem label="时间：">
        <Col :span="30">
        <statusGroup v-model="title.lasttime" :data="lasttimes"></statusGroup>
        </Col>
      </FormItem>
    </Form>
    </Col>
    <Table :columns="header" :data="basicData" border></Table>
    <Row type="flex" justify="center" style="width:100%;padding-top:40px">
      <!-- <Page :total="basicData.length || 0" show-elevator show-total :page-size="pageSize" @on-change="page"></Page> -->
      <Button @click="prePage" :class="{'non_select': !title.pageid}">
        <Icon type="chevron-left"></Icon>上一页</Button>
      <Col :span="1" style="margin: 0 5px">
      <Input v-model="page" disabled></Input>
      </Col>
      <Button @click="nextPage" :class="{'non_select': nonSelect}">下一页
        <Icon type="chevron-right"></Icon>
      </Button>
    </Row>
    <!-- <Row type="flex" justify="center" style="width:100%;">

    </Row> -->
  </Row>
</template>
<script>
import { mapState, mapActions } from "vuex";
import statusGroup from "~/components/user/statusGroup";
export default {
  data() {
    return {
      options: [
        { text: "全部", type: 0 },
        { text: "公司入款", type: 1 },
        { text: "线上入款", type: 2 },
        { text: "人工入款", type: 3 },
        { text: "活动优惠", type: 4 },
        { text: "投注退款", type: 5 },
        { text: "提款退还", type: 6 },
        { text: "代理返点", type: 7 },
        { text: "中奖派送", type: 9 },
        { text: "退款记录", type: 50 },
        { text: "投注记录", type: 51 },
        { text: "现金交易", type: 52 }
      ],
      lasttimes: [
        { label: "今日", value: 0 },
        { label: "昨天", value: 1 },
        { label: "本周", value: 2 },
        { label: "本月", value: 3 },
        { label: "上月", value: 4 }
      ],
      title: {
        type: "",
        lasttime: 0, //0今天 1昨天 2本周 3本月 4上月
        pageid: 0
      },
      pageSize: 20,
      header: [
        {
          title: "日期",
          key: "pay_time",
          align: "left",
          width: 137,
          sortable: true
        },
        {
          title: "收支单号",
          key: "dingdan",
          align: "left",
          width: 138
        },
        {
          title: "交易类型",
          key: "trad_type",
          align: "left",
          width: 138
        },
        {
          title: "交易金额",
          key: "price",
          align: "center",
          width: 138,
          sortable: true
        },
        {
          title: "交易前余额",
          key: "price_old",
          align: "left",
          width: 138,
          sortable: true
        },
        {
          title: "交易后余额",
          key: "price_new",
          align: "left",
          width: 138,
          sortable: true
        }
      ],
      basicData: [],
      data: [],
      nonSelect: false
    };
  },
  components: {
    statusGroup
  },
  watch: {
    "title.lasttime": "toGetUserTradLog",
    "title.type": "toGetUserTradLog"
  },
  mounted() {
    this.toGetUserTradLog();
  },
  computed: {
    page() {
      return this.title.pageid + 1;
    }
    // nonSelect() {
    //   get: () => {
    //     return (this.basicData.length < 30) && this.lastPage
    //   }
    //   set: () => {
    //     this.basicData
    //   }
    // }
  },
  methods: {
    ...mapActions("user", ["GetUserTradLog"]),
    async toGetUserTradLog() {
      // 设置/修改登录密码
      this.title.pageid = 0
      this.nonSelect = false
      let userTradLog = (await this.GetUserTradLog(this.title)) || [];
      this.basicData = userTradLog;
      // this.page(1)
      // 接口默认每页返回30条数据   返回的交易金额没有保留两位数
    },
    getData() {
      this.toGetUserTradLog();
    },
    // page(n){
    //   this.title.pageid = n-1
    //   let _data = []
    //   this.basicData.forEach((item,index) => {
    //     if(index >= this.title.pageid * this.pageSize &&  index < (this.title.pageid + 1) * this.pageSize){
    //       _data.push(item)
    //     }
    //   });
    //   this.data = _data
    // },
    prePage() {
      if (this.title.pageid) {
        this.title.pageid -= 1;
        this.toGetUserTradLog();
        this.nonSelect = false;
      }
    },
    async nextPage() {
      this.title.pageid += 1;
      let userTradLog = await this.GetUserTradLog(this.title);
      // console.log(userTradLog);
      if (!userTradLog) {
        this.$Notice.open({
          title: "温馨提示",
          desc: "当前已是最后一页"
        });
        this.nonSelect = true;
        this.title.pageid -= 1;
      } else {
        this.basicData = userTradLog;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-page {
  padding-top: 20px;
  text-align: center;
}
.status-group {
  margin: 4px 0px !important;
}
.non_select {
  cursor: not-allowed;
}
.ivu-input {
  text-align: center;
  font-size: 20px;
  color: #333 !important;
}
</style>

