<template>
  <Row type="flex" style="width: 827px" justify="center" class="getrecord_main_body">
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
      <!-- <Page :total="basicData.length" show-elevator show-total></Page> -->
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
          {text: '全部', type: 0},{text: '审核中', type: 1}, {text: '已成功', type: 2},
          {text: '已取消', type: 3}
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
            "key": 'time',
            'align': 'center',
            'width': 70,
            'sortable': true
          },
          {
            "title": '收支单号',
            "key": 'order',
            'align': 'center',
            'width': 90
          },
          {
            "title": '提款金额',
            "key": 'price',
            'align': 'center',
            'width': 90
          },
          {
            "title": '手续费',
            "key": 'price_fee',
            'align': 'center',
            'width': 90,
            'sortable': true
          },
          {
            "title": '行政费',
            "key": 'xingzheng_price',
            'align': 'center',
            'width': 90,
            'sortable': true
          },
          {
            "title": '实际金额',
            "key": 'shiji_price',
            'align': 'center',
            'width': 107,
            'sortable': true
          },
          {
            "title": '银行卡',
            "key": 'bank_card',
            'align': 'center',
            'width': 70,
            // ellipsis:true
          },
          {
            "title": '银行名字',
            "key": 'bank_type',
            'align': 'center',
            'width': 90,
            // ellipsis: true
          },
          {
            "title": '状态',
            "key": 'status',
            'align': 'center',
            'width': 60
          },
          {
            "title": '备注',
            "key": 'index_mark',
            'align': 'center',
            'width': 70,
            // ellipsis: true
          }
        ],
        basicData: [],
        nonSelect: false
      }
    },
    watch: {
      'title.lasttime': "togetUserTKLog",
      'title.status': "togetUserTKLog"
    },
    mounted() {
      this.togetUserTKLog()
    },
    computed: {
      pageId() {
        return this.title.pageid + 1
      }
    },
    methods: {
      ...mapActions('user',['getUserTKLog']),
      async togetUserTKLog() { // 设置/修改登录密码
        let userTKLog = await this.getUserTKLog(this.title) || []
        // console.log(userTKLog)
        this.basicData = userTKLog
      },
      getData(){
        this.togetUserTKLog()
      },
      prePage() {
        if(this.title.pageid) {
          this.title.pageid -= 1
          this.togetUserTKLog()
          this.nonSelect = false
        }
      },
      async nextPage() {
        this.title.pageid += 1
        let userTradLog = await this.getUserTKLog(this.title)
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
    }
  }
</script>
<style lang="scss" scoped>
.getrecord_main_body {
  .ivu-page {
    padding-top: 20px;
    text-align: center;
  }
  .ivu-table-cell {
    padding: 0 5px;
  }
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

