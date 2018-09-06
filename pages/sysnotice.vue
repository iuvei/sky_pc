<template>
  <div class="sys-notice">
    <Modal title="系统公告" v-model="syStyle" ok-text="不再提示" cancel-text="知道了" :styles="{top: '200px'}">
      <div class="sys_tab">
        <div class="left_con">
          <p v-for="(item, index) in sysNotice" :key="index">
            <span v-html="item.content"></span>
            <Divider dashed/>
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    data () {
        return {
              title: []
            }
        },
    computed:{
        ...mapGetters("sysinfo",["syStyleGetting"]),
        ...mapState({
            islogin: state=> state.userinfo.isLogin,
            logout: state=> state.userinfo.logout,
            sysNotice:state=> state.sysinfo.sysNotice
        }),
        syStyle: {
                get(){
                    let syStyle = this.syStyleGetting;
                    return  syStyle;
                },
                set(style){
                    this.setSyStyle(style);
                }
            },
    },
    async mounted(){
        if(this.logout){
            await this.getNoticeAppForOffline();
            if(this.sysNotice !== ""){
                this.setSyStyle(true);
            }
            let rowModal = this.$AppModal({
                visible: true,
                title: "注单详情",
                showFoot: false,
                customClass: "row-info",
                component: CartInfo,
                componentData: JSON.parse(JSON.stringify(row)),
                beforeClose: b => {
                if (b) {
                    this.rollback({ gameid: row.gameid, guid: row.guid }).then(res => {
                    rowModal.visible = false;
                    });
                } else {
                    rowModal.visible = false;
                }
                }
            });
        }
    },
    methods:{
        ...mapActions("sysinfo",["getOfflineSysMes"]),
        ...mapMutations("sysinfo",["setSyStyle","setSysNotice"]),

        async getNoticeAppForOffline(){
            let res = await this.getOfflineSysMes();
            this.title = res
            if (res && Array.isArray(res) && res.length) {
                // let a = res == 0 ? 0 : res
                let arr = res.map(n => {
                  var temp = document.createElement('div')
                  temp.innerHTML = this.decode(n.content)
                  var output = temp.innerText || temp.textContent
                  temp = null
                  n.content = output
                  return n
                })
                this.setSysNotice(arr)
                this.setSyStyle(true);
            }
        }
      }
    };
</script>
<style lang="scss">
.sysNotice {
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
      .sys_tab {
        .left_con {
          max-height: 500px;
          overflow: hidden;
        }
      }
    }
  }
}
.sys-notice {
  .ivu-modal-content {
    border-radius: 4px;
  }
  .ivu-modal-header {
    background: #383838;
    color: #fff;
    .ivu-modal-header-inner {
      text-align: center;
      font-weight: bold;
      font-size: 17px;
      letter-spacing: 2px;
    }
  }
}
</style>




