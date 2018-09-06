<template>
  <section class="code-manage">
    <div class="one-block" v-if="!isMode*1">
      开户类型：
      <div :class="['check_box',{active: lowerLevelAccount.selectedAccountType === 1}]" @click="changeSelectedAccountType(1)">总代理</div>
      <div :class="['check_box',{active: lowerLevelAccount.selectedAccountType === 0}]" @click="changeSelectedAccountType(0)">会员</div>
    </div>

    <div class="two-block">
      <Table :data="tableData" :columns="tableColumns"></Table>
      <!-- <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div> -->
    </div>
    <!-- 弹窗 -->
    <remarkModal v-model="remarkModalShow" :data="currentRow"></remarkModal>
    <infoModal v-model="infoModalShow" :data="currentRow"></infoModal>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import remarkModal from "~/components/user/agent/lowerLevelAccount/remarkModal";
import infoModal from "~/components/user/agent/lowerLevelAccount/infoModal";
export default {
  name: "codeManage",
  components: {
    remarkModal,
    infoModal
  },
  data() {
    return {
      currentRow:{},
      remarkModalShow: false,
      infoModalShow: false,
      tableData: [],
      tableColumns: [
        {
          title: "邀请码",
          key: "param",
          width: 130,
          render: (h, params) => {
            const text = params.row.param;
            let directives = [
              {
                name: "clipboard",
                arg: "copy",
                // expression: this.copySuccess,
                value: text
                // modifiers: { skn: true }
              }
              // {
              //   name: "clipboard",
              //   arg: "success",
              //   expression: this.copySuccess,
              //   value: text
              //   // modifiers: { skn: true }
              // }
            ];
            // v-clipboard:copy={text} v-clipboard:success={this.copySuccess}
            return (
              <div>
                <i-input type="text" readonly value={text} />
                <a
                  class="clip_btn"
                  href="javascript:void(0)"
                  onClick={() => this.copySuccess(text)}
                  // v-clipboard={{ arg:'copy', value: text, modifiers: true }}
                  // v-clipboard={{arg:'success', expression: () => this.copySuccess, value: text}}
                  {...{ directives }}
                >
                  复制
                </a>
              </div>
            );
            // return h("div", [
            //   h("Input", {
            //     props: {
            //       type: "text",
            //       readonly: "readonly",
            //       value: text
            //     }
            //   }),
            //   h(
            //     "a",
            //     {
            //       class: "clip_btn",
            //       attrs: {
            //         href: "javascript:void(0)"
            //       },
            //       directives,
            //       on: {
            //         click: () => {
            //           // this.show(params.index)
            //         }
            //       }
            //     },
            //     "复制"
            //   )
            // ]);
          }
        },
        // {
        //   title: "网址",
        //   key: "link",
        //   width: 250,
        //   render: (h, params) => {
        //     const text = params.row.link;
        //     let directives = [
        //       {
        //         name: "clipboard",
        //         arg: "copy",
        //         // expression: this.copySuccess,
        //         value: text
        //         // modifiers: { skn: true }
        //       }
        //     ];

        //     return (
        //       <div>
        //         <i-input type="text" readonly value={text} />
        //         <a
        //           class="clip_btn"
        //           href="javascript:void(0)"
        //           onClick={() => this.copySuccess(text)}
        //           {...{ directives }}
        //         >
        //           复制
        //         </a>
        //       </div>
        //     );
        //   }
        // },
        {
          title: "备注",
          key: "remark",
          render: (h, params) => {
            let row = params.row;
            const text = row.remark || "未设置";
            return <a onClick={() => this.settingRemark(row)}>{text}</a>;
          }
        },
        {
          title: "创建时间",
          width: 160,
          key: "time"
        },
        {
          title: "状态",
          key: "type",
          render: (h, params) => {
            return (
              <div>
                注册(<span style="color: #f33">{params.row.reg_count}</span>)
              </div>
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            return <a onClick={() => this.lookInfo(row)}>详情</a>;
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("agent", ["lowerLevelAccount"]),
    ...mapState("userinfo",["accountInfo"]),
    isMode(){
      return this.accountInfo.agent_mode;
    },
  },
  watch: {
    "lowerLevelAccount.selectedAccountType"() {
      this.initData();
    },
    remarkModalShow(remarkModalShow){
      if(!remarkModalShow){
        this.initData();
      }
    }
  },
  mounted() {
    this.initData();
    // console.log(this.isMode);
  },
  methods: {
    ...mapActions("agent", ["modifyField", "getUserJoinCodeList"]),
    changeSelectedAccountType(n) {
      let obj = {
        prefix: "lowerLevelAccount",
        params: { selectedAccountType: n }
      };
      this.modifyField(obj);
    },
    changePage() {},
    copySuccess(n) {
      this.$Modal.success({ title: "温馨提示", content: "复制成功!" });
      // this.$Modal.warning({
      //   closable: true,
      //   title: `<a class="ivu-modal-close"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
      //   <p slot="header" style="color:#f60;text-align:center">

      //           <span>Delete confirmation</span>
      //         </p>`,
      //   render: h => {
      //     return (
      //       <div>
      //         <p slot="header" style="color:#f60;text-align:center">

      //           <span>Delete confirmation</span>
      //         </p>
      //         <div style="text-align:center">
      //           <p>
      //             After this task is deleted, the downstream 10 tasks will not
      //             be implemented.
      //           </p>
      //           <p>Will you delete it?</p>
      //         </div>
      //         <div slot="footer">
      //           <i-button type="error" size="large" long>
      //             Delete
      //           </i-button>
      //         </div>
      //       </div>
      //     );
      //   }
      // });
    },
    settingRemark(n) {
      this.currentRow = n;
      this.remarkModalShow = true;
    },
    lookInfo(n) {
      this.currentRow = n;
      this.infoModalShow = true;
    },
    async initData() {
      let data = await this.getUserJoinCodeList({ pageid: 0, actype: 2}) || [];
      // console.error(data);
      this.tableData = data;
    }
  }
};
</script>

<style lang="scss">
.code-manage {
  .ivu-table-cell {
    position: relative;
  }
  .two-block {
    padding-top: 20px;
  }
  .clip_btn {
    position: absolute;
    top: 15%;
    right: 26px;
    cursor: pointer;
    color: #33f;
  }
}
</style>


