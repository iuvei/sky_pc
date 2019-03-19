<template>
  <div class="sys-notice">
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import NoticeConent from './noticeContent';
export default {
  name:'sysnotice',
  components:{
    NoticeConent
  },
  data () {
    return {
      title: []
    }
  },
  computed:{
    ...mapGetters('sysinfo',['syStyleGetting']),
    ...mapState({
      islogin: state => state.userinfo.isLogin,
      logout: state => state.userinfo.logout,
      sysNotice:state => state.sysinfo.sysNotice,
      userinfo: state => state.userInfo.accountInfo
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
    await this.showModal()
  },
  methods:{
    ...mapActions('sysinfo',['getOfflineSysMes', 'getOnlineSysMes']),
    ...mapMutations('sysinfo',['setSyStyle','setSysNotice']),
    //获取离线公告
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
    },
    // 获取会员在线公告
    async getOnlineMes() {
      let res = await this.getOnlineSysMes();
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
    },
    // 显示
    async showModal(){
      if(this.islogin){
        // await this.getNoticeAppForOffline();
        await this.getOnlineMes();
      }
      else{
        await this.getNoticeAppForOffline();
      }
      if(this.sysNotice !== ''){
        this.setSyStyle(true);
        let noticeModal = this.$AppModal({
          visible: true,
          title: '系统公告',
          showFoot: false,
          customClass: 'sys-notice',
          component: NoticeConent,
          componentData: JSON.parse(JSON.stringify(this.sysNotice)),
          beforeClose: b => {
            noticeModal.visible = false;
          }
        });
      }
    }
  },
  watch:{
    async '$store.state.userinfo.isLogin'(newVal, oldVal){
      if(newVal && !oldVal)
        await this.showModal()
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
  border-radius: 4px !important;
  width: 700px !important;
  // height: 453px;
  .ivu-modal-content {
    border-radius: 4px;
  }
  .ivu-modal-header,
  .head {
    background: #383838 !important;
    justify-content: center !important;
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




