<template>
  <div class="notice_body">
    <div class="title" v-show="!isNoticeInfo">
      <span class="tit_txt">系统消息</span>
      <span class="tit_right">时间↓</span>
    </div>
    <div class="cont" v-show="!isNoticeInfo">
      <img src="../../../assets/img/no_user_msg.png" alt="" v-show="isShow" class="noData">
      <div class="item" v-show="!isShow" v-for="(item,key) in noticeData" :key="key" @click="noticeInfo(item)">
        <span class="icon"></span>
        <p class="txt" v-html="item.content"></p>
        <span class="time">{{setTime(item.send_time)}}</span>
      </div>
      <Page :total="noticeData.length" show-elevator show-total v-show="!isShow"></Page>
    </div>
    <div class="notice_info" v-show="isNoticeInfo">
      <div class="nav">
        <span>当前位置</span>>
        <span class="hover" @click="backNotice">网站公告</span>>
        <span class="hover">详情</span>
      </div>
      <div class="time">{{setTime(notice_info.send_time)}}</div>
      <div class="info">
        <p v-html="notice_info.content"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'notice',
  data() {
    return {
      isShow: false,
      isNoticeInfo: false,
      noticeBox: false,
      noticeData: [],
      notice_info: {}
    };
  },
  async mounted() {
    await this.togetSystemNotice();
  },
  methods: {
    ...mapActions('user', ['getSystemNotice']),
    async togetSystemNotice() {
      let noticeData = await this.getSystemNotice();
      if (noticeData.length === 0) {
        this.isShow = true;
        return;
      }
      for (let i = 0; i < noticeData.length; i++) {
        noticeData[i].content = this.decode(noticeData[i].content);
      }
      this.noticeData = noticeData;
    },
    noticeInfo(data) {
      this.notice_info = data;
      this.isNoticeInfo = true;
    },
    setTime(t) {
      let timestamp = t * 1000;
      let assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = m => {
          return m > 9 ? m : '0' + m;
        };
      return y + '-' + add0(M) + '-' + add0(d);
    },
    backNotice() {
      this.isNoticeInfo = false;
    },
    close_box() {
      this.noticeBox = false;
    }
  }
};
</script>
<style lang="scss">
.notice_body {
  .title {
    height: 35px;
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px solid #cccccc;
    background-color: #f3f3f3;
    padding: 0 30px;
    .tit_txt {
      display: inline-block;
      line-height: 35px;
      margin-left: 20px;
    }
    .tit_right {
      display: inline-block;
      line-height: 20px;
      float: right;
      padding-left: 25px;
      margin-top: 7px;
      border-left: 1px Solid #d2d2d2;
    }
  }
  .cont {
    min-height: 600px;
    border: 1px Solid #d2d2d2;
    border-top: none;
    padding: 0 10px;
    position: relative;
    padding-bottom: 100px;
    .noData {
      display: block;
      margin: 0 auto;
      padding: 150px 0;
    }
    .item {
      height: 30px;
      border-bottom: 1px solid #ccc;
      .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        float: left;
        background: url('../../../assets/img/pc_gengduo_xiaoxi.png') center
          center no-repeat;
        background-size: 18px 18px;
      }
      .txt {
        width: 660px;
        display: inline-block;
        line-height: 30px;
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .txt:hover {
        color: red;
        text-decoration: underline;
      }
      .time {
        float: right;
        line-height: 30px;
        font-size: 14px;
      }
    }
    .ivu-page {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0px;
    }
  }
  .notice_info {
    min-height: 635px;
    border: 1px solid #ccc;
    .nav {
      height: 25px;
      padding: 0 10px;
      span {
        line-height: 25px;
        margin: 0 5px;
        &:last-child {
          color: red;
        }
      }
      .hover {
        cursor: pointer;
      }
      .hover:hover {
        color: red;
      }
    }
    .tit {
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      margin-top: 10px;
      color: #000;
    }
    .time {
      text-align: center;
      line-height: 20px;
      border-bottom: 1px solid #ccc;
    }
    .info {
      padding: 15px;
      p {
        text-indent: 2em;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
}
</style>
