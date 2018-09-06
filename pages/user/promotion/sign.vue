<template>
  <div class="sign_body">
    <p class="title"><span>—</span>签到领彩金<span>—</span></p>
    <Tabs :animated="false"  @on-click="toGetUserAwardLog" v-model="nowTab">
      <TabPane label="每日签到">
        <div class="month"><span>{{currentMonth}}</span>月签到</div>
        <div class="month_box">
          <div class="weekdays">
            <ul>
              <li>星期日</li>
              <li>星期一</li>
              <li>星期二</li>
              <li>星期三</li>
              <li>星期四</li>
              <li>星期五</li>
              <li>星期六</li>
            </ul>
          </div>
          <div class="day">
            <ul>
              <li v-for="(item,key) in days" :key="key">
								<span :class="[(arrDate.includes(item)) && (item===today)?'active isSign':(item===new Date().getDate())?'active':(arrDate.includes(item))?'isSign':'',(item == today && !arrDate.includes(item))?'cursor':'']"  @click="toSignIn(item)">{{item}}</span>
                <!-- <span :class="[(item==today&&!arrDate.includes(today))?'active':'',(arrDate.includes(item)==true)?'isSign':'',(item===today)&&!(arrDate.includes(today))?'cursor':'']">{{item}}</span>  -->
              </li>
            </ul>
						<div style="clear: both;"></div>
          </div>
        </div>
        <div class="bxyl_right">
			    <div class="head">累计签到奖励</div>
          <div class="box">
            <p class="title">累计签到天数: <span class="sign_number">{{signdays}}</span>天</p>
			      <div id="win_box" style="padding: 0 20px;">
              <div class="box_cent">
                <div class="ling_box">
                  <div class="box_list">
										<p class="_title">累计签到 <span style="color:red;">{{totaldays}}</span> 天可以领取</p>
                    <Tooltip placement="top">
                      <!-- <Button>Multiple lines</Button> -->
                      <img class="view_box" :src="[isbox*1 === 1?isday_28:qian_28]" v-show="remaindays >= 0">
                      <!-- <img class="view_box" :src="lingqu" v-show="awardsuccessed"> -->
                      <div slot="content">
                        <p>累计签到{{totaldays}}天可以领取</p>
                        <p>红包奖励</p>
                      </div>
                    </Tooltip>
                    <p class="days" data-status="0">
											<span >
												还剩{{remaindays}}天
											</span>
										</p>
                    <p class="days" data-status="0" style="background-color:#f13131;color:#fff;cursor:pointer;" v-show="remaindays==0">
											<span @click="GetUserSignAward()" v-show="isbox=='1'">领取</span>
											<!-- <span  v-show="isbox=='0'">已领取</span> -->
										</p>							
                  </div>
                </div>
              </div>
			      </div>
          </div>
		    </div>
        <p class="prompt" style="font-size:12px;margin-top:20px;">
					<span style="color:blue;font-size:14px;font-weight:bold;float:left;">提示：</span>
					<div style="float:left;margin-top:5px;font-size:14px;">
						<p style="padding-left:10px;height:20px;">1、签到奖励每个月初会重新刷新，签的越多奖的越高！</p>
						<p style="padding-left:10px;height:20px;">2、领取宝箱即可随机获得代金券或现金奖励。</p>
					</div>
				</p>
      </TabPane>
      <TabPane label="签到历史">
        <div class="history">签到历史</div>
        <div class="history_box">
          <p class="receive">
						<div style="padding-left:50px;">
							<!-- <span  class="secspan">您本月共领取到 <span>{{totalAward}}</span> 元</span> -->
							<p>
								<span style="font-size:14px;">时间：</span>
								<span class="rewardtime" :class="{'active':month==0}" @click="selectTime(0)">当月</span>
								<span class="rewardtime" :class="{'active':month==1}" @click="selectTime(1)">上月</span>
								<span class="rewardtime" :class="{'active':month==2}" @click="selectTime(2)">上上月</span>
							</p>
						</div>					
					</p>
          <div class="reward_box" v-for="(item,index) in awardlog" :key="index" v-show="(offset<=index&&index<(limit+offset))">
            <p class="time">{{item.uptime}}</p>
            <div class="cont">
              <p class="money">成功领取<span>{{item.price_type}}</span><span>{{item.reward_price}}</span>元</p>
              <p class="day">已达到<span>{{item.sign_days}}</span>天奖励资格</p>
            </div>
            <div class="bag">
              <p>{{item.reward_price}}元{{item.price_type}}</p>
            </div>
          </div>
					<Page v-show="!isshow" :total="awardlogNum" :page-size=5 show-total :current="currentpage" @on-change="changePage(currentpage)" show-elevator style="text-align:center;margin-bottom:10px;"></Page>
					<div class="nonelog" v-show="isshow">
						<img src="~/assets/img/none_log.png" alt="">
						<p>暂无记录</p>
						<a href="/user/promotion/sign"><button>立即签到</button></a>
					</div>
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="modal7" :closable="false">
        <p class="baoxiang"><img src="~/assets/img/baoxiang_ok.png" alt="">
      	<p class="gongxi"><img src="~/assets/img/gongxi.png" alt=""></p>
				<p class="awarddetail">获得<span style="font-size:60px;color:rgb(235,51,73)"> {{rewardprice}} </span>元<span>{{rewardmode}}</span></p>
				<p class="close" @click="modal7 = false"><img src="~/assets/img/close.png" alt=""></p>
    </Modal>
  </div>
