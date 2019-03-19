<template>
  <div class="apply-agent">
    <div v-if="!isAgent" class="one-block">
      <h3>什么是代理？</h3>
      <p>可获得的返点,等于自身返点与下级返点的差值,如自身返点5,下级返点3,你将能获得下级投注金额2%的返点,如下级投注100元,你将获得2元.点击下级开户,可查看自身返点,也可为下级设置返点.</p>
      <h3>申请代理有什么好处？</h3>
      <p>可获得的返点,等于自身返点与下级返点的差值,如自身返点5,下级返点3,你将能获得下级投注金额2%的返点,如下级投注100元,你将获得2元.点击下级开户,可查看自身返点,也可为下级设置返点.</p>
      <Button type="error" @click="applyAgent">申请代理</Button>
    </div>
    <div v-else class="two-block">
      <p class="box1_head">温馨提示</p>
      <p class="box2_head">审核时间24小时之内给以回复，请注意接收信息</p>
      <div class="box3_head">
        <img src="~/assets/img/user-agent-checking.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'applyAgent',
  data() {
    return {}
  },
  components: {},
  computed: {
    ...mapState('agent', ['isAgent'])
  },
  fetch({ store }) {
    // 代理是否审核
    store.dispatch('agent/isDailiVerify')
  },
  mounted() {
    this.isDailiVerify()
  },
  methods: {
    ...mapActions('agent', ['ApplyDaili', 'isDailiVerify']),
    async applyAgent() {
      await this.ApplyDaili()
      setTimeout(this.isDailiVerify, 3000)
    },
    async initData() {
      let data = (await this.getChlidStatic(params)) || []
      this.tableData = data
      // console.error(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-agent {
  line-height: 23px;
  .one-block {
    text-align: center;
    padding: 20px;
    p {
      text-align: left;
    }
  }

  .box1_head {
    font-family: SimHei;
    color: #00ccff;
    margin-left: 50px;
    margin-top: 20px;
    font-size: 20px;
  }
  .box2_head {
    font-family: SimHei;
    color: #ff9933;
    margin-left: 50px;
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    margin-right: 50px;
    padding-bottom: 20px;
  }
  .box3_head {
    line-height: 500px;
    text-align: center;
    img {
      width: 250px;
      height: 60px;
    }
  }
}
</style>
