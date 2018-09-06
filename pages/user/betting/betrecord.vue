<template>
    <div  class="betrecord_box">
        <!-- <div class="box_header"><div class="head_icon"></div>投注记录</div> -->
        <div class="box_container no_select" id="dialog_userinfo">
                <!-- <div class="title"> -->
                    <!-- <table class="title_table">
                        <tbody>
                            <tr>
                                <td width="25%">&nbsp;今日概况</td>
                                <td width="25%">投注金额: <a class="price"><span id="tz_price">{{amount}}</span>元</a></td>
                                <td width="25%">中奖金额: <a class="price"><span id="win_price">{{winamount}}</span>元</a></td>
                                <td width="25%">盈利: <a class="price"><span id="yl_price">{{profit}}</span>元</a></td>
                            </tr>
                        </tbody>
                    </table> -->
                <!-- </div> -->
                <div class="menu">
                    <div class="item_1">彩种:
                        <select class="select_game" v-model="loginfo.gameid" @change="selectGame()">
                            <option  :value="0">全部</option>
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
                        <div class="check_box" :class="{ active : loginfo.type==0}" @click="toggleType(0)">全部</div>
                        <div class="check_box" :class="{ active : loginfo.type==2}" @click="toggleType(2)">已中奖</div>
                        <div class="check_box" :class="{ active : loginfo.type==3}" @click="toggleType(3)">待开奖</div>
                        <div class="check_box" :class="{ active : loginfo.type==4}" @click="toggleType(4)">撤单</div>
                        <div class="check_box" :class="{ active : loginfo.type==5}" @click="toggleType(5)">未中奖</div>
                    </div>
                </div>
                <div class="content" id="touzhu_log_table">
                    <div class="ex_page">
                        <table class="ex_custom_table">
                            <thead>
                                <tr>
                                    <td width="80">彩种</td>
                                    <td width="110">玩法</td>
                                    <td width="110">期号</td>
                                    <td width="160">投注时间</td>
                                    <td width="100">投注金额(元)</td>
                                    <td>投注详情</td>
                                    <td width="120" class="bet_status">状态</td>
                                </tr>
                            </thead>
                            <tbody  v-show="!isshow">
                                <tr v-for="(item,index) in recorddata" :key="index" class="detail_info" :class="{bgcolor:index%2==1}">
                                    <td width="80" class="lot_kind">{{item.game_name}}</td>
                                    <td width="110" class="play">{{item.wanfa}}</td>
                                    <td width="110" class="num">{{item.qishu}}</td>
                                    <td width="160" class="lot_time">{{item.tz_time}}</td>
                                    <td width="80" class="bet_money">{{item.price}}</td>
                                    <td class="bet_detail" @click="showDetail(item)">{{item.xiangqing}}</td>
                                    <td width="80" class="bet_status">
                                        <span :class="[item.status==2?'red':item.status==1?'ok':item.status==0?'yellow':item.status==3?'gray':'']">{{item.status==1?"已中奖":item.status==2?"未中奖":item.status==0?"待开奖":item.status==3?"已撤单":""}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="ex_page_tools" v-show="!isshow">
                                <!-- <span class="first_page" @click="firstPage()">首页</span> -->
                                <span class="fist_page" @click="prePage()">上一页</span>
                                <span class="btn_back"  @click="prePage()"><i class="arrow_back" ></i></span>
                                <!-- <span v-for="(item,index) in showpagebtn" class="now_page" :key=index :class="{'current_page':currentpage==item}" @click="goPage(item)"> -->
                                    <span class="current_page">{{loginfo.pageid+1}}</span>
                                    <!-- <span v-else>...</span> -->
                                <!-- </span> -->
                                <span class="btn_forward" @click="nextPage()"><i class="arrow_forward"></i></span>
                                <span class="lastpage" @click="nextPage()">下一页</span>
                                <!-- <span class="last_page" @click="lastPage()">尾页</span>
                                <span class="target_go">
                                    <input type="text" class="target_ipt" v-model="gopage">
                                    <button class="target_btn" @click="jumpToPage()">GO</button>
                                </span> -->
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
                            <a href="/game"><button>立即购买</button></a>
                        </div>
                    </div>
                </div>
        </div>
        <div class="orderdetail_box"  v-show="close">
            <div class="head"><span>订单详情</span></div>
            <span class="close"  @click="showDetail(0)"></span>
            <div class="registerNo">注册单号 ：
                <span>{{currentData.zhudan}}</span>
            </div>
            <table class="title_table">
                <tbody  class="detail_main">
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
                            <!-- <span>已结算</span> -->
                            <span>{{currentData.status==2?"未中奖":currentData.status==1?"已中奖":currentData.status==0?"待开奖":"已撤单"}}</span>
                        </td>
                        <td style="text-align:right;">中奖金额  ：</td>
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
            <!-- <textarea name="" id="" cols="30" rows="10" class="ouline"></textarea> -->
            <div class="outline" style="padding:10px;">{{currentData.xiangqing}}</div>
        </div>
    </div>
     <!-- 注记录接口返回状态字段"status"有做新的修改，具体如下 0=待开奖, 1=已中奖 2=未中奖 3=撤单 -->
</template>

<script>
import http from '~/api/http'
import { mapActions } from 'vuex';
export default {
  data(){
      return{
        loginfo:{
            gameid:0,
            type:0,
            lasttime:0,
            pageid:0
        },
        isshow:false,
        amount:'0.00',
        winamount:'0.00',
        profit:'',
        gopage:'',
        offset:0,
        limit:11,
        close:0,
        currentData:'',
        recorddata:[],
        gamedata:[]
      }
  },
  mounted(){
      this.retchGamelist();
      this.fetchData();
  },
  computed:{
    //   totalpage(){
    //     return Math.ceil(this.recorddata.length/this.limit);
    // },
    // currentpage(){
    //     return Math.ceil(this.offset/this.limit)+1;
    // },
    // prepage(){
    //     return this.offset!==0&&this.recorddata.length;
    // },
    // nextpage(){
    //     return (this.offset + this.limit < this.recorddata.length)&&this.recorddata.length;
    // },
    // showpagebtn(){
    //     let pageNum = this.totalpage,
    //         index=this.currentpage,
    //         arr=[];
    //     if(pageNum<=5){
    //         for(var i=1;i<=pageNum;i++){
    //             arr.push(i);
    //         }
    //         return arr;
    //     }
    //     if (index <= 2) return [1,2,3,0,pageNum]
    //     if (index >= pageNum -1) return [1,0, pageNum -2, pageNum -1, pageNum]
    //     if (index === 3) return [1,2,3,4,0,pageNum]
    //     if (index === pageNum -2) return [1,0, pageNum-3, pageNum-2, pageNum-1, pageNum]
    //     return [1,0, index-1, index, index + 1, 0, pageNum]
    // }
  },
  methods:{
    ...mapActions("user",["getRecorddata","getGameData"]),
    selectGame(){
        this.loginfo.pageid = 0;
        this.fetchData();
    },
    toggleTime(time){
        this.loginfo.pageid = 0;
        this.loginfo.lasttime=time;
        this.fetchData();
        // this.getRecorddata();
        // console.log(this.loginfo.lasttime);
    },
    toggleType(state){
        this.loginfo.pageid = 0;
        this.loginfo.type=state;
        this.fetchData();
        // this.getRecorddata()
        // console.log(this.loginfo.type);
    },
    showDetail(item){
        if(item == 0){
            this.close=0;
        }else{
            this.close=1;
        }
        this.currentData=item;
    },
    // goPage(params){
    //     if(params==0){
    //         this.offset+=this.limit;
    //     }
    //     if(params!==0){
    //         this.offset = ((params-1)-this.currentData)*this.limit;
    //         this.pageid=params;
    //     }
    //     this.currentpage=params;
    //     console.log(this.currentpage);
    // },
     warning () {
        this.$Message.warning('当前已经是最后一页！');
    },

    nextPage(){
        if(this.recorddata.length < 30){
            this.warning();
        }else{
            this.loginfo.pageid +=1;
            this.fetchData();
        }
    },
    prePage(){
        // this.offset -=this.limit;
       if(this.loginfo.pageid > 0){
            this.loginfo.pageid -=1;
            this.fetchData();
       }
    },
    // firstPage(){
    //     this.offset=0;
    //     // this.currentpage=1;
    // },
    // lastPage(){
    //     this.offset= Math.floor(this.totalpage-1)*this.limit;
    //     console.log(this.offset);
    // },
    // jumpToPage(){
    //     if(this.gopage>this.totalpage){
    //         alert(" 总页码只有 "+this.totalpage+ " 页 ");
    //         this.gopage=this.currentpage;
    //     }
    //     if(this.gopage==0){
    //         alert("请输入页码");
    //     }
    //     if(this.gopage !== ''){
    //         this.offset = (this.gopage-1)*this.limit;
    //     };
    // },
    numformate(item){
        let rep = item,
            amount = new Number(0),
            winamount = new Number(0),
            profit = new Number(0);
        for(var i=0;i<rep.length;i++){
           amount += Number(rep[i].price);
           winamount += Number(rep[i].win);
           profit += Number(rep[i].is_win);
        }
        this.amount = amount.toFixed(2);
        this.winamount = winamount.toFixed(2);
        this.profit = profit.toFixed(2);
    },
    //获取投注记录
    async fetchData(){
       let rep = await this.getRecorddata(this.loginfo) || [];
    //    console.log(rep);
       this.recorddata=rep;
       if(this.recorddata.length==0){
          this.isshow = true;
       }else{
           this.isshow = false;
       }
    //    this.recorddata=json.json;
       this.numformate(this.recorddata);
       return rep;
    },
    //获取玩法列表
    async retchGamelist(){
        let res = await this.getGameData() || [];
            this.gamedata = res;
            // console.log(res);
        return res;
    }
}
}
</script>

<style lang="scss" scoped>
    .betrecord_box{
        width: 827px;
        position: relative;
    }
    .box_header{
        width: 100%;
        z-index: 10;
        height: 36px;
        line-height: 36px;
        background-color: #f3f3f3;
        border: 1px solid #d3d3d3;
        border-radius: 2px;
        // padding-left: 10px;
        box-sizing: border-box;
        background: #f3f3f3;
        border: 1px Solid #ccc;
        font-size: 14px;
        color: #666;
    }
    .record{
        display: inline-block;
        padding-left: 5px;
    }
    .head_icon{
        float: left;
        width: 30px;
        height: 31px;
        background: url(../../../assets/img/user_center_icons.png) 0 -271px;
    }
    .box_container{
        // margin-top: 10px;
        width: 100%;
        position: relative;
        border: 1px Solid #ccc;
        box-sizing: border-box;
        padding-bottom: 60px;
        min-height:700px;
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
    .title_table tr{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px dotted #E7E7E7;
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
    .ex_custom_table thead
        td {
            color: #8D8B88;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            text-shadow: #FFFFFF 0px 1px 0px;
        }
        tr{
            &:last-child{
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
        background: #FEF3ED;
    }
    .detail_info{
        height: 30px;
        line-height: 30px;
        // cursor: pointer;
    }
    .detail_info td{
        text-align: center;
    }
    .ok{
        background-color: #42A00C;
    }
    .yellow{
        background-color: #F39801;
    }
    .red{
        background-color: #F13031;
    }
    .red{
        color: #F13031;
    }
    .orderdetail_box{
        position: absolute;
        z-index: 100;
        width: 600px;
        height: 450px;
        left: 100px;
        top: 100px;
        background-color: #fff;
        border:1px solid #CECECE;
        box-shadow: 2px 3px 3px #B3B3B3;
        padding: 10px;
    }
    .head{
        display: inline-block;
        font-size: 14px;
        width: 560px;
        color: #FFB380;
        border-bottom: 1px solid #FFB380;
    }
    .close{
        display: inline-block;
        width: 18px;
        height: 20px;
        line-height: 17px;
        text-align: center;
        font-size: 17px;
        // margin-top: -5px;
        // float: right;
        color: #FFB380;
        // margin-top: 5px;
    }
    .close::before{
        content:"\78"
    }
    .close:hover{
        background-color: #FFB380;
        color: #fff;
    }
    .registerNo{
        width: 100%;
        color: #ADADAD;
        line-height: 40px;
        text-align: center;
    }
    .outline{
        width: 500px;
        height: 100px;
        border: 1px solid #E1E1E1;
        margin: 10px 40px;
    }
    .bet_head{
        margin: 10px 50px;
        font-size: 12px;
    }
    .bgcolor{
        background-color: #F6F7F9;
    }
    .gray{
        background-color:gray;
    }
    .bet_detail{
        letter-spacing: 3px;
        line-height: 15px;
        padding: 3px;
        color: #87CAF2;
        cursor: pointer;
    }
    .last_page,.first_page{
        display: inline-block;
        display:inline-block;
        width: 40px;
        height: 20px;
        margin-right: 10px;
        border-radius: 3px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #E1E1E1;
        cursor: pointer;
    }
    .btn_forward,.btn_back{
        display: inline-block;
        width: 20px;
        height: 20px;
        // margin-left: 10px;
        line-height: 20px;
        border: 1px solid #E0E0E0;
        border-radius: 3px;
        color: #000;
        // text-align: center;
    }
    .arrow_back{
        display: inline-block;
        width: 0;
        height: 0px;
        margin-left: -7.5px;
        border-left: 5px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid #b9b3b3;
    }
    .arrow_forward{
        display: inline-block;
        width: 0;
        height: 0px;
        margin-left: 7.5px;
        border-right: 5px solid transparent;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #b9b3b3;
    }
    .btn_forward :hover .arrow_forward{
        border-left-color: #FE7C33;
    }
    .btn_forward:hover{
        border-color: #FE7C33;
    }
    .btn_back :hover .arrow_back{
        border-right-color: #FE7C33;
    }
    .btn_back:hover{
        border-color: #FE7C33;
    }
    .now_page:hover{
        cursor: pointer;
    }
    .btn_forward,.btn_back,.first_page,.target_btn,.last_page:hover{
        cursor: pointer;
    }
    .btn_forward{
        display: inline-block;
        margin-right: 10px;
        // margin-left: 10px;
    }
    .now_page{
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
    .current_page{
        border-color: #FE7C33;
    }
    .target_btn{
        height: 20px;
        width: 25px;
        margin: 0;
        padding:0;
        text-align: center;
        line-height: 20px;
        background-color: #fff;
        outline: 0;
        text-decoration: none;
        border: 1px solid  #CBCBCC;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        color: #6D87B7;
        font-size: 10px;
        letter-spacing: -1px;
        border-left: 0;
    }
    .target_ipt{
        display: inline-block;
        width: 30px;
        height: 20px;
        vertical-align: top;
        // padding-left: 18px;
        text-align: center;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        line-height: 20px;
        outline: none;
        border: 1px solid #CBCBCC;
    }
    .target_go{
        display: inline-block;
        // padding-top: -2px;
        background-color: #f1f1f1;
        margin-right: 5px;
    }
    .ex_page_tools{
        width: 100%;
        //  margin-top: 30px;
        position: absolute;
        bottom: 20px;
        // margin-bottom: 30px;
        text-align: center;
        .fist_page,.lastpage:hover{
            cursor: pointer;
        }
    }
    .bet_status{
        border-right: 0 !important;
        >span{
        display: inline-block;
        width: 56px;
        height: 18px;
        line-height: 18px;
        border-radius: 5px;
        color: #ffffff;
        }
    }
    .nonelog{
        display:block;
        text-align:center;
        margin-top: 190px;
        p{
            font-size: .875rem;
            height: 10px;
            line-height: 10px;
            color: #bfbfbf;
            font-weight: 700;
        }
        a{
            margin-top: 10px;
            display:inline-block;
            // height: 35px;
            // line-height: 35px;
            font-size: 16px;
            font-weight: bolder;
            color: #666;
        }
        button{
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
    .current_page{
        display: inline-block;
        margin: 0 20px;
    }
    .page_info{
        display: inline-block;
        margin-left: 10px;
    }
    .fist_page{
        margin-right: 10px;
    }
</style>