</template>
<script>
import qian_28 from "~/assets/img/qian_day_28.jpg"
import isday_28 from "~/assets/img/is_day_28.jpg"
import lingqu from "~/assets/img/on_baoxiang28.png"
import {mapActions} from 'vuex';
import { types } from 'util';
import { setTimeout } from 'timers';
export default {
	data() {
		return {
			qian_28:qian_28,
			isday_28:isday_28,
			lingqu:lingqu,
			currentDay: '',
			modal7:false,
			nowTab:0,
			today:'',
			offset:0,
			limit:5,
			isshow:false,
			isbox:'',
			isSigned:false,
			currentpage:1,
			totalAward:'',
			currentMonth: '',
			currentYear: '',
			currentWeek: '',
			awardlog:[],
			awardlogNum:0,
			getawardtime:[],
			rewardmode:'',
			rewardprice:'',
			// awardsuccessed:false,
			//签到天数
			signdays:0,
      dayLis:0,
			list: 0,
			month:0,
			remaindays:'',
			days: [],
			totaldays:0,
			//签到日期
			arrDate: []
		};
	},
	created () {
		//在vue初始化时调用
		this.today=new Date().getDate();
		this.initData();
		this.getSignInData();
	},
	methods: {
		...mapActions("signIn",["getUserSignedLog","getUserAwardLog","gameUserSigned","getUserSignAward"]),

		//领取奖励
	  async	GetUserSignAward(){
			let res= await this.getUserSignAward() || [];
			this.rewardmode = res.reward_type;
			this.rewardprice = res.reward_price;
			this.modal7 = true;
			// console.log(res);
			this.getSignInData();
			return res;
		},
 

		//获取奖励记录
		async toGetUserAwardLog(){
			if(this.nowTab == 1){
				let res = await this.getUserAwardLog(this.month) || [];
				// console.log("奖励记录");
				// console.log(res);
				// console.log(this.nowTab);
				this.awardlog=res;
				this.awardlogNum=this.awardlog.length;
				let num =new Number(0),
						getawardtime=[],
						arr = res;
				for(var i=0;i<arr.length;i++){
					num += Number(arr[i].reward_price);
					let day = new Date(arr[i].uptime).getDate();
					getawardtime.push(day);
					// if(day == this.today){
					// 		this.rewardmode = Number(arr[i].reward_mode);
					// 		this.rewardprice= arr[i].reward_price;
					// 		this.awardsuccessed==true;
					// }
				}
				if(this.awardlog.length == 0){
					this.isshow = true;
				}else{
					this.isshow = false;
				}
				this.getawardtime = getawardtime;
				this.totalAward = num.toFixed(2);
				return res;
				}
		},

		//每日点击签到
	  async	toSignIn(item){
			if((this.arrDate.includes(this.today) == false) && item==this.today){
					await this.toGameUserSigned();
				  await	this.getSignInData();
					let self = this;
					if(self.isSigned){
						this.$Message.success('签到成功！');
					}
				}
		},
		
		async toGameUserSigned (item){
			let res = await this.gameUserSigned();
			return res;
		},

		//奖励记录分页
		changePage (){
			if(this.offset>this.currentpage*this.limit&&this.offset!==0){
				this.offset-=this.limit*this.currentpage;
			}else{
				this.offset+=this.limit*this.currentpage;
			}
		},

		//获取签到记录
		async getSignInData (){
			let res = await this.getUserSignedLog();
			let arr = res.log.split("+");
			this.arrDate = [];
			// console.log("签到记录");
			// console.log(res);
			this.isbox = res.is_box;
			this.remaindays = res.box_info.replace(/[^0-9]/gi, "");
			if( res.log !== ""){
				for(var i=0;i<arr.length;i++){
					let signday = new Date(arr[i]).getDate();
					this.arrDate.push(signday);
				}
				this.signdays = this.arrDate.length;
			}
			this.totaldays = this.remaindays*1 + this.signdays*1;
			if(this.arrDate.includes(this.today)){
				this.isSigned = true;
			}
			// console.log(this.isSigned);
			// console.log("您已经签到的日期");
			// console.log(this.arrDate)
		},

		//显示月份内领取奖励记录
		selectTime (time){
				this.month=time;
				this.toGetUserAwardLog();
		},
		
		initData() {
			let leftcount = 0; //存放剩余数量
			let date;
			let now = new Date();
      let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
			d.setDate(42);
      date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
			this.currentDay = date.getDate();
			this.currentYear = date.getFullYear();
			this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      // 当月天数
      this.dayLis = (new Date(this.currentYear, this.currentMonth, 0)).getDate();
      // 需要的标签数
      this.list = Math.ceil((this.dayLis + this.currentWeek)/7)*7;

			let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
			this.days.length = 0;
      // console.log(this.currentWeek);
			for (let i = this.currentWeek; i >= 0; i--) {
        let d = new Date(str);
        if(i>0){
          d = ''
        }else {
          d.setDate(d.getDate() - i);
          d = d.getDate()
        }
        // d.setDate(d.getDate() - i);
        // d = d.getDate()
        // let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
				// dayobject = { day: d.getDate(), isSign: this.isVerDate(d.getDate())};
				this.days.push(d); //将日期放入data 中的days数组 供页面渲染使用
			}

			//其他周
			for (let i = 1; i < this.list - this.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        d = d.getDate()
        if(i>7 & d<7){
          d = ''
        }
				// let dayobject = {};
				// // dayobject.day=d;
        // dayobject = { day: d.getDate(), isSign: this.isVerDate(d.getDate())};
				this.days.push(d);
      }
      // console.log(this.days)
		},
		isVerDate(v) {
			return this.arrDate.includes(v);
		},
		formatDate(year, month, day) {
			let y = year;
			let m = month;
			if (m < 10) m = '0' + m;
			let d = day;
			if (d < 10) d = '0' + d;
			return y + '-' + m + '-' + d;
		}
	}
};
</script>
<style lang="scss" scoped>
.sign_body {
	width: 827px;
	position: relative;
	.title {
		font-size: 23px;
		line-height: 45px;
		text-align: center;
		span {
			color: #ccc;
			padding: 0 10px;
		}
	}
	.ivu-tabs {
		width: 100%;
		display: inline-block;
		.ivu-tabs-bar {
			margin-bottom: 0;
			border-bottom: none;
			.ivu-tabs-ink-bar {
				display: none !important;
			}
			.ivu-tabs-tab-active {
				color: #fff;
				background-color: #f13131;
			}
			.ivu-tabs-tab {
				margin-right: 0;
				width: 100px;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
			}
		}
		.month,
		.history {
			text-align: center;
			width: 580px;
			font-size: 18px;
			font-weight: 600;
			line-height: 35px;
			color: #fff;
			background-color: #f13131;
			display: inline-block;
			span {
				font-size: 28px;
			}
		}
		.month_box {
			width: 580px;
			display: inline-block;
			border: 1px solid #ccc;
			border-top: none;
      padding-bottom: 5px;
			.weekdays {
				// display: flex;
				height: 35px;
				border-bottom: 1px solid #ccc;
				li {
					float: left;
					width: 14.28%;
					text-align: center;
					line-height: 35px;
				}
			}
			.day {
        li {
          float: left;
					width: 14.28%;
          height: 97px;
					text-align: center;
					line-height: 75px;
          font-size: 28px;
          font-weight: 400;
          color: #666;
          padding: 5px;
          .other-month {
            color: #ccc;
          }
          >span {
            display: block;
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 77px;
            // cursor: pointer;
            span {
              display: block;
              border-radius: 4px;
            }
          }
          .active.isSign {
            box-shadow:none;
          }
          .isSign {
            background: url(~/assets/img/calendar_week.png) no-repeat;
            background-position:50% -150%;
          }
          .active {
            box-shadow:0 0 15px red inset;
          }
					span:hover {
						transform: scale(1.2,1.2);
						transition: all 0.8s;
					}
        }
			}
		}
		.bxyl_right {
			width: 240px;
			// border: 1px solid #cccccc;
			// display: inline-block;
			float: right;
      position: absolute;
      right: 0;
      top: 52px;
			.head {
				background: #f13131;
				text-align: center;
				color: #ffffff;
				font-size: 18px;
				height: 40px;
				line-height: 40px;
			}
			.box {
				border: 1px solid #cccccc;
				border-top: none;
				height: 526px;
			}
			.ling_box{
				margin-top: 165px;
			}
			.title {
				text-align: center;
				font-size: 16px;
				font-weight: 500;
				line-height: 40px;
				.sign_number {
					color: #f13131;
				}
			}
			.box_cent {
				border-radius: 10px;
				// border: 1px solid #CCC;
				display: inline-block;
				width: 100%;
				text-align: center;
				margin-bottom: 10px;
				position: relative;
				._title {
					position: absolute;
					top:-20px;
					left: 15px;
					text-align: center;
					width: 85%;
					background-color: #fff;
					// border: 1px solid #e3e3e3;
					border-radius: 10px 10px 0px 0px;
					line-height: 32px;
					font-size: 12px;
				}
				.box_list {
					position: relative;
					border: 1px solid #ccc;
					border-radius:10px;
					height: 150px;
					// border-top: none;
				}
				.ivu-tooltip-popper {
					top: -15px !important;
					left: 40px !important;
					p {
						font-size: 15px;
						text-align: center;
						font-weight: 600;
					}
				}
				img {
					margin-top: 35px;
					width: 51px;
					height: 41px;
				}
				.days {
					position: absolute;
					bottom: 10px;
					left: 64px;
					background: #ccc;
					color: #666;
					width: 70px;
					font-size: 15px;
					// margin: 0px auto 10px auto;
					line-height: 24px;
					border-radius: 5px;
				}
			}
		}
		.prompt {
			width: 580px;
			font-size: 12px;
			font-weight: 600;
			line-height: 30px;
			span {
				color: rgb(70, 161, 234);
			}
			>p{
				margin-left: 10px;
			}
		}
		.history {
			line-height: 40px;
			width: 100%;
		}
		.history_box {
			position: relative;
			border: 1px solid #ccc;
			border-top: none;
			min-height: 500px;
			min-height: 725px;
		}
		.receive {
			font-size: 14px;
			line-height: 40px;
			text-align: center;
		}
		.secspan {
				padding: 0 5px;
				float:right;
				margin-right:300px;
				margin-top:8px;
			}
		.reward_box {
			padding: 10px 50px;
			position: relative;
			margin-bottom: 20px;
			.time {
				color: #999;
				line-height: 20px;
			}
			.cont {
				border: 1px solid #ccc;
				padding: 0 20px;
				p {
					display: inline-block;
					font-size: 15px;
					line-height: 60px;
				}
				.money {
					width: 300px;
					margin-right: 60px;
					span {
						color: #f13131;
					}
				}
			}
			.bag {
				position: absolute;
				top: 8px;
				right: 50px;
				width: 150px;
				height: 95px;
				background: url(~/assets/img/sign_meny.png) no-repeat;
				background-size: 100%;
				border-radius: 5px;
				p {
					color: #fff;
					font-size: 14px;
					font-weight: 600;
					text-align: center;
					position: absolute;
					top: 56%;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
}
.cursor:hover{
		cursor: pointer;
}
.signsuccess{
	position: absolute;
	// width: 424px;
	height: 200px;
	border: 1px solid #e3e3e3;
	top: 50%;
	left: 50%;
		.alert_header{
			height: 34px;
			line-height: 34px;
			width: 100%;
			padding-left: 10px;
			font-size: 16px;
		}
}
.mask{
	width: 100%;
	height: 100%;
	z-index: 100000;
	color: red;
	background: red;
}
 .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
	.ivu-modal{
			top: 100;
			
	}
	.rewardmode{
		position: absolute;
		bottom: 40px;
		left: 40px;
		color: red;
	}
 }
 .rewardtime{
	 display: inline-block;
	 text-align: center;
	 height:25px;
	 line-height: 25px;
	 margin-right: 5px;
	 margin-top: 5px;
	 margin-bottom: 20px;
	 width: 50px;
	 font-size: 14px;
	 border: 1px solid #e3e3e3;
	 cursor: pointer;
 }
 .active.rewardtime{
	 border-color: red;
	 color: red;
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
	.ivu-page{
		position: absolute;
		bottom: 15px;
		text-align: center;
		margin-left: 280px;
	}
	.ivu-tooltip-popper{
		position: absolute;
		left: 20px;
	}
	.ivu-modal-content{
		position: relative;
		background: #999;
		border:0;
		color: #999;
		.ivu-modal-body{
			background-color:#878787;
		}
		.ivu-modal-close{
			display: none;
		}
		.ivu-modal-footer{
			border: none;
			display: none;
		}
		.baoxiang{
			position: absolute;
			text-align: center;
			z-index: 100;
			top: 260px;
			left: 120px;
			img{
				display: inline-block;
				width: 206px;
				height: 176px;
			}
		}
		.gongxi{
			position: absolute;
			left: -60px;
			top: 0px;
			z-index: 10;
			img{
				background-color: #878787;
				// opacity: 0.98;
			}
		}
		.awarddetail{
			position: absolute;
			top:480px;
		  text-align: center;
			z-index: 999;
			left:150px;
			font-size: 40px;
			color: rgb(65,65,65);
		}
		.close{
			position: absolute;
			top: 630px;
			z-index: 9999;
			left: 180px;
		}
	}
</style>
