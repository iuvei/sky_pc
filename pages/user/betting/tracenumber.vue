<template>
  <div class="betrecord_box">
    <div class="box_container no_select" id="dialog_userinfo">
      <div class="menu">
        <div class="item_1">彩种:
          <select class="select_game" v-model="loginfo.gameid" @change="selectGame">
            <option :value="0">全部</option>
            <option v-for="(item,index) in gamedata" :key="index" :value="item.game_id">{{item.game_name}}</option>
          </select>
        </div>
        <div class="item_2">时间:
          <div data-id="0" class="check_box" :class="{ active : loginfo.lasttime==0}" @click="toggleTime(0)">今日</div>
          <div data-id="0" class="check_box" :class="{ active : loginfo.lasttime==1}" @click="toggleTime(1)">昨天</div>
          <div data-id="1" class="check_box" :class="{ active : loginfo.lasttime==2}" @click="toggleTime(2)">本周</div>
          <div data-id="2" class="check_box" :class="{ active : loginfo.lasttime==3}" @click="toggleTime(3)">本月</div>
          <div data-id="3" class="check_box" :class="{ active : loginfo.lasttime==4}" @click="toggleTime(4)">上月</div>
        </div>
        <div class="item_3">状态:
          <div class="check_box" :class="{ active : loginfo.type==1}">待开奖</div>
        </div>
      </div>
      <div class="content" id="touzhu_log_table">
        <div class="ex_page">
          <table class="ex_custom_table">
            <thead>
              <tr>
                <td width="150">彩种</td>
                <td width="190">起始期号</td>
                <td>追号时间</td>
                <td width="140">详情</td>
                <td width="150" class="bet_status">状态</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in recorddata" class="detail_info" :key="index" :class="{bgcolor:index%2==1}">
                <td width="110" class="play">{{item.game_name}}</td>
                <td width="150" class="num">
                  {{item.qishu}}
                </td>
                <td>{{item.tz_time}}</td>
                <td width="80" class="kj_ball bet_detail" @click="showDetail(item)">{{item.xiangqing}}</td>
                <td width="80" class="bet_status">
                  <span :class="[item.status==2?'red':item.status==1?'ok':item.status==0?'yellow':item.status==3?'gray':'']">{{item.status==1?"已中奖":item.status==2?"未中奖":"待开奖"}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="ex_page_tools" v-show="!isshow">
            <span class="first_page" @click="prePage()">上一页</span>
            <span class="btn_back" @click="prePage()">
              <i class="arrow_back"></i>
            </span>
            <span class="current_page">{{loginfo.pageid+1}}</span>
            <span class="btn_forward" @click="nextPage()">
              <i class="arrow_forward"></i>
            </span>
            <span class="last_page" @click="nextPage()">下一页</span>
            <span class="target_go">
            </span>
            <span class="page_info">
              <span>共 {{recorddata.length}} 条记录
              </span>
            </span>
          </div>
          <div class="nonelog" v-show="isshow">
            <img src="../../../assets/img/none_log.png" alt="">
            <p>暂无记录</p>
            <a href="/game">
              <button>立即购买</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="orderdetail_box" v-show="close">
      <div class="head">
        <span>订单详情</span>
      </div>
      <span class="close" @click="showDetail(0)"></span>
      <div class="registerNo">注册单号 :
        <span>{{currentData.zhudan}}</span>
      </div>
      <table class="title_table">
        <tbody class="detail_main">
          <tr>
            <td width="80" style="text-align:right;">彩种 ：</td>
            <td width="150">{{currentData.game_name}}</td>
            <td width="100" style="text-align:right;">单注金额 ：</td>
            <td>{{currentData.per_price}}</td>
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
            <td>{{currentData.kj_balls}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">状态 ：</td>
            <td>
              <span>已结算</span>
              <span>{{currentData.status==2?"(未中奖)":currentData.status==1?"(已中奖)":currentData.status==0?"(待开奖)":"(已撤单)"}}</span>
            </td>
            <td style="text-align:right;">中奖金额 ：</td>
            <td>{{currentData.win}}</td>
          </tr>
          <tr>
            <td style="text-align:right;">奖金/返点 ：</td>
            <td>
              <span>{{currentData.win}}</span>/
              <span>{{currentData.peilv}}</span>
            </td>
            <td style="text-align:right;">盈亏 ：</td>
            <td>{{currentData.status==0?'敬请期待':currentData.is_win}}</td>
          </tr>
        </tbody>
      </table>
      <div class="bet_head">下注号码
        <span>↓</span>
      </div>
      <div class="outline" style="padding-top:10px; padding-left:10px;"> {{currentData.xiangqing}}</div>
      <div style="clear:both;"></div>
    </div>
    <div style="clear:both;width:100%;"></div>
  </div>
  <!-- 注记录接口返回状态字段"status"有做新的修改，具体如下 0=待开奖, 1=已中奖 2=未中奖 3=撤单 -->
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      loginfo:{
        pageid:0,
        lasttime:0,
        type:1,
        gameid:0,
      },
      isshow:false,
      gopage:'',
      offset:0,
      limit:11,
      close:0 ,
      currentData:'',
      recorddata:'',
      gamedata:[]    
    }
  },
  mounted(){
    this.fetchGamelist()
    this.fetchData()
  },
  methods:{
    ...mapActions('user',['getRecorddata','getGameData']),
    selectGame(item){
      this.fetchData();
    },
    toggleTime(time){
      this.loginfo.lasttime=time;
      this.fetchData();
    },
    showDetail(item){
      if(item == 0){
        this.close=0;
      }else{
        this.close=1;
      }
      this.currentData=item;
    },
    nextPage(){
      if(this.recorddata.length < 30){
        this.$Message.warning('当前已经是最后一页！');
      }else{
        this.loginfo.pageid +=1;
        this.fetchData();
      }
    },
    prePage(){
      if(this.loginfo.pageid > 0){
        this.loginfo.pageid -=1;
        this.fetchData();
      }
    },
    //获取追号记录
    async  fetchData(){
      let rep =await this.getRecorddata(this.loginfo) || [];
      this.recorddata=rep;
      if(this.recorddata.length==0){
        this.isshow=true;
      }else{
        this.isshow=false;
      }
      return rep;
    },
    //获取玩法列表
    async fetchGamelist(){
      let res = await this.getGameData() || [];
      this.gamedata = res;
      return res;
    }
  }
}
</script>

