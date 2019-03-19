<template>
  <div>
    <Table :columns="header" :data="basicData"></Table>
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
          'title': '系统消息',
          'key': 'action',
          'align': 'left',
          'width': 660,
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
          'title': '时间',
          'key': 'time',
          'align': 'left',
          'width': 160,
          'sortable': true
        }
      ],
      basicData: [
        {
          content: '网站并没有申请可信网站认证',
          time: '2018-05-03 14:31:08'
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
<style lang="scss"></style>
