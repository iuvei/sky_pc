<template>
  <div class="activity-container">
    <div class="headrs">
      <img src="/head_t.png" width="285px" height="54px">
    </div>
    <div class="beijin_m">
      <div class="event_content" v-for="(item, index) in list" :key="index">
        <div class="yh_box">
          <img :src="item.pc_head">
          <div class="right">
            <h1 style="width: 210px;height: 27px; overflow: hidden;" :title="item.event_title">{{item.event_title}}</h1>
            <p :title="item.event_short">{{item.event_short}}</p>
            <button class="btns" @click="toggle(item, $event)">查看详情
              <span class="xuanzhuan"></span>
            </button>
          </div>
        </div>
        <AppCollapse :open="item.show" class="app-collapse">
          <div class="wz" v-html="item.event_detail">
          </div>
        </AppCollapse>
      </div>
      <p class="no_activities" v-if="!list.length">暂无活动记录，敬请期待～</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "activies",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  filters: {
    format(val) {
      val = Number(val);
      // 0=所有人, 1=会员, 2=代理
      switch (val) {
        case 0:
          return "所有人";
        case 1:
          return "所有会员";
        case 2:
          return "所有代理";
      }
    }
  },
  methods: {
    ...mapActions("signIn", ["getGameEventList", "getEventContent"]),
    async getData() {
      if (process.browser) {
        let _list = await this.getGameEventList();
        _list.forEach(x => {
          x.event_detail = null;
          x.show = false;
        });
        // if (_list && _list.length) {
        //   let div = window.document.createElement("div");
        //   _list.forEach(item => {
        //     let c = unescape(item.event_detail);
        //     div.innerHTML = c.replace(/\\u0026/g, "&");
        //     let output = div.innerText || div.textContent;
        //     item.event_detail = output;
        //     item.show = false;
        //   });
        //   div = null;
        // }
        this.list = _list;
      }
    },
    async getContent(eid) {
      let result = await this.getEventContent(eid);
      if (result) {
        let decodedStr = this.decode(result),
          div = window.document.createElement("div");
        let c = unescape(decodedStr);
        div.innerHTML = c.replace(/\\u0026/g, "&");
        let output = div.innerText || div.textContent;
        return output;
        div = null;
      }
      return "";
    },
    async toggle(item, event) {
      if (!item.event_detail) {
        item.event_detail = await this.getContent(item.event_id);
      }

      this.$nextTick(() => {
        if (item.event_detail.length) {
          item.show = !item.show;
          const el = event.target;
          if (!el.classList.contains("open")) {
            el.classList.add("open");
          } else {
            el.classList.remove("open");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.activity-container {
  min-height: calc(100vh - 422px);
}

.headrs {
  margin: auto;
  width: 1000px;
  position: relative;
  height: 41px;
  background: url(~/head_beijin.png) no-repeat;
  margin-top: 30px;
  img {
    position: absolute;
    top: -15px;
    right: 350px;
  }
}

.beijin_m {
  width: 1000px;
  padding-top: 35px;
  margin: auto;
  padding-bottom: 30px;
  background: #eeeeee;
  margin-bottom: 30px;
  .no_activities {
    text-align: center;
    font-size: 30px;
    color: #bbb;
    font-style: italic;
  }
  .yh_box {
    width: 946px;
    height: 174px;
    border: 1px #dcdcdc solid;
    margin: auto;
    margin-bottom: 35px;
    background: #ffffff;
    transition: all 0.3s ease;
    box-shadow: 1px 1px 3px #a0a0a0;
    &:hover {
      box-shadow: 2px 2px 5px #a0a0a0;
    }
    > img {
      width: 693px;
      height: 142px;
      float: left;
      margin: 17px;
    }
    .right {
      float: right;
      p {
        text-align: left;
        color: #959595;
        font-family: "微软雅黑";
        font-size: 13px;
        width: 200px;
        line-height: 2;

        &:nth-child(1),
        &:nth-child(2) {
          overflow: hidden;
          display: block;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    h1 {
      margin-top: 22px;
      color: #ea5903;
      font-size: 20px;
      font-family: "微软雅黑";
      text-align: left;
      overflow: hidden;
      width: 210px;
      height: 27px;
      overflow: hidden;
    }
    .btns {
      float: left;
      background: #e93248;
      height: 30px;
      width: 105px;
      text-align: left;
      text-indent: 10px;
      line-height: 30px;
      cursor: pointer;
      color: #ffffff;
      font-family: "微软雅黑";
      margin-top: 16px;
      border: none;
      border-radius: 3px;
      position: relative;
      transition: transform 0.3 ease;
      .xuanzhuan {
        background: #00a0e9;
        height: 6px;
        width: 12px;
        display: block;
        position: absolute;
        right: 14px;
        top: 12px;
        background: url(~/btn.png) no-repeat;
        transform: rotate(180deg);
      }
      &.open .xuanzhuan {
        transform: rotate(0deg);
      }
    }
  }
  .wz {
    // display: none;
    padding: 0;
    // transition: all 0.5s linear;
    // height: 0;
    overflow: hidden;
    padding: 0 0 0 27px;
    padding: 0px 27px 20px 27px;
    height: auto;
    // &.show {
    //   padding: 0px 27px 20px 27px;
    //   height: auto;
    // }
  }
}

// .slide-enter-active,
// .slide-leave-active {
//   transition: transform 0.4s;
// }
// .slide-enter,
// .slide-leave-active {
//   transform: translate3d(0, 1rem, 0);
//   // opacity: 0;
// }
</style>
