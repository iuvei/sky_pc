<template>
  <div class="head">
    <div class="head_bjt">
      <div class="head_bjthb">
        <div class="head_kssj">
          <span>
            {{beginTime}}<i>开始</i>
          </span>
          <span> {{etimeTime}}<i>结束</i></span>
        </div>
        <div class="head_qhb" type="primary" @click.stop.prevent="damonClick">
          <div class="head_qhbiocn">
          </div>
        </div>
        <Modal title="" v-model="grabenvelope" :closable="false" ok-text cancel-text class-name="vertical-center-modal">
          <img class="light" src="~/assets/img/rob/background-light.png" alt="">
          <div class="envelope_content">
            <div class="envelope_receivedata" v-if="receivedata.price">
              <p>{{(receivedata.info.substring(0,3))}}</p>
              <p>{{(receivedata.info.substring(3))}}</p>
              <p>获得<i>{{receivedata.price}}</i>元</p>
            </div>
            <div class="envelope_receivedata" v-else>
              <p>很抱歉</p>
              <p>您未满足本次抢红包</p>
              <p>活动条件!</p>
            </div>
          </div>

        </Modal>
      </div>
      <div class="head_qhbjh">
        <div>您当前剩余<i>{{ numberenvelopes * 1 || 0 }}</i>次机会</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
// import secondTime from '~/components/game/ladder/secondTime.vue'
export default {
  name: 'headss',
  components: {},
  data() {
    return {
      grabenvelope: false,
      receivedata: {
        info: ''
      },
      errdata: ''
    }
  },
  mounted() {
    this.RobGiftRemainNumber()
    //  this.RobEventGiftIndex()
  },
  methods: {
    ...mapActions('redenvelope', [
      'isLogin', // 登入
      'RobGiftReward', // 立即抢红包
      'RobGiftRemainNumber', // 红包次数
      'getMyGiftList', // 我的红包
      'RobGiftUserRankingList', // 人品榜单
      'RobEventGiftIndex' // 活动详情
    ]),
    async damonClick() {
      this.receivedata = {}
      if (!this.$store.state.userinfo.isLogin) {
        return this.$Message.warning('请先登录账号再参与本活动!...')
      }
      if (this.numberenvelopes <= 0) {
        this.grabenvelope = true
        return
      }
      this.$Spin.show({
        render: h => {
          return h('div', [
            h('Icon', {
              class: 'demo-spin-icon-load-jz',
              props: {
                type: 'ios-loading',
                size: 22
              }
            }),
            h('div', '正在抢红包...')
          ])
        }
      })
      // setTimeout(() => {
      //   this.$Spin.hide()
      // }, 3000)
      let [err, data] = (await this.RobGiftReward()) || {}
      if (err) {
        this.$Spin.hide()
        this.errdata = err
      }
      if (data) {
        this.$Spin.hide()
        this.grabenvelope = true
        this.receivedata = data
        this.getMyGiftList()
        this.RobGiftUserRankingList()
        this.RobGiftRemainNumber()
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(['userinfo']),
    ...mapState('redenvelope', [
      // 'membersReceive',
      'numberenvelopes',
      'redeventdetails'
    ]),
    beginTime() {
      if (!this.redeventdetails.btime) {
        return '__-__-__ -- : -- : --'
      }
      return new Date(this.redeventdetails.btime * 1000).format(
        'yyyy-MM-dd hh:mm:ss'
      )
    },
    etimeTime() {
      if (!this.redeventdetails.etime) {
        return '__-__-__ -- : -- : --'
      }
      return new Date(this.redeventdetails.etime * 1000).format(
        'yyyy-MM-dd hh:mm:ss'
      )
    }
  }
}
</script>

<style lang="less">
.demo-spin-icon-load-jz {
  animation: ani-demo-spin 1s linear infinite;
}
.vertical-center-modal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: rgb(31, 13, 13);
  .ivu-modal {
    top: -150px;
    width: 480px !important;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal-content {
      width: 382px !important;
      height: 350px;
      top: 110px;
      background: url('~/assets/img/rob/redbag3.png');
      background-size: contain;
      background-repeat: no-repeat;
      .ivu-modal-body {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .light {
          width: 480px;
          right: -38px;
          position: absolute;
          z-index: -100;
          top: -188px;
          animation: lightMove 8s linear infinite;
        }
        @keyframes lightMove {
          from {
            transform-origin: center;
            transform: rotate(0deg);
          }
          to {
            transform-origin: center;
            transform: rotate(360deg);
          }
        }
        .envelope_content {
          width: 70%;
          height: 100%;
          color: rgb(104, 25, 30);
          font-size: 20px;
          margin-right: 33px;
          display: flex;
          align-items: center;
          justify-content: center;
          .envelope_receivedata {
            width: 100%;
            margin-top: 18px;
            text-align: center;
            p {
              padding: 4px 0;
            }
            p:nth-child(1) {
              font-size: 25px;
            }
            p:nth-child(3) {
              i {
                font-style: normal;
                color: red;
              }
            }
          }
        }
      }
      .ivu-modal-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-btn-primary {
          width: 40px;
          height: 40px;
          margin-bottom: -410px;
          padding-right: 94px;
          border: none;
          background: url('~/assets/img/rob/shut-down.png');
          background-repeat: no-repeat;
        }
      }
    }
  }
}
.ivu-modal-footer {
  border-top: none;
}
</style>
<style lang="scss" scoped>
.head {
  width: 100%;
}
.head .head_bjt {
  width: 100%;
  min-height: 1080px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .head_bjthb {
    width: 380px;
    height: 420px;
    margin-top: 100px;
    background-image: url('~/assets/img/rob/redbag2.png');
    background-repeat: round;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .head_kssj {
      font-size: 20px;
      color: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 110px;
      span {
        padding-top: 15px;
      }
      i {
        font-style: normal;
        margin-left: 8px;
      }
    }
    .head_qhb {
      width: 240px;
      height: 60px;
      margin-top: 50px;

      .head_qhbiocn {
        width: 100%;
        height: 100%;
        background-image: url('~/assets/img/rob/red-button.png');
        background-repeat: round;
      }
    }
  }
  .head_qhbjh {
    font-size: 24px;
    margin-top: 20px;
    color: #000;
    i {
      margin: 0 10px;
      font-style: normal;
      color: red;
    }
  }
}
</style>
