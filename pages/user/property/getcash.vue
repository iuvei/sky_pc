<template>
  <component :is="currentView"></component>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import addBank from '~/components/user/agent/cashTransaction/addBank';
import getcash from '~/components/user/property/getcash';
export default {
  name: 'property-cash',
  data() {
    return {
      currentView: ''
    };
  },
  components: {
    addBank,
    getcash
  },
  computed: {
    ...mapState('userinfo', ['accountInfo']),
    // currentView() {
      // let accountInfo = this.accountInfo;
      // let bank_typename = accountInfo && accountInfo.bank_typename;
      // let view = 'getcash';
      // if (!bank_typename) view = 'addBank';
      // return view;
    // }
  },
  async mounted() {
      let isHasCard = await this.getCashState()
      if (isHasCard){
        this.currentView = 'getcash'
      } else {
        this.currentView = 'addBank'
      }
  },
  methods: {
    // ...mapActions("agent", ["modifyField"])
    ...mapActions('property', ['getCashState']),
  }
};
</script>
<style lang="scss" scoped>
.agent_that_that {
  margin-top: 12px;
  width: 100%;
  height: 626px;
  border: solid 1px #dbdbdb;
  .top_content_that {
    width: 89%;
    height: 50px;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 50px;
    border-bottom: solid 1px #dbdbdb;
    .using_tips {
      color: rgb(12, 238, 132);
    }
    .again_to_determine {
      color: #ff7c34;
    }
  }
  .intro_word_that {
    width: 73%;
    margin-top: 40px;
    margin-left: 220px;
    .intro_word_that_srzh {
      width: 400px;
      height: 200px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px #dbdbdb;
      .intro_word_that_srzh_left {
        margin-right: 5px;
      }
    }
  }
  .next_button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .next_button_button {
    }
  }
}
</style>
