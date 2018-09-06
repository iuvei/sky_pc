<template>
  <div class='user-info'>
    <div v-if="isGuest" style="flex:1"></div>
    <div class="avator" :class="{'pd':isGuest}" @click="$router.push('/user/account/info')">
      <Avatar icon="md-person" :src="userinfo && userinfo.head_icon" />
      <span>{{userinfo.username}}</span>
    </div>
    <span :class="{'pd':isGuest}">账户余额:&nbsp;&nbsp;{{userinfo && userinfo.price}} 元</span>
    <i class="refresh" @click="flushPrice">
    </i>
    <div class="gift" v-show="isLogin && !isGuest && redGift" @click="getGifs">
      <img :class="{'active':redGift}" src="~/assets/img/hongbao.png" alt="">
    </div>

    <ul>
      <li v-if="!isGuest">|</li>
      <li v-if="!isGuest">
        <a href="/user/property/getcash">提现</a>
      </li>
      <li v-if="!isGuest">|</li>
      <li v-if="!isGuest">
        <a href="/user/property/recharge">充值</a>
      </li>
      <li v-if="!isGuest">|</li>
      <li v-if="!isGuest">
        <a href="/user/promotion/sign">签到</a>
      </li>
      <li>|</li>
      <li>
        <router-link :to="'/user/account/info'">我的账户</router-link>
      </li>
      <li>|</li>
      <li>
        <a href="" @click.stop.prevent="userLogout">退出</a>
      </li>
    </ul>
    <Modal v-model="modal3" :closable="false" class="gift_pop_win">
      <p slot="header"></p>
      <div class="content">
        <p class="head">恭喜您</p>
        <p class="cent">
          <span>获得{{title}}</span>
          <span class="price">{{price}}元</span>
        </p>
        <p class="foot">请注意查收！</span>
        </p>
        <img src="~/assets/img/gethongbao.png" alt="">
      </div>
      <div class="intro">
        <p>10.10-10.11 忠实会员优秀代理大回馈代理越多反馈越多，一起共创辉煌！</p>
        <button @click="modal3=false">确定</button>
      </div>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data(){
    return{
      price:"",
      title:"",
      model:"",
      modal3:false,
    }
  },
  name: "userInfo",
  computed: {
    ...mapState({
      userinfo: state => state.userinfo.accountInfo,
      isLogin: state => state.userinfo.isLogin,
      user_flag: state => state.userinfo.user_flag
    }),
    redGift(){
      return  1 & this.user_flag ? 1 : 0;
    },
    isGuest(){
      return this.userinfo && this.userinfo.test === 2;
    }
  },
  mounted() {
    this.flushPrice();
  },
  methods: {
    async flushPrice() {
      let price = await this.$store.dispatch("userinfo/flushPrice");
    },

    async userLogout() {
      if (this.userinfo.uid) {
        let logoutResult = await this.$store.dispatch(
          "userinfo/logout",
          this.userinfo
        );
          this.$Message.success("您已成功退出");
          this.$router.push("/");
      }
    },

    async getGifs() {
      if(this.redGift){
        let res = await this.$store.dispatch("userinfo/getGifs");
        this.price = res.price;
        this.title = res.title;
        this.model = res.model;
        this.flushPrice();
        if (res.price !== "") {
          this.modal3 = true;
        }
        return res;
      }else{
        this.$Message.warning("您的红包奖励已经领完！");
        return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  min-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  > .refresh {
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: url(~/assets/img/icon_refresh.jpg) no-repeat top center;
    background-size: 20px 20px;
    transition: transform 0.3s ease;
    &:hover {
      transform: rotate(180deg);
    }
  }
  > .gift {
    position: relative;
    cursor: pointer;
    width: 26px;
    height: 26px;
    // background: url(~/assets/img/hongbao.png) no-repeat top center;
    background-size: 26px 26px;
    // .aler_point{
    //   position: absolute;
    //   width: 5px;
    //   height:5px;
    //   border-radius: 50%;
    //   background-color: red;
    //   top: -2px;
    //   right: -2px;
    // }
    img {
      display: inline-block;
      width: 26px;
      height: 26px;
    }
    @keyframes redbag {
      from {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      30% {
        -webkit-transform: scale3d(1.25, 0.75, 1);
        transform: scale3d(1.25, 0.75, 1);
      }

      40% {
        -webkit-transform: scale3d(0.75, 1.25, 1);
        transform: scale3d(0.75, 1.25, 1);
      }

      50% {
        -webkit-transform: scale3d(1.15, 0.85, 1);
        transform: scale3d(1.15, 0.85, 1);
      }

      65% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      95% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      to {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
    .active {
      animation: redbag 1s ease infinite;
    }
  }
  > ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      list-style: none;
      color: #999;
      padding: 0 3px;
    }
    a {
      color: #999;
    }
  }
  .ivu-avatar-icon {
    margin-right: 5px;
  }
  .pd {
    padding: 0 10px 0 4px;
  }
  .avator {
    cursor: pointer;
  }
}

.ivu-modal-wrap {
  position: relative;
  top: 100px;
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #878787;

    .ivu-modal {
      top: 0;
    }
  }
  .ivu-modal-header {
    display: none;
  }
  .ivu-modal-body {
    .content {
      img {
        position: absolute;
        z-index: 10;
        top: -100px;
        height: 800px;
      }
      .head {
        position: absolute;
        width: 270px;
        height: 35px;
        line-height: 35px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
        top: 205px;
        left: 165px;
        text-align: center;
        z-index: 100;
      }
      .cent {
        position: absolute;
        width: 270px;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        top: 250px;
        left: 165px;
        z-index: 100;
        text-align: center;
        .price {
          color: red;
          font-size: 18px;
        }
      }
      .foot {
        position: absolute;
        width: 270px;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        top: 280px;
        left: 265px;
        z-index: 100;
      }
    }
    .intro {
      position: absolute;
      width: 275px;
      top: 360px;
      left: 165px;
      z-index: 100;
      font-size: 14px;
      color: #fff;
      text-align: center;
      p {
        width: 100%;
        height: 20px;
        line-height: 20px;
      }
      button {
        outline: none;
        border: 0;
        margin-top: 40px;
        text-decoration: none;
        padding: 15px 30px;
        background-color: #fff;
        color: red;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        color: #fff;
        background-color: red;
      }
    }
  }
}
</style>

<style lang="scss">
// .user-info{
.gift_pop_win {
  .ivu-modal-content {
    background-color: #878787 !important;
    // position: relative;
    // background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
    .ivu-modal-header {
      border: 0;
    }
    .ivu-modal-body {
      padding: 0 !important;
      font-size: 0 !important;
      line-height: 0 !important;
    }
    .ivu-modal-footer {
      border: none;
    }
  }
}
// }
</style>
