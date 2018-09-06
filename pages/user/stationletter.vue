<template>
  <div>
    <Table :columns="header" :data="basicData" @on-selection-change="selectRows"></Table>
    <Modal v-model="isShow" title="留言详情" :closable="false">
      <p>{{showContent}}</p>
      <div slot="footer" class="pager">
        <Button type="primary" size="large" @click="isShow=false">确定</Button>
      </div>
    </Modal>
    <Page :total="100"></Page>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShow: false,
        showContent: '',
        header: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            "title": '留言内容',
            "key": 'message',
            'align': 'left',
            'width': 220,
            renderHeader: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: ''
                  }
                }),
                h('p', {}, '')
              ])
            }
          },
          {
            "title": '回复',
            "key": 'reply',
            'align': 'left',
            'width': 220,
            render: (h, params) => {
              return h('div', [
                h('p', {
                  on: {
                    click: () => {
                      this.isShow = true
                      this.showContent = params.row.content
                    }
                  }
                }, params.row.content),
              ])
            }
          },
          {
            "title": '回复时间',
            "key": 'reply_time',
            'align': 'left',
            'width': 160,
            'sortable': true
          },
          {
            "title": '留言时间',
            "key": 'send_time',
            'align': 'left',
            'width': 160,
            'sortable': true
          }
        ],
        basicData: [
          {
            content: '网站并没有申请可信网站认证',
            reply_time: '未回复',
            send_time: '2018-05-03 14:31:08'
          }
        ]
      }
    },
    methods: {
      selectRows() {
      }
    }
  }
</script>
<style lang="scss">
.ivu-page {
  padding-top: 20px;
  text-align: right;
}
</style>
