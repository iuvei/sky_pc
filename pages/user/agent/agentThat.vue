<template>
  <div class="agent_that">
    <div class="top_content">
      <div class="the_middle_picture">
        <img src="~/assets/img/daili_detail_header.png" alt="">
      </div>
      <div class="intro_word" v-html="agentIntro">
        <!-- <h4>当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，既可以自己投注，也可以发展下级玩家，赚取返点佣金</h4>
        <p class="title">如何赚取返点？</p>
        <p>可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点 ，如下级投注100元，你将会获得2元。点击下级开户，可查看自身返点，也可为下级设置返点。</p>
        <p class="title">如何为下级开户?</p>
        <p>点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码 ，将邀请码 发送给您的下级注册，注册后他就是您的下级 ，点击下级会员管理，就能查看他注册的账号;如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级 ，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心</p>
        <p class="title">温馨提示:</p>
        <p>1.返点不同赔率也不同，点击返点赔率表，可查看返点赔率；</p>
        <p>2.返点越低，赔率就越低，建议为下级设置的返点不要过低；</p>
        <p>3.可在代理报表、投注明细、交易明细查看代理的发展情况；</p>
        <p>4.建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { error } from 'util'
export default {
  name: 'userAgentThat',
  computed: {
    ...mapState('agent', ['agentIntro'])
  },
  mounted() {
    this.getAgentInfo()
  },
  methods: {
    ...mapActions('agent', ['getAgentInfo'])
  }
}
</script>
<style lang="scss" scoped>
.agent_that {
  .top_content {
    margin-top: 12px;
    width: 100%;
    min-height: 626px;
    border: solid 1px #dbdbdb;
    .the_middle_picture {
      img {
        padding: 10px;
        width: 100%;
        height: 120px;
      }
      h5 {
        margin-top: 0 10px;
      }
    }
    .intro_word {
      margin: 0 10px;
      font-size: 14px;
      width: 99%;
      .title {
        margin-top: 25px;
        font-size: 15px;
        color: rgb(31, 144, 219);
      }
    }
  }
}
</style>
