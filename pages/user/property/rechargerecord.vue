<template>
  <Row type="flex" style="width: 827px" justify="start">
    <Col :span="24">
      <Form :model="title" :label-width="60" label-position="left" inline>
        <FormItem label="摘要：">
          <Col :span="24">
            <Select v-model="title.status">
              <Option :value="item.type" v-for="(item, index) in status" :key="index">{{item.text}}</Option>
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
      <!-- <Page :total="1" show-elevator show-total></Page> -->
      <Button @click="prePage" :class="{'non_select': !title.pageid}"><Icon type="chevron-left"></Icon>上一页</Button>
      <Col :span="1" style="margin: 0 5px">
        <Input v-model="pageId" disabled></Input>
      </Col>
      <Button @click="nextPage" :class="{'non_select': nonSelect}">下一页<Icon type="chevron-right"></Icon></Button>
    </Row>
    <!-- <Row type="flex" justify="center" style="width:100%;">

    </Row> -->
  </Row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import statusGroup from "~/components/user/statusGroup";
  export default {
    components: {
      statusGroup
    },
    data() {
      return {
        status: [
          {text: '全部', type: 0},{text: '正在审核', type: 1}, {text: '充值成功', type: 2},
          {text: '充值失败', type: 3}, {text: '未付款', type: 4}
        ],
        lasttimes: [
          { label: "今日", value: 0 },
          { label: "昨天", value: 1 },
          { label: "本周", value: 2 },
          { label: "本月", value: 3 },
          { label: "上月", value: 4 }
        ],
        title: {
          status: 0,
          lasttime: 0, //0今天 1昨天 2本周 3本月 4上月
          pageid: 0
        },
        header: [
          {
            "title": '日期',
            "key": 'pay_time',
            'align': 'left',
            'width': 137,
            'sortable': true
          },
          {
            "title": '收支单号',
            "key": 'order',
            'align': 'left',
            'width': 138
          },
          {
            "title": '交易类型',
            "key": 'type',
            'align': 'left',
            'width': 138
          },
          {
            "title": '充值金额',
            "key": 'pay_price',
            'align': 'left',
            'width': 138,
            'sortable': true
          },
          {
            "title": '状态',
            "key": 'status',
            'align': 'left',
            'width': 138,
            'sortable': true
          },
          {
            "title": '备注',
            "key": 'index_mark',
            'align': 'left',
            'width': 138,
            'sortable': true
          }
        ],
        basicData: [],
        nonSelect: false
      }
    },
    watch: {
      'title.lasttime': "togetUserCzLog",
      'title.status': "togetUserCzLog"
    },
    mounted() {
      this.togetUserCzLog()
    },
    computed: {
      pageId() {
        return this.title.pageid + 1
      }
    },
    methods: {
      ...mapActions('user',['getUserCzLog']),
      async togetUserCzLog() { // 设置/修改登录密码
        let userCzLog = (await this.getUserCzLog(this.title)) || []
        // console.log(userCzLog)
        this.basicData = userCzLog
      },
      getData(){
        this.togetUserCzLog()
      },
      prePage() {
        if(this.title.pageid) {
          this.title.pageid -= 1
          this.togetUserCzLog()
          this.nonSelect = false
        }
      },
      async nextPage() {
        this.title.pageid += 1
        let userTradLog = await this.getUserCzLog(this.title)
        // console.log(userTradLog)
        if(!userTradLog) {
          this.$Notice.open({
            title: '温馨提示',
            desc: '当前已是最后一页'
          })
          this.nonSelect = true
          this.title.pageid -= 1
        } else {
          this.basicData = userTradLog
        }
      }
    },
  }
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
  color: #333!important;
}
</style>

