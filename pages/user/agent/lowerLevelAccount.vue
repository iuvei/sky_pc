<template>
  <div class="lower-level-account">
    <Tabs v-model="currentView">
      <TabPane label="返点设置" name="rebateSetting" v-if="isMode !== '1'"></TabPane>
      <TabPane label="返点示意图" name="rebatePicture" v-if="isMode == '1'"></TabPane>
      <TabPane label="邀请码管理" name="codeManage"></TabPane>
      <TabPane label="域名管理" name="domainManage"></TabPane>
    </Tabs>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import rebatePicture from "~/components/user/agent/lowerLevelAccount/rebatePicture";
import rebateSetting from "~/components/user/agent/lowerLevelAccount/rebateSetting";
import codeManage from "~/components/user/agent/lowerLevelAccount/codeManage";
import domainManage from "~/components/user/agent/lowerLevelAccount/domainManage";
export default {
  name: "lowerLevelAccount",
  data() {
    return {};
  },
  mounted(){
    this.getDomainList();
    
  },
  components: {
    rebateSetting,
    codeManage,
    domainManage,
    rebatePicture
  },
  computed: {
    ...mapState("agent", ["lowerLevelAccount"]),
    // ...mapGetters("agent", ["getLowerLevelView"]),
    ...mapState("userinfo",["accountInfo"]),
    isMode(){
      const isMode = this.accountInfo.agent_mode
      if(this.lowerLevelAccount.view ==='rebateSetting' || this.lowerLevelAccount.view ==='rebatePicture'){
        let view = isMode === '1' ? 'rebatePicture' : 'rebateSetting'
        let obj = { prefix: "lowerLevelAccount", params: { view } };
        this.modifyField(obj);
      }
      return isMode;
    },
    currentView: {
      get() {
        // if(this.isMode*1 && this.lowerLevelAccount.view ==='rebateSetting')return 'rebatePicture'
           return this.lowerLevelAccount.view;
      },
      set(view) {
        let obj = { prefix: "lowerLevelAccount", params: { view } };
        this.modifyField(obj);
      }
    }
  },
  watch: {
    currentView(v) {
      switch (v) {
        case "rebateSetting":
          this.getDomainList();
          break;
        case "rebatePicture":
          this.modifyDefault();
          break;
      }
    }
  },
  methods: {
    ...mapActions("agent", [
      "modifyField",
      "getUsefulEnomList",
      "modifyDefault"
    ]),
    async getDomainList() {
      let data = await this.getUsefulEnomList() || [];
      data = [{ id: 0, enom: "使用默认" }, ...data];
      data = { prefix: "lowerLevelAccount", params: { domainList: data } };
      this.modifyField(data);
      if(this.userStr){
        this.modifyDefault(data)
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.lower-level-account {
  color: #555;
  line-height: 30px;
  .check_box.active {
    background: red;
    color: #fff;
    cursor: default;
  }
  .check_box {
    display: inline-block;
    width: 100px;
    line-height: 30px;
    height: 30px;
    text-align: center;
    font-size: 14px;
    color: red;
    border: 1px Solid red;
    cursor: pointer;
  }
}
</style>
