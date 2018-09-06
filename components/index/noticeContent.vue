<template>
  <div class="vforMax">
    <div class="fleft menu">
      <ul>
        <li v-for="(item, index) in componentData" :key="index" :class="{'active':curIndex === index}" @click="selectNotice(item, index)">
          <span>{{(item.hasOwnProperty('title') && item.title) || '系统公告'}}</span><br>
          <span>{{item.send_time | format}}</span>
        </li>
      </ul>
    </div>
    <div class="fleft bodydPrent">
      <div class="bodyd ">
        <div class="title" v-if="curItem">{{(curItem.hasOwnProperty('title') && curItem.title) || '系统公告'}}</div>
        <div>
          <div class="imgb">
            <div class="detailInfo" v-if="curItem" v-html="curItem.content">
            </div>
          </div>
          <div class="endUser" style="margin-top: 0px;" v-if="curItem">{{curItem.send_time | format}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name:'notice_content',
  props:['componentData'],
  data(){
    return {
      curIndex:0,
      curItem:null
    }
  },
  filters:{
    format(date){
      return dayjs(date * 1000).format('YYYY-MM-DD')
    }
  },
  methods:{
    selectNotice(item, index){
      this.curIndex = index
      this.curItem = item
    }
  },
  mounted() {
    if(this.componentData && Array.isArray(this.componentData) && this.componentData.length){
      this.curItem = this.componentData[0]
    }
  },
}
</script>

<style lang="scss" scoped>
// .sys-notice {
//   border-radius: 4px !important;
//   width: 700px !important;
//   height: 453px;
//   .ivu-modal-content {
//     border-radius: 4px;
//   }
//   .ivu-modal-header,
//   .head {
//     background: #383838 !important;
//     justify-content: center !important;
//     color: #fff;
//     .ivu-modal-header-inner {
//       text-align: center;
//       font-weight: bold;
//       font-size: 17px;
//       letter-spacing: 2px;
//     }
//   }
// }
.vforMax {
  max-height: 445px;
  overflow: auto;
  padding: 0 !important;
  display: flex;
  .menu {
    width: 178px;
    height: 416px;
    border-right: 1px solid #ddd;
    overflow: auto;
    box-shadow: 6px 0 4px -5px #dddddd;

    li {
      cursor: pointer;
      height: 48px;
      line-height: 16px;
      padding: 8px 12px;
      font-size: 14px;
      color: #666;
      text-align: left;
      border-bottom: 1px solid #ddd;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.active {
        color: #000;
        background: #eee;
      }
      span:last-child {
        float: right;
        width: 64px;
        font-size: 12px;
        color: #999;
        overflow: hidden;
      }
    }
  }
}

.bodydPrent {
  width: 517px;
  max-height: 400px;
  height: 400px;
  overflow: auto;
}
.bodyd {
  padding: 10px 0px;
  overflow: hidden;
  .title {
    min-height: 34px;
    padding: 3px 0px 13px;
    margin: 0 12px;
    line-height: 25px;
    text-align: center;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    word-break: break-all;
    white-space: normal;
    letter-spacing: 1px;
  }
  .detailInfo {
    padding: 10px 15px;
    word-wrap: break-word;
    text-align: left;
    white-space: normal;
    font-size: 14px;
    text-indent: 28px;
    letter-spacing: 1px;
  }
  .endUser {
    text-align: right;
    margin-right: 19px;
    font-weight: bold;
    margin-top: 20px;
  }
}
</style>
