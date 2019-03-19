<template>
  <section class="domain-manage">
    <Row>
      <Col span="8">
      <div class="one-block">
        管理类型：
        <div :class="['check_box',{active: lowerLevelAccount.domainType === 0}]" @click="changeDomainType(0)">我的域名</div>
        <div :class="['check_box',{active: lowerLevelAccount.domainType === 1}]" @click="changeDomainType(1)">下级域名</div>
      </div>
      </Col>
      <Col span="10">&nbsp; </Col>
      <Col span="6" style="text-align:right">
      <Button type="error" icon="plus" @click="addDomain">添加新域名</Button>
      </Col>
    </Row>

    <div class="two-block">
      <Table :data="tableData" :columns="tableColumns"></Table>
    </div>

    <!-- 弹窗 -->
    <addDomainModal v-model="addDomainModalShow"></addDomainModal>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import addDomainModal from '~/components/user/agent/lowerLevelAccount/addDomainModal';
const prefix = 'lowerLevelAccount';

export default {
  name: 'domainManage',
  components: {
    addDomainModal
  },
  data() {
    return {
      actype: 0,
      addDomainModalShow: false,
      tableData: [],
      tableColumns: [
        {
          title: '用户名',
          width: 100,
          key: 'username'
        },
        {
          title: '域名',
          key: 'enom',
          width: 150,
          render: (h, params) => {
            const text = params.row.enom;

            return <i-input type="text" readonly value={text} />;
          }
        },
        {
          title: '解析IP',
          key: 'ip'
        },
        {
          title: '备注',
          key: 'remark',
          render: (h, params) => {
            let row = params.row;
            const text = row.remark;
            return <a href="javascript:void(0)">{text}</a>;
          }
        },
        {
          title: '创建时间',
          width: 160,
          key: 'time'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let text = params.row.status === 4 ? '已审核' : '未审核';
            return <span>{text}</span>;
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, { row }) => {
            let status = row.status;
            if (status === 1) {
              return (
                <div>
                  <i-button
                    onClick={() => this.checkDomain(row, 0)}
                    type="success"
                    size="small"
                  >
                    通过
                  </i-button>
                  <i-button
                    onClick={() => this.checkDomain(row, 1)}
                    type="error"
                    size="small"
                  >
                    拒绝
                  </i-button>
                </div>
              );
            } else return <span>-</span>;
          }
        }
      ]
    };
  },
  computed: {
    ...mapState('agent', ['lowerLevelAccount'])
  },
  watch:{
    addDomainModalShow(addDomainModalShow){
      if(!addDomainModalShow){
        this.initData();
      }
    }
  },
  methods: {
    ...mapActions('agent', ['modifyField', 'getUserEnomList', 'verifyEnmo']),
    changeDomainType(v) {
      let obj = { prefix, params: { domainType: v } };
      this.modifyField(obj);
      this.initData();
    },
    addDomain() {
      this.addDomainModalShow = true;
    },
    async checkDomain({ accid }, status) {
      let data = await this.verifyEnmo({ id: accid, status });
      this.initData();
    },
    async initData() {
      let data = (await this.getUserEnomList()) || [];
      this.tableData = data;
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.domain-manage {
  .one-block {
    padding-bottom: 20px;
  }
}
</style>


