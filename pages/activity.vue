<template>
  <div class="activity-container">
    <div class="headrs">
      <img
        src="/head_t.png"
        width="285px"
        height="54px"
      >
    </div>
    <div class="beijin_m">
      <div
        class="event_content"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="yh_box">
          <img :src="item.pc_head">
          <div class="right">
            <h1
              style="width: 210px;height: 27px; overflow: hidden;"
              :title="item.event_title"
            >{{item.event_title}}</h1>
            <p :title="item.event_short">{{item.event_short}}</p>
            <button
              class="btns"
              @click="toggle(item, $event)"
              :class="{'open': item.show, 'loading': item.loading}"
            >{{item.loading?'加载中':'查看详情'}}
              <span class="xuanzhuan"></span>
            </button>
          </div>
        </div>
        <AppCollapse
          :open="item.show"
          class="app-collapse"
        >
          <div
            class="wz"
            v-html="item.event_detail"
          >
          </div>
        </AppCollapse>
      </div>
      <p
        class="no_activities"
        v-if="!list.length"
      >暂无活动记录，敬请期待～</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setInterval, clearInterval } from "timers";
import decompress from "../plugins/decompress";
const expend = el => {
  if (el.scrollHeight > (el.style.height + "").replace("px", "") * 1)
    el.style.height = el.scrollHeight + "px";
};

export default {
  name: "activies",
  data() {
    return {
      list: []
    };
  },
  created() {
    if (!process.browser) return;
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
        if (_list && Array.isArray(_list) && _list.length) {
          _list.forEach(x => {
            x.event_detail = null;
            x.show = false;
            x.loading = false;
          });
          this.list = _list;
        }
      }
    },
    async getContent(eid) {
      let result = await this.getEventContent(eid);
      // console.log(result)
      if (result) {
        let _result;
        const isNew = result.slice(0, 2) === "GZ";
        if (isNew) {
          result = result.substring(2);
          _result = decompress(result);
        } else {
          _result = this.decode(result);
        }
        if (!_result) return "暂无活动详情";
        let decodedStr = _result,
          div = window.document.createElement("div");
        let c = decodeURIComponent(escape(unescape(decodedStr)));
        div.innerHTML = c.replace(/\\u0026/g, "&");
        let output = div.innerText || div.textContent;
        // console.log(output)
        div = null;
        return output;
      } else {
        return "暂无活动详情";
      }
      return "";
    },
    async toggle(item, event) {
      const el =
        event.srcElement.tagName === "SPAN"
          ? event.srcElement.parentElement.parentElement.parentElement
              .nextElementSibling
          : event.srcElement.parentElement.parentElement.nextElementSibling;
      if (item.loading) return false;
      if (!item.event_detail) {
        item.loading = true;
        item.event_detail = await this.getContent(item.event_id);
      }

      this.$nextTick(() => {
        if (item.event_detail.length) {
          item.show = !item.show;
          if (!el) return;
          setTimeout(() => {
            item.show && expend(el);
            setTimeout(() => {
              item.show && expend(el);
            }, 1000);
          }, 500);
          var itemInterval = setInterval(() => {
            if (!el) return;
            if (
              item.show &&
              el.scrollHeight === (el.style.height + "").replace("px", "") * 1
            ) {
              item.loading = false;
              clearInterval(itemInterval);
            } else if (!item.show) {
              item.loading = false;
              clearInterval(itemInterval);
            }
          }, 300);
        } else {
          item.loading = false;
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
      &.loading {
        background: #ccc;
      }
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
    padding: 0;
    overflow: hidden;
    padding: 0 0 0 27px;
    padding: 0px 27px 20px 27px;
    height: auto;
  }
}
</style>
