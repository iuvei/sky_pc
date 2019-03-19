<template>
  <div class="wrap">
    <div class="main_title">
      <div class="hshz"></div>
      <div>热门游戏</div>
    </div>
    <div class="hotyouxi_top">
      <div class="hotyouxi" v-for="(v,k) in thegameListHot.game_list" :key="k">
        <div class="left">
          <div class="left_img">
            <img :src="v.image_url" alt="图片">
          </div>
        </div>
        <div class="center" @click="judge(v)">
          <div class="game_name">{{v.game_name}}</div>
          <div class="jlyouxi">
            <span>进入游戏</span>
          </div>
        </div>
        <!-- <div class="right">
          <div
            class="next"
            v-show="userinfo.accountInfo.test === 2"
          >试玩</div>
        </div> -->

      </div>
    </div>
    <div class="paging">
      <Page :total="thegameListHot.count" :current="pageid" :page-size="pageSize" show-total placement="top" @on-change="handlePage">
      </Page>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import debounce from "lodash/debounce";
export default {
  name: "hotyouxi",
  components: {},
  // props: ['jstag'],
  data() {
    return {
      pageid: 1,
      pageSize: 20,
      count: ""
    };
  },
  mounted() {
    this.loadMoreLists();
  },
  methods: {
    ...mapActions("userinfo", ["flushPrice"]),
    ...mapActions("thegame", ["GetH5GameList", "GetWebGameUrl"]),
    // 判断登录状态
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
    async toOpenTry({ id }) {
      // 方法1:先请求url再弹窗,Safari浏览器基本是拦截掉了
      // // let newWin = window.open(
      // //   '',
      // //   '_blank',
      // //   'width=1200,height=1000,top=100,left=100'
      // // )
      // let gmurl = await this.GetWebGameUrl({ gameId: id })
      // if (gmurl) {
      //   // newWin.location.href = gmurl
      //   window.open(gmurl, '_blank', 'width=1200,height=800,top=100,left=100')
      //   // this.$Modal.confirm({
      //   this.$Modal.info({
      //     title: '确认退出游戏？',
      //     onOk: () => {
      //       this.flushPrice({ click: 1 })
      //       this.$Message.info({ content: '退出游戏成功', duration: 3 })
      //     }
      //     // onCancel: () => {
      //     //   this.$Message.info('点击取消按钮')
      //     // }
      //   })
      // } else {
      //   this.$Modal.info({ content: '游戏不存在！' })
      // }
      // 方法2:先弹窗再请求url替换,不会在拦截弹窗
      let newWin = window.open(
        "",
        "_blank",
        "width=1200,height=1000,top=100,left=100"
      );
      let [err, gmurl] = await this.GetWebGameUrl({ gameId: id });
      if (err) {
        newWin.close();
        return;
      }
      if (gmurl) {
        newWin.location.href = gmurl;
        // 方法1 手动刷新金额,自定义时长提醒
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
        //   },
        // })
      }
    },

    // 获取分页游戏列表
    loadMoreLists: debounce(async function() {
      let params = {
        tag: this.tag,
        pageid: this.pageid - 1
      };
      // console.log("333", params);
      let dataHot = (await this.GetH5GameList(params)) || [];
      return dataHot;
    }, 200),
    handlePage(value) {
      this.pageid = value;
      // debugger
      this.loadMoreLists();
    }
  },
  watch: {
    menuTag: "loadMoreLists"
  },
  computed: {
    ...mapState(["userinfo"]),
    ...mapState("thegame", ["thegameListHot", "menuTag"])
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
  height: 30px; // text-indent: 30px;
  display: flex;
}
.wrap .main_title .hshz {
  width: 4px;
  height: 30px;
  background: red;
  margin: 0 0.5rem 0 0.9rem;
}
.hotyouxi_top {
  min-height: 20rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  .hotyouxi:hover {
    box-shadow: 0px 0px 10px gray;
    transform: scale(1.1);
  }
  .hotyouxi {
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
.paging {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
