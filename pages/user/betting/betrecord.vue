<template>
  <div class="betrecord_box">
    <div class="lottery_tab">
      <span v-for="(item,index) in tabList" :key="index" :class="{'active':item.dex == nowTab}" class="tab_item" @click="switchTab(item)">{{item.name}}</span>
    </div>
    <div class="box_container no_select" id="dialog_userinfo">
      <div class="menu">
        <div class="item_1">彩种:
          <select class="select_game" v-model="loginfo.gameid" @change="selectGame()">
            <option :value="0">全部</option>
            <option v-for="(item,index) in gamedata" :key="index" :value="item.game_id || item.tag">{{item.game_name || item.menu}}</option>
          </select>
        </div>
        <div class="item_2">时间:
          <div v-for="(item,index) in timeList" :key="index" class="check_box" :class="{ active : loginfo.lasttime==item.dex}" @click="toggleTime(item.dex)">{{item.name}}</div>
        </div>
        <div class="item_3">状态:
          <div class="check_box" v-for="(item,index) in typeList" :key="index" :class="{ active : listType==item.dex}" @click="toggleType(item.dex)">{{item.name}}</div>
        </div>
      </div>
      <div class="content" id="touzhu_log_table">
        <div class="ex_page">
          <table class="ex_custom_table">
            <thead>
              <tr>
                <td width="80" v-for="(item, index) in logTitle" :key="index">{{item}}</td>
              </tr>
            </thead>
            <tbody v-show="!isshow">
              <tr v-for="(item,index) in recorddata" :key="index" class="detail_info" :class="{bgcolor:index%2==1}">
                <!-- 游戏 name -->
                <td width="80" class="lot_kind">{{item.game_name}}</td>
                <td width="110" v-if="nowTab==0" class="play">{{item.wanfa}}</td>
                <!-- 电子游戏订单字段 -->
                <!-- 订单 -->
                <td width="110" v-if="nowTab==1 || nowTab==2 || nowTab==3" class="play">{{item.dingdan}}</td>
                <td width="110" class="num" v-if="nowTab==0">{{item.qishu}}</td>
                <!-- 投注时间 -->
                <td width="160" class="lot_time">{{item.tz_time}}</td>
                <!-- 投注金额 -->
                <td width="80" class="bet_money">{{item.price ? item.price : item.tz_price}}</td>
                <!-- 盈利亏损 -->
                <td width="80" v-if="nowTab == 1 || nowTab == 2 || nowTab == 3" :style="{color:!item.lose_win?'red':'green'}" class="bet_money">
                  <!-- {{item.lose_win ? '+':'-'}}{{item.lose_win ? item.win : item.tz_price}} -->
                  {{item.win}}
                </td>
                <td class="bet_detail" v-if="nowTab==0" @click="showDetail(item)">{{item.xiangqing}}</td>
                <td v-if="nowTab == 0" width="80" class="bet_status">
                  <span :class="[item.status==2?'red':item.status==1?'ok':item.status==0?'yellow':item.status==3?'gray':'']">{{item.status==1?"已中奖":item.status==2?"未中奖":item.status==0?"待开奖":item.status==3?"已撤单":""}}</span>
                </td>
                <!-- 输赢 -->
                <td v-if="nowTab == 1 || nowTab == 2 ||nowTab == 3 " width="80" class="bet_status">
                  <span :class="[item.lose_win==1?'ok':item.lose_win==0 ? 'red':'']">{{item.lose_win==1 ? "赢" : item.lose_win==0 ? "输":''}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="ex_page_tools" v-show="!isshow">
            <span class="fist_page" @click="prePage()">上一页</span>
            <span class="btn_back" @click="prePage()"><i class="arrow_back"></i></span>
            <span class="current_page">{{loginfo.pageid+1}}</span>
            <span class="btn_forward" @click="nextPage()"><i class="arrow_forward"></i></span>
            <span class="lastpage" @click="nextPage()">下一页</span>
            <span class="page_info">
              <span>
                {{recorddata.length}}
                条记录
              </span>
            </span>
          </div>
          <div class="nonelog" v-show="isshow">
            <img src="../../../assets/img/none_log.png" alt="">
            <p>暂无记录</p>
            <a @click.stop.prevent="buy"><button>立即购买</button></a>
            <!-- <button @click="buy">立即购买</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="orderdetail_box" v-show="close">
      <div class="head"><span>订单详情</span></div>
      <span class="close" @click="showDetail(0)"></span>
      <div class="registerNo">注册单号 ：
        <span>{{currentData.zhudan}}</span>
      </div>
      <table class="title_table">
        <tbody class="detail_main">
          <tr>
            <td width="80" style="text-align:right;">彩种 ：</td>
            <td width="200">{{currentData.game_name}}</td>
            <td width="80" style="text-align:right;">单注金额 ：</td>
            <td width="">{{currentData.per_price}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">下注时间 ：</td>
            <td>{{currentData.tz_time}}</td>
            <td style="text-align:right;">投注注数 ：</td>
            <td>{{currentData.zhushu}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">期号 ：</td>
            <td>{{currentData.qishu}}</td>
            <td style="text-align:right;">投注总额 ：</td>
            <td>{{currentData.price}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">玩法 ：</td>
            <td>{{currentData.wanfa}}</td>
            <td style="text-align:right;">开奖号码 ：</td>
            <td class="kj_ball">{{currentData.kj_balls}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">状态 ：</td>
            <td>
              <span>{{currentData.status==2?"未中奖":currentData.status==1?"已中奖":currentData.status==0?"待开奖":"已撤单"}}</span>
            </td>
            <td style="text-align:right;">中奖金额 ：</td>
            <td>{{currentData.win}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">赔率 ：</td>
            <td><span>{{currentData.peilv}}</span></td>
            <td style="text-align:right;">盈 亏 ：</td>
            <td>{{currentData.status==0 ? '敬请期待' : currentData.is_win}}</td>
          </tr>
        </tbody>
      </table>
      <div class="bet_head">下注号码 <span>↓</span></div>
      <div class="outline" style="padding:10px;">{{currentData.xiangqing}}</div>
    </div>
  </div>
  </div>
  </div>
  <!-- 注记录接口返回状态字段"status"有做新的修改，具体如下 0=待开奖, 1=已中奖 2=未中奖 3=撤单 -->
</template>

<script>
import http from "~/api/http";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginfo: {
        gameid: 0,
        type: 0, //彩票类型(如:彩票,电子游戏...|| 彩票中奖,未中奖...)
        lasttime: 0,
        pageid: 0,
        tag: "",
        count: 30
      },
      timeList: [
        { name: "今日", dex: 0 },
        { name: "昨天", dex: 1 },
        { name: "本周", dex: 2 },
        { name: "本月", dex: 3 },
        { name: "上月", dex: 4 }
      ],
      type: [
        {
          lotteryType: [
            { name: "全部", dex: 0 },
            { name: "已中奖", dex: 2 },
            { name: "待开奖", dex: 3 },
            { name: "已撤单", dex: 4 },
            { name: "未中奖", dex: 5 }
          ]
        },
        {
          lotteryType: [
            { name: "全部", dex: 0 },
            { name: "赢", dex: 1 },
            { name: "输", dex: 2 }
          ]
        },
        {
          lotteryType: [
            { name: "全部", dex: 0 },
            { name: "赢", dex: 1 },
            { name: "输", dex: 2 }
          ]
        },
        {
          lotteryType: [
            { name: "全部", dex: 0 },
            { name: "赢", dex: 1 },
            { name: "输", dex: 2 }
          ]
        }
        // {
        //   lotteryType: [
        //     { name: "全部", dex: 0 },
        //     { name: "已中奖", dex: 1 },
        //     { name: "未中奖", dex: 2 }
        //   ]
        // }
      ],
      title: [
        {
          tit: [
            "彩种",
            "玩法",
            "期号",
            "投注时间",
            "投注金额(元)",
            "投注详情",
            "状态"
          ]
        },
        {
          tit: [
            "彩种",
            "定单号码",
            "投注时间",
            "投注金额(元)",
            "盈亏金额",
            "状态"
          ]
        },
        {
          tit: [
            "彩种",
            "定单号码",
            "投注时间",
            "投注金额(元)",
            "盈亏金额",
            "状态"
          ]
        },
        {
          tit: [
            "彩种",
            "定单号码",
            "投注时间",
            "投注金额(元)",
            "盈亏金额",
            "状态"
          ]
        }
      ],
      isshow: false,
      amount: "0.00",
      winamount: "0.00",
      profit: "",
      gopage: "",
      offset: 0,
      limit: 11,
      close: 0,
      currentData: "",
      recorddata: [],
      gamedata: [],
      listType: 0, //投注记录状态
      tabList: [
        { name: "彩票", dex: 0 },
        { name: "电子", dex: 1, tag: "mg" },
        { name: "棋牌", dex: 2, tag: "jjqp" },
        { name: "捕鱼", dex: 3, tag: "jjqp" }
      ],
      nowTab: 0, //nowtab为0是彩票 为1是电子游戏
      gmData: []
    };
  },
  mounted() {
    this.retchGamelist();
    this.fetchData();
  },
  computed: {
    //切换彩种时更改类型字段
    typeList() {
      let type = this.type.filter((item, index) => index === this.nowTab);
      return type[0].lotteryType;
    },
    //切换彩种时更改头部字段
    logTitle() {
      let tit = this.title.filter((item, index) => index === this.nowTab);
      return tit[0].tit;
    }
  },
  methods: {
    ...mapActions("user", [
      "getRecorddata",
      "getGameData",
      "getGmRecord",
      "getGetEleMenuList"
    ]),
    buy() {
      // 跳转对应路由
      if (this.nowTab === 0) {
        this.$router.push("/game");
      } else if (this.nowTab === 1) {
        this.$router.push("/thegame");
      } else if (this.nowTab === 2) {
        this.$router.push("/boardGames");
      } else if (this.nowTab === 3) {
        this.$router.push("/hishingGame");
      }
    },
    // 切换头部彩种||游戏
    switchTab(item) {
      this.loginfo.pageid = 0;
      this.loginfo.gameid = 0;
      this.loginfo.lasttime = 0;
      this.loginfo.type = item.dex;
      this.nowTab = item.dex;
      // this.loginfo.tag = item.tag;
      this.retchGamelist(item.dex);
      this.fetchData(item.dex);
    },
    // 彩种切换name
    selectGame(item) {
      if (this.loginfo.gameid == 0) {
        this.loginfo.tag = "";
      }
      if (this.loginfo.gameid !== 0) {
        this.loginfo.tag = this.loginfo.gameid;
      }
      this.loginfo.pageid = 0;
      this.fetchData();
    },
    // 切换时间
    toggleTime(time) {
      this.loginfo.pageid = 0;
      this.loginfo.lasttime = time;
      this.fetchData();
    },
    //切换类型(比如:输赢)
    async toggleType(state) {
      this.loginfo.pageid = 0;
      this.listType = state;
      if (this.nowTab == 0) {
        this.loginfo.type = state;
        this.loginfo.pageid = 0;
        await this.fetchData();
      }
      if (this.nowTab == 1 || this.nowTab == 2 || this.nowTab == 3) {
        await this.fetchData();
        if (state == 1)
          this.recorddata = this.recorddata.filter(item => item.lose_win);
        if (state == 2)
          this.recorddata = this.recorddata.filter(item => !item.lose_win);
      }
    },
    // 投注详情
    showDetail(item) {
      if (item == 0) {
        this.close = 0;
        S;
      } else {
        this.close = 1;
      }
      this.currentData = item;
    },
    // 下一页
    async nextPage() {
      if (this.nowTab == 1 || this.nowTab == 2 || this.nowTab == 3) {
        this.listType = 0;
        this.loginfo.type = 0;
        await this.fetchData();
      }
      // if (this.recorddata.length >= this.loginfo.count) {
      // this.loginfo.pageid += 1;
      // await this.fetchData();
      // }
      // if (this.recorddata.length < this.loginfo.count) {
      //   this.loginfo.pageid -= 1
      //   await this.fetchData();
      //   this.$Message.warning("当前已经是最后一页！");
      // }
      if (this.recorddata.length < this.loginfo.count) {
        this.$Message.warning("当前已经是最后一页！");
      } else {
        this.loginfo.pageid += 1;
        this.fetchData();
      }
    },
    // 上一页
    async prePage() {
      // this.offset -=this.limit;
      if (this.loginfo.pageid > 0) {
        this.loginfo.pageid -= 1;
        if (this.nowTab == 1 || this.nowTab == 2 || this.nowTab == 3) {
          this.loginfo.type = 0;
          await this.fetchData();
        }
        this.fetchData();
      }
    },
    // 列表详情内容
    numformate(item) {
      let rep = item,
        amount = new Number(0),
        winamount = new Number(0),
        profit = new Number(0);
      for (var i = 0; i < rep.length; i++) {
        amount += Number(rep[i].price);
        winamount += Number(rep[i].win);
        profit += Number(rep[i].is_win);
      }
      this.amount = amount.toFixed(2);
      this.winamount = winamount.toFixed(2);
      this.profit = profit.toFixed(2);
    },
    //获取彩票&电子&棋牌&捕鱼投注记录
    async fetchData() {
      // console.log("this.loginfo", this.loginfo);
      if (this.nowTab == 0) {
        let rep = (await this.getRecorddata(this.loginfo)) || [];
        this.recorddata = rep;
      }
      if (this.nowTab == 1 || this.nowTab == 2 || this.nowTab == 3) {
        let rep = (await this.getGmRecord(this.loginfo)) || [];
        this.recorddata = rep;
        this.gmData = rep;
      }
      if (this.recorddata.length == 0) {
        this.isshow = false;
      }
      if (this.recorddata.length == 0 && this.loginfo.pageid == 0) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
      this.numformate(this.recorddata);
      return this.recorddata;
    },
    //获取玩法列表
    async retchGamelist() {
      let res = (await this.getGameData()) || [];
      let repyx = (await this.getGetEleMenuList()) || [];
      if (this.nowTab == 0) {
        this.gamedata = res;
      } else if (this.nowTab == 1) {
        this.gamedata = repyx.filter(i => i.type == "1");
      } else if (this.nowTab == 2) {
        this.gamedata = repyx.filter(i => i.type == "2");
      } else {
        this.gamedata = repyx.filter(i => i.type == "3");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.betrecord_box {
  width: 827px;
  position: relative;
  .lottery_tab {
    width: 350px;
    height: 50px;
    line-height: 50px;
    .tab_item {
      display: inline-block;
      width: 25%;
      height: 100%;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
    }
    .active {
      border-bottom: 3px solid red;
      color: red;
    }
  }
}
.box_header {
  width: 100%;
  z-index: 10;
  height: 36px;
  line-height: 36px;
  background-color: #f3f3f3;
  border: 1px solid #d3d3d3;
  border-radius: 2px;
  box-sizing: border-box;
  background: #f3f3f3;
  border: 1px Solid #ccc;
  font-size: 14px;
  color: #666;
}
.record {
  display: inline-block;
  padding-left: 5px;
}
.head_icon {
  float: left;
  width: 30px;
  height: 31px;
  background: url(../../../assets/img/user_center_icons.png) 0 -271px;
}
.box_container {
  width: 100%;
  position: relative;
  border: 1px Solid #ccc;
  box-sizing: border-box;
  padding-bottom: 60px;
  min-height: 700px;
}
.box_container .title {
  height: 45px;
  line-height: 45px;
  color: #333;
  border-bottom: 1px Solid #ccc;
}
.title_table {
  width: 100%;
  border-collapse: collapse;
}
.title_table tr {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px dotted #e7e7e7;
}
.price {
  color: #f33;
}
.box_container .menu {
  box-sizing: border-box;
  height: 55px;
  line-height: 55px;
  padding: 8px 0px 60px 0px;
  white-space: nowrap;
  overflow: hidden;
}
.box_container .menu .item_1 {
  padding-left: 10px;
  width: 155px;
  float: left;
  font-size: 14px;
}
.box_container .menu .item_1 .select_game {
  width: 95px;
  height: 24px;
  cursor: pointer;
  color: #495060;
  text-align: center;
  line-height: 24px;
}
.box_container .menu .item_2 {
  width: 270px;
  float: left;
  font-size: 14px;
}
.check_box {
  width: auto;
  height: 24px;
  cursor: pointer;
  line-height: 24px;
  padding: 0px 5px 0px 5px;
  margin-left: 5px;
  color: #999;
  display: inline-block;
  border: 1px Solid #ccc;
  font-size: 14px;
}
.box_container .menu .item_3 {
  width: 410 px;
  float: left;
  font-size: 14px;
}
.check_box.active {
  border: 1px Solid red;
  color: red;
}
.ex_custom_table {
  width: 100%;
  border-collapse: collapse;
}
.ex_custom_table thead td {
  color: #8d8b88;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  text-shadow: #ffffff 0px 1px 0px;
}
tr {
  &:last-child {
    border-right: 0;
  }
}
.ex_custom_table td:first-child {
  border-left: 0px;
}
.ex_custom_table td {
  border: 1px Solid #ccc;
}
.ex_custom_table thead tr {
  height: 30px;
  background: #fef3ed;
}
.detail_info {
  height: 30px;
  line-height: 30px;
}
.detail_info td {
  text-align: center;
}
.ok {
  background-color: #42a00c;
}
.yellow {
  background-color: #f39801;
}
.red {
  background-color: #f13031;
}
.red {
  color: #f13031;
}
.orderdetail_box {
  position: absolute;
  z-index: 100;
  width: 600px;
  height: 450px;
  left: 100px;
  top: 100px;
  background-color: #fff;
  border: 1px solid #cecece;
  box-shadow: 2px 3px 3px #b3b3b3;
  padding: 10px;
}
.head {
  display: inline-block;
  font-size: 14px;
  width: 560px;
  color: #ffb380;
  border-bottom: 1px solid #ffb380;
}
.close {
  display: inline-block;
  width: 18px;
  height: 20px;
  line-height: 17px;
  text-align: center;
  font-size: 17px;
  color: #ffb380;
}
.close::before {
  content: "\78";
}
.close:hover {
  background-color: #ffb380;
  color: #fff;
}
.registerNo {
  width: 100%;
  color: #adadad;
  line-height: 40px;
  text-align: center;
}
.outline {
  width: 500px;
  height: 100px;
  border: 1px solid #e1e1e1;
  margin: 10px 40px;
}
.bet_head {
  margin: 10px 50px;
  font-size: 12px;
}
.bgcolor {
  background-color: #f6f7f9;
}
.gray {
  background-color: gray;
}
.bet_detail {
  overflow: hidden;
  letter-spacing: 3px;
  line-height: 15px;
  padding: 3px;
  color: #87caf2;
  cursor: pointer;
}
.last_page,
.first_page {
  display: inline-block;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #e1e1e1;
  cursor: pointer;
}
.btn_forward,
.btn_back {
  display: inline-block;
  width: 20px;
  height: 20px;
  // margin-left: 10px;
  line-height: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  color: #000;
}
.arrow_back {
  display: inline-block;
  width: 0;
  height: 0px;
  margin-left: -7.5px;
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #b9b3b3;
}
.arrow_forward {
  display: inline-block;
  width: 0;
  height: 0px;
  margin-left: 7.5px;
  border-right: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #b9b3b3;
}
.btn_forward :hover .arrow_forward {
  border-left-color: #fe7c33;
}
.btn_forward:hover {
  border-color: #fe7c33;
}
.btn_back :hover .arrow_back {
  border-right-color: #fe7c33;
}
.btn_back:hover {
  border-color: #fe7c33;
}
.now_page:hover {
  cursor: pointer;
}
.btn_forward,
.btn_back,
.first_page,
.target_btn,
.last_page:hover {
  cursor: pointer;
}
.btn_forward {
  display: inline-block;
  margin-right: 10px;
}
.now_page {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  width: 20px;
  border-radius: 3px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #f3f3f3;
  text-align: center;
}
.current_page {
  border-color: #fe7c33;
}
.target_btn {
  height: 20px;
  width: 25px;
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 20px;
  background-color: #fff;
  outline: 0;
  text-decoration: none;
  border: 1px solid #cbcbcc;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  color: #6d87b7;
  font-size: 10px;
  letter-spacing: -1px;
  border-left: 0;
}
.target_ipt {
  display: inline-block;
  width: 30px;
  height: 20px;
  vertical-align: top;
  text-align: center;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  line-height: 20px;
  outline: none;
  border: 1px solid #cbcbcc;
}
.target_go {
  display: inline-block;
  background-color: #f1f1f1;
  margin-right: 5px;
}
.ex_page_tools {
  width: 100%;
  position: absolute;
  bottom: 20px;
  text-align: center;
  .fist_page,
  .lastpage:hover {
    cursor: pointer;
  }
}
.bet_status {
  border-right: 0 !important;
  > span {
    display: inline-block;
    width: 56px;
    height: 18px;
    line-height: 18px;
    border-radius: 5px;
    color: #ffffff;
  }
}
.nonelog {
  display: block;
  text-align: center;
  margin-top: 190px;
  p {
    font-size: 0.875rem;
    height: 10px;
    line-height: 10px;
    color: #bfbfbf;
    font-weight: 700;
  }
  a {
    margin-top: 10px;
    display: inline-block;
    font-size: 16px;
    font-weight: bolder;
    color: #666;
    cursor: pointer;
  }
  button {
    width: 80px;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    font-weight: 700;
    border-radius: 5px;
    color: #fff;
    background-color: #f93;
    outline: none;
    border: none;
    cursor: pointer;
  }
}
.current_page {
  display: inline-block;
  margin: 0 20px;
}
.page_info {
  display: inline-block;
  margin-left: 10px;
}
.fist_page {
  margin-right: 10px;
}
</style>