<style lang="scss" scoped>
.betrecord_box {
  width: 827px;
  position: relative;
}
.box_header {
  width: 100%;
  z-index: 10;
  line-height: 36px;
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
  background: url(../../../assets/img/user_center_icons.png) -31px -186px;
}
.box_container {
  position: relative;
  z-index: 10;
  padding-bottom: 60px;
  width: 100%;
  border: 1px Solid #ccc;
  box-sizing: border-box;
  min-height: 700px;
}
.box_container .title {
  height: 45px;
  line-height: 45px;
  color: #333;
  border-bottom: 1px Solid #ccc;
}
.title_table {
  width: 90%;
  margin: 0px 30px;
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
  width: 140px;
  float: left;
  font-size: 14px;
}
.box_container .menu .item_1 .select_game {
  width: 80px;
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
  // cursor: pointer;
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
.gray {
  background-color: gray;
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
  // display: inline-block;
  width: 18px;
  height: 20px;
  text-align: center;
  font-size: 17px;
  line-height: 17px;
  float: right;
  margin-top: -5px;
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
.kj_ball {
  // letter-spacing: 5px;
  text-decoration: underline;
  color: #87caf2;
}
.last_page,
.first_page {
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #e1e1e1;
}
.btn_forward,
.btn_back {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  color: #000;
  // text-align: center;
}
.arrow_back {
  display: inline-block;
  width: 0;
  height: 0px;
  margin-left: -7.5px;
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #cbcbcc;
}
.arrow_forward {
  display: inline-block;
  width: 0;
  height: 0px;
  margin-left: 7.5px;
  border-right: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #cbcbcc;
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
.btn_forward {
  display: inline-block;
  margin-right: 10px;
  // margin-left: 5px;
}
.now_page {
  display: inline-block;
  // margin-left: 5px;
  margin-right: 5px;
  width: 20px;
  border-radius: 3px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #f3f3f3;
}
.now_page:hover {
  cursor: pointer;
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
.target_btn:hover {
  cursor: pointer;
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
  .first_page,
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
.box_header {
  display: none;
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
.first_page,
.btn_back,
.btn_forward,
.last_page {
  cursor: pointer;
}
.bet_detail {
  cursor: pointer;
}
</style>


