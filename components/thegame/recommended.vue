<template>
  <div class="wrap">
    <div class="main_title">
      <div class="hshz"></div>
      <div>推荐游戏</div>
    </div>
    <div class="tjyouxi_top">
      <div class="tjyouxi" v-for="(v,k) in thegameListTj" :key="k">
        <div class="left">
          <div class="left_img">
            <img :src="v.image_url" alt="">
          </div>
        </div>
        <div class="center" @click="judge(v)">
          <div class="game_name">{{v.game_name}}</div>
          <div class="jlyouxi">
            <span>进入游戏</span>
          </div>
        </div>
        <!-- <div class="right">
            <div class="next" v-show="userinfo.accountInfo.test === 2">试玩</div>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import debounce from "lodash/debounce";
export default {
  name: "recommended",
  components: {},
  // props: ['tag'],
  data() {
    return {};
  },
  mounted() {
    this.GetWebGameHotList2();
  },
  methods: {
    ...mapActions("userinfo", ["flushPrice"]),
    ...mapActions("thegame", ["GetWebGameHotList", "GetWebGameUrl"]),
    GetWebGameHotList2: debounce(async function() {
      this.GetWebGameHotList();
    }, 200),
    judge(v) {
      if (this.userinfo.accountInfo.test === 2) {
        this.$Message.warning("试玩账号不可以进行此操作!");
        return;
      }
      if (!this.$store.state.userinfo.isLogin) {
        this.$Message.warning("请先登录账号再玩......");
      } else {
        this.toOpenTry(v);
      }
    },
    // 获取电子游戏登录链接
    async toOpenTry({ gameid: gameId, tag }) {
      let newWin = window.open(
        "",
        "_blank",
        "width=1200,height=1000,top=100,left=100"
      );
      let [err, gmurl] = await this.GetWebGameUrl({ gameId, tag });
      if (err) {
        newWin.close();
        return;
      }
      if (gmurl) {
        newWin.location.href = gmurl;
        // 方法1  手动刷新金额,自定义时长提醒
        this.$Notice.info({
          title: "温馨提示:",
          // desc: "退出游戏请点击账户余额旁边按钮刷新余额",
          desc:
            "退出游戏15秒左右账户余额未刷新,请手动点击账户余额旁边按钮刷新余额!",
          duration: 150
        });
        // 方法2 退出游戏自动刷新金额,
        // this.$Modal.info({
        //   title: '确认退出游戏？',
        //   onOk: () => {
        //     this.flushPrice({ click: 1 })
        //     this.$Message.info({ content: '退出游戏成功', duration: 3 })
        //   }
        // })
      }
    }
  },
  watch: {
    menuTag: "GetWebGameHotList2"
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapState("thegame", ["thegameListTj", "menuTag"])
  }
};
</script>

<style lang="scss" scoped>
.wrap .main_title {
  width: 100%;
  border: none;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  height: 30px;
  // text-indent: 30px;
  display: flex;
}
.wrap .main_title .hshz {
  width: 4px;
  height: 30px;
  background: red;
  margin: 0 0.5rem 0 0.9rem;
}
.tjyouxi_top {
  min-height: 8rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  .tjyouxi:hover {
    box-shadow: 0px 0px 10px gray;
    transform: scale(1.1);
  }
  .tjyouxi {
    background-color: #ffffff;
    border-radius: 6px;
    border: #cacaca 1px solid;
    width: 23.5%;
    height: 106px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    transition: all 0.6s;
    margin-top: 1.1rem;
    margin-left: 1.3%;
    .left {
      width: 45%;
      padding-left: 1rem;
      .left_img {
        width: 70px;
        height: 70px;
        background-size: contain;
        border-radius: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .center {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      .game_name {
        font-size: 1rem;
        height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        // border: #cacaca 1px solid;
      }
      .jlyouxi {
        width: 60%;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #df1e1e;
        margin-top: 0.2rem;
        border-radius: 3px;
        span {
          color: #fff;
        }
      }
    }
    .right {
      width: 15%;
      height: 95%;
      font-size: 0.8rem;
      color: rgb(235, 30, 30);
    }
  }
}
</style>
