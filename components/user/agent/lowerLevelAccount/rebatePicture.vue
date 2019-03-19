<template>
    <section class="rebate_pic" v-if="agentStrLength>2">
        <div class="pic_box">
            <img v-if="agentStrLength ==3" :src="require('~/assets/img/agent_3.png')" alt="">
            <img v-if="agentStrLength ==4" :src="require('~/assets/img/agent_4.png')" alt="">
            <img v-if="agentStrLength ==5" :src="require('~/assets/img/agent_5.png')" alt="">
        </div>
        <div class="detail_box" v-if="this.agentStrLength">
            <div class="detail">
                <img src="~/assets/img/agent_alert.png" alt="">
                <div>
                    <span v-for="(item,index) in agentStr" :key="index">
                        <span v-if="index == 0">A={{item}}%</span>
                        <span v-if="index>0">A{{index}}={{item}}%</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="four-block">
            <div class="check_box active" @click="generateCode">生成邀请码</div>
        </div>
    </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  data(){
    return{
      agentStr:[]
    }
  },
  mounted(){
    this.strFormate();
    // console.log(this.agentStrLength);
  },
  computed:{
    ...mapState('userinfo',['accountInfo']),
    ...mapGetters('agent', ['rateSetting']),
    agentStrLength(){
      return this.agentStr.length;
    }
  },
  methods:{
    ...mapActions('agent',['modifyField','createJoinCode']),
    strFormate(){
      this.agentStr = this.accountInfo.agent_str.split(',').reverse();
    },
    async generateCode() {

      let { vssc, vk3, v11x5, v3d, vpk10, vpcdd, vlhc } = this.rateSetting;
      let data = await this.createJoinCode({
        vssc,
        vk3,
        v11x5,
        v3d,
        vpk10,
        vpcdd,
        vlhc
      });
      // console.error(data);
      if (data) {
        this.$Modal.success({
          title: '温馨提示',
          content: '创建成功!',
          onOk: () => {
            let obj = {
              prefix: 'lowerLevelAccount',
              params: { view: 'codeManage' }
            };
            this.modifyField(obj);
          }
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rebate_pic {
  width: 100%;
  min-height: 450px;
  padding-bottom: 30px;
  border: 1px solid #cccccc;
  img {
    margin-top: 5%;
    display: inline-block;
  }
  .pic_box {
    text-align: center;
  }
  .detail_box {
    width: 100%;
    font-size: 14px;
    text-align: center;
    .detail {
      width: 60%;
      border: 1px solid #f9e4c4;
      padding: 10px;
      margin-top: 50px;
      border-radius: 5px;
      background-color: #fdf4e5;
      color: #000;
      display: inline-block;
      img {
        float: left;
        width: 40px;
        margin: 0;
        vertical-align: middle;
      }
      div {
        display: inline-block;
        span {
          display: inline-block;
          width: 90px;
        }
      }
    }
  }
  .four-block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>


