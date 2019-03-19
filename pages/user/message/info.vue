<template>
  <div class="message_info_body">
    <div class="title">
      <span class="tit_left"></span>
      <span class="tit_txt">主题</span>
      <span class="tit_right">时间↓</span>
    </div>
    <div class="cont">
      <img src="../../../assets/img/no_user_msg.png" alt="" v-show="isShow" class="noData">
      <div class="label" v-show="!isShow">
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选
        </Checkbox>
        <div class="del" @click="del_data">删除</div>
      </div>
      <div class="item" v-for="(item,key) in userMessage" :key="key" v-show="!isShow">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox :label="key" class="tab">
            <span class="head">{{item.title}}</span>
          </Checkbox>
        </CheckboxGroup>
        <Collapse v-model="value" accordion @on-change="changeMess(item,key)">
          <Panel :name="key+''">
            <span :class="item.status==0?'mess_icon1':'mess_icon2'"></span>{{item.title}}
            <span class="time">{{setTime(item.sendtime)}}</span>
            <p slot="content" class="cont_cont">{{item.content}}</p>
          </Panel>
        </Collapse>
      </div>
      <Page :total="dataNum" show-elevator show-total :page-size="data.limit" @on-change="changePage" v-show="!isShow"></Page>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      isShow: false,
      checkAll: false,
      value:[],
      checkAllGroup: [],
      data_length: 0,
      userMessage:[],
      guid:{},
      data:{
        limit:20,
        pageid: 0
      },
      dataNum:0,
      delIds:'',
      key:0,
    }
  },
  async mounted(){
    await this.togetUserMessage()
  },
  methods: {
    ...mapActions('user',['getUserMessage','readUserMessage','delUserMessage']),
    async togetUserMessage() {
      let mess = await this.getUserMessage(this.data);
      this.dataNum = mess.total
      this.userMessage = mess.data
      if (this.userMessage.length === 0) {this.isShow = true};
      this.data_length = this.userMessage.length
    },
    async toreadUserMessage() {
      let readMess = await this.readUserMessage(this.guid);
      // this.togetUserMessage()status
      this.userMessage[this.key].status = 1
    },
    async todelUserMessage() {
      let delMess = await this.delUserMessage(this.delIds);
      // this.togetUserMessage()
      // this.userMessage.splice(this.key,1)
      for (let i = 0; i < this.checkAllGroup.length; i++) {
        this.userMessage.splice(this.checkAllGroup[i],1)
      }
      this.checkAllGroup = []
    },
    handleCheckAll () {
      if (this.checkAll) {
        this.checkAllGroup = [];
        this.checkAll = !this.checkAll
        this.delList = []
      } else {
        this.checkAllGroup = []
        for (let i = 0; i < this.data_length; i++) {
          this.checkAllGroup.push(i)
        }
        this.checkAll = !this.checkAll
      }
    },
    checkAllGroupChange (data) {
      this.checkAllGroup = data
      if (data.length === this.data_length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    changeMess(item,key){
      this.key = key
      if(item.status == 1){return}
      this.guid.guid = item.guid
      this.toreadUserMessage()
    },
    changePage(n){
      this.data.pageid = n-1
      this.togetUserMessage()
    },
    del_data(){
      for (let i = 0; i < this.checkAllGroup.length; i++) {
        this.delIds = this.delIds + ',' + this.userMessage[this.checkAllGroup[i]].guid
      }
      this.delIds = this.delIds.substring(1)
      this.todelUserMessage()
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
  }
}
</script>
<style lang="scss">
.message_info_body {
  .title {
    height: 35px;
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px solid #cccccc;
    background-color: #f3f3f3;
    padding: 0 35px;
    .tit_left {
      width: 30px;
      height: 20px;
      background: url(../../../assets/img/user_center_icons.png) -23px -36px;
      display: inline-block;
      float: left;
      margin-top: 7px;
      border-left: 1px Solid #d2d2d2;
    }
    .tit_txt {
      display: inline-block;
      line-height: 35px;
      margin-left: 20px;
    }
    .tit_right {
      display: inline-block;
      line-height: 20px;
      float: right;
      padding-left: 30px;
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
      position: relative;
    }
    .label {
      position: absolute;
      left: 10px;
      bottom: 50px;
      width: 805px;
      height: 30px;
      line-height: 30px;
      border-top: 1px Solid #d2d2d2;
      .del {
        position: absolute;
        top: 0;
        left: 60px;
        color: rgb(79, 166, 234);
        border: 1px solid rgb(79, 166, 234);
        width: 40px;
        height: 20px;
        font-weight: 600;
        margin-top: 5px;
        line-height: 20px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .ivu-collapse {
      background-color: #fff;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #dddee1;
      .ivu-collapse-item {
        .ivu-collapse-header {
          height: 30px;
          line-height: 30px;
          padding-left: 75px;
          font-size: 14px;
          .ivu-icon {
            display: none;
          }
          .mess_icon1 {
            width: 20px;
            height: 20px;
            background: url(../../../assets/img/user_center_icons.png) -86px -36px;
            display: inline-block;
            position: absolute;
            left: 35px;
            top: 50%;
            transform: translateY(-50%);
          }
          .mess_icon2 {
            width: 20px;
            height: 20px;
            background: url(../../../assets/img/user_center_icons.png) -60px -36px;
            display: inline-block;
            position: absolute;
            left: 35px;
            top: 50%;
            transform: translateY(-50%);
          }
          .time {
            font-size: 14px;
            position: absolute;
            top: 0;
            right: 12px;
          }
        }
        .ivu-collapse-content {
          padding: 0 35px;
          .ivu-collapse-content-box {
            padding: 0;
            padding-bottom: 10px;
            p {
              line-height: 25px;
            }
          }
          .cont_cont {
            text-indent: 2em;
          }
        }
      }
    }
    .ivu-checkbox-group {
      width: 25px;
      height: 31px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .tab {
      margin-right: 0;
      height: 30px;
      line-height: 30px;
      margin-left: 5px;
      // position: absolute;
      // left: 15px;
      // top: 0;
      .ivu-checkbox-inner:after {
        width: 6px;
        height: 10px;
      }
      .ivu-checkbox-inner {
        width: 16px;
        height: 16px;
      }
      .head {
        font-size: 14px;
        display: none;
      }
    }
    // .page {
    //   width: 440px;
    //   margin: 20px auto;
    // }
    .ivu-page {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0px;
    }
  }
}
</style>
