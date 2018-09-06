<template>
  <div class="user_info">
    <Tabs :animated="false" @on-click="tab" type="card">
      <TabPane label="个人资料">
        <div class="use_top">
          <div class="userinfo_left">
            <div class="header">
              <img class="header_icon" title="点击修改头像" alt="点击修改头像" :src="iconUrl" @click="fileIcon">
              <div class="header_tools">
                <a class="btn_update_head" v-if="newIcon">点击保存头像</a>
                <a class="btn_update_head" v-else @click="updateIcon">点击保存头像</a></div>
            </div>
			      <input type="file" @change="getHeadImage" id="call_camera" accept="image/*" v-show="false">
            <div class="line special">帐号：<span>{{userinfo.username}}</span></div>
            <div class="line">余额：<span style="color:red">{{userinfo.price}}</span>元</div>
            <div class="xiao_but">
              <div class="notice2 login_box_chongti" @click="goRouter('user-account-safe')">
                <span></span>修改密码</div>
              <div class="notice1 login_box_chongti" @click="goRouter('user-message-notice')">
                <span></span>系统公告</div>
            </div>
          </div>
          <div class="userinfo_center pay_price login_box_chongti" data-link="onlpay" @click="goRouter('user-property-recharge')">
            <div class="take_icon"></div>
            <div class="word">在线入款
              <span></span>
            </div>
            <div class="zhushi">支持微信/支付宝/快捷支付</div>
            <div style="clear: both;"></div>
          </div>
          <div class="userinfo_right get_price login_box_chongti" data-link="take" @click="goRouter('user-property-getcash')">
            <div class="take_icon"></div>
            <div class="word">在线取款
              <span></span>
            </div>
            <div class="zhushi">24小时客服在线，3分钟出款</div>
            <div style="clear: both;"></div>
          </div>
        </div>
        <div class="xiaoxi">
          <span></span>消息中心 </div>
        <div class="xiaoxi_content" id="text_content">
          <img src="../../../assets/img/no_user_msg.png" alt="" v-show="isShow">
          <div v-for="(item,key) in userMessage" :key="key" v-show="!isShow">
            <div class="left_icon">
              <span></span>
            </div>
            <div class="xiaoxi_box">
              <div class="miaosu">
                <span class="web_title">{{item.title}} </span>
                <strong style="color:#F60">{{sendTime(item.sendtime)}}</strong>
              </div><br>
              <p>{{item.content}}</p>
            </div>
            <div class="sanjiao"></div>
            <div style="clear:both"></div>
          </div>
        </div>
      </TabPane>
      <TabPane label="我的等级" v-if="isAdvance">
        <div style="padding: 0 20px 20px 20px">
          <Tabs :animated="false" class="lv">
            <TabPane label="成长奖励">
              <div class="userrank">
                <div class="box_container_head">
                  <div class="box_container_left">
                    <div class="head_img" style="margin-top: 10px;">
                      <img style="width: 65px; height: 65px;border-radius: 100%;" :src="iconUrl">
                    </div>
                    <span class="member_name">{{userinfo.username}}</span>
                  </div>
                  <div class="box_container_right">
                    <ul>
                      <li>
                        <i>等</i>级：
                        <b>LV.{{grade.vip}}</b>
                      </li>
                      <!-- <li>
                        <i>头</i>衔：{{grade.title}}</li> -->
                      <li>成长值：<b>{{grade.exp}}</b></li>
                      <li class="box_container_gray">平台中，充值、投注、任务都可获得成长值
                        <button class="recharge give_pay" @click="goRouter('user-property-recharge')">马上充值</button>
                      </li>
                    </ul>
                  </div>
                  <div class="statistics">
                    <div class="tit">成长值分类统计：</div>
                    <div v-for="(i,key) in tradLog.exp_sum" :key="key">{{i.title}}：<span>{{i.exp}}</span></div>
                  </div>
                </div>
                <div class="progress">
                  <Progress :percent="progress" :style="progress>50?'color:#fff':'color:#e71826'"></Progress>
                  <div class="level_cur">LV.{{grade.prevVip}}</div>
                  <div class="level_next">LV.{{grade.nextVip}}</div>
                  <div class="center_info">距离下一级还需<span>{{grade.nextExp - grade.exp}}</span>分</div>
                </div>
                <Tabs :animated="false" class="reward">
                  <TabPane label="等级奖励">
                    <ul>
                      <li v-for="(i,key) in rewardLog" :key="key" v-if="(key<=(pageid*10+9)) && (key>=(pageid*10))"><span>{{i.title}}</span><span>{{i.price}}彩金</span><span>{{i.date}}</span></li>
                    </ul>
										<div class="page">
											<!-- <span class="h" @on-change="changePage(1)">首页</span>
											<span class="t" @on-change="changePage()">尾页</span> -->
											<Page :total="total" :page-size="pageSize" show-elevator show-total @on-change="changePage"/>
										</div>
                  </TabPane>
                  <TabPane label="任务礼包" class="gift">
                    <ul>
                      <li v-for="(item,key) in grade.task_list" :key="key" @click="tofulfil(item.tag,item.status)">
												<span>{{item.title}}</span>
												<span>+{{item.addexp}}成长值</span>
												<span><i :style="(item.status==1)?'background-color: #22AD38':'background-color: #ccc'">{{item.status==1?'已完成':'未完成'}}</i></span>
											</li>
                    </ul>
                  </TabPane>
                </Tabs>
              </div>
            </TabPane>
            <TabPane label="成长明细" class="growing">
							<ul>
                <li v-for="(i,key) in tradLog.exp_list" :key="key" v-if="(key<=(growingpageid*10+9)) && (key>=(growingpageid*10))"><span>{{i.title}}</span><span>{{i.exp}}成长值</span><span>{{i.date}}</span></li>
              </ul>
							<div class="page">
								<Page :total="growingTotal" :page-size="pageSize" show-elevator show-total @on-change="change"/>
							</div>
						</TabPane>
            <TabPane label="规则" class="rule">
							<div class="tit">
								<p>如何获得成长值：</p>
								<span>充值：<i>平台中，每充值1元可获取1成长值</i></span>
								<span>任务：<i>完成任务可以获得相应的成长值</i></span>
								<span>打码：<i>平台中，每投注1元可获取1成长值</i></span>
							</div>
              <div class="grade">等级成长值对应表：</div>
              <table style="border-collapse:collapse;width:100%">
                <thead>
                  <tr>
                    <th>等级</th>
                    <th>成长值</th>
                    <th>等级礼金</th>
                    <th>周俸禄</th>
                    <th>月俸禄</th>
                  </tr>
                </thead>
								<tbody>
									<tr v-for="(item,key) in rule" :key='key'>
										<td>LV.{{item.vip}}</td>
										<td>{{item.exp}}</td>
										<td>{{item.level_reward}}</td>
										<td>{{item.week_reward}}</td>
										<td>{{item.month_reward}}</td>
									</tr>
								</tbody>
              </table>
            </TabPane>
          </Tabs>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import decodeFunc from '~/components/user/decode.js'
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
	name: 'userInfo',
	computed: {
		...mapState({
			userinfo: state => state.userinfo.accountInfo
		})
	},
	data() {
		return {
			isShow: false,
			newIcon:true,
			userMessage: [],
			grade: [],
			progress: 0,
			iconUrl: '',
			files: [],
			total: 0,
			pageid: 0,
			length: 0,
			rise_list:[],
			rewardLog:[],
			pageSize:10,
			tradLog:[],
			growingTotal:0,
			growingpageid:0,
			rule:[],
			isAdvance: true
		};
	},
	mounted() {
		this.isAdvance = this.$store.state.sysinfo.sysinfo.event_rise == 1 ? true : false //判断用户晋级活动是否开放
		this.togetUserMessage();
		let iconUrl = this.userinfo.head_icon;
    if(iconUrl !== '') {
      this.iconUrl = iconUrl
    } else {
      this.iconUrl = require('../../../assets/img/user_head_icon_head.jpg')
    }
	},
	mixins: [decodeFunc],
	methods: {
		...mapActions('user', [
			'getUserMessage',
			'GetUserEventRiseInfo',
			'UploadUserHeadIconByBase64',
			'updateUserIconInfo',
			'GetRiseRewardLog',//已经领取奖励列表
			'GetUserExpTradLog',//晋级活动积分明细
			'GetRiseViewInfo'//晋级活动规则
		]),
		async togetUserMessage() {
			let mess = await this.getUserMessage();
			this.userMessage = mess.data
			if(this.userMessage.length > 3) this.userMessage.length = 3
			if (this.userMessage.length === 0) this.isShow = true;
		},
		async toGetUserEventRiseInfo() {
			this.grade = await this.GetUserEventRiseInfo();
			this.rise_list = this.grade.rise_list.sort(this.compares('stor'))
      // console.log(this.grade)
			this.progress = parseInt(this.grade.exp / this.grade.nextExp * 100);
		},
		async toGetRiseRewardLog() {
			this.rewardLog = await this.GetRiseRewardLog();
			this.total = this.rewardLog.length
			// console.log(this.rewardLog)
		},
		async toGetUserExpTradLog() {
			this.tradLog = await this.GetUserExpTradLog();
			this.growingTotal = this.tradLog.exp_list.length
			// console.log(this.tradLog)
		},
		async toGetRiseViewInfo() {
			var temp = await this.GetRiseViewInfo()
			console.log(temp)
			this.rule = temp
			// var temp = document.createElement("div");
      // temp.innerHTML = this.decodeEvent(await this.GetRiseViewInfo())
      // var output = temp.innerText || temp.textContent;
      // temp = null;
      // this.rule = output
			// console.log(this.tradLog)
		},
		compares (prop) {
      return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
		},
		tofulfil(tag,i){
      if(i == 1) {
				this.$Message.success('该任务已完成');
        return
      }
      if(tag == 'sign'){
        this.$router.push('/user/promotion/sign')
      }else if(tag == 'realname'){
        this.$router.push('/user/account/safe')
      }else if(tag == 'wechat'){
        this.$router.push('/user/account/safe')
      }else if(tag == 'qq'){
        this.$router.push('/user/account/safe')
      }else if(tag == 'email'){
        this.$router.push('/user/account/safe')
      }else if(tag == 'question'){
        this.$router.push('/user/account/safe')
      }else if(tag == 'bank'){
        this.$router.push('/user/account/bank')
      } else if(tag == 'phone'){
        this.$router.push('/user/account/safe')
      }
    },
		fileIcon() {
			let el = document.getElementById('call_camera');
			el.click();
		},
		getHeadImage(val) {
			if (val.target.files.length === 0) {
				return;
			}
			if (val.target.files.length > 1) {
				this.$Message.warning('一次只能上传一张图片');
				return;
			}
			this.newIcon = false
			this.files = val.target.files;
			let reader = new FileReader();
			reader.readAsDataURL(this.files[0]);
			reader.onloadend = e => {
				this.iconUrl = reader.result;
			}
		},
		updateIcon() {
			if (this.files[0].size < 200 * 1024) {
				this.uploadHeadImg('data-png-' + this.iconUrl.split('base64,')[1]);
			} else {
				this.bigImg2Base64(this.iconUrl);
			}
			this.newIcon = true
		},
		uploadHeadImg(base64) {
			let imgurl;
			this.UploadUserHeadIconByBase64({
				img: base64
			}).then(res => {
				imgurl = res;
				let request = {
					type: 8,
					icon: res
				};
				return this.updateUserIconInfo(request);
			})
			.then(res => {
				this.$Message.success('上传头像成功');
				this.newIcon = true
			});
		},
		bigImg2Base64(base64) {
			createNewB64(
				base64,
				ret => {
					this.uploadHeadImg('data-png-' + ret.split('base64,')[1]);
				},
				() => {
					this.$Message.warning('上传图片失败');
				}
			);
		},
		sendTime(t) {
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
			return y + '-' + add0(M) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(m) + ':' + add0(s);
		},
		goRouter(name) {
			this.$router.push({
				name: name
			});
		},
		tab(e) {
			if (e === 0) {
				this.togetUserMessage();
			} else {
				this.toGetUserEventRiseInfo()
				this.toGetRiseRewardLog()
				this.toGetUserExpTradLog()
				this.toGetRiseViewInfo()
			}
		},
		changePage(n){
			this.pageid = n-1
		},
		change(n){
			this.growingpageid = n-1
		},
	}
};
</script>
<style lang="scss">
.user_info {
	width: 827px;
	.ivu-tabs-ink-bar {
		background-color: rgb(231, 24, 38);
		height: 3px;
	}
	.ivu-tabs-bar {
		border-bottom: none;
		margin-bottom: 0px;
    padding: 0 20px;
    .ivu-tabs-nav-container{
      margin-bottom: 0 !important;
    }
		.ivu-tabs-tab {
			margin-right: 20px !important;
      border: none !important;
      background-color: #fff !important;
      padding: 5px !important;
      transition: all 0s !important;
		}
		.ivu-tabs-tab-active {
			color: rgb(231, 24, 38);
      border-bottom:3px solid rgb(231, 24, 38) !important;
		}
	}
	.ivu-tabs-content {
		border: 1px solid #ccc;
		.use_top {
			height: 160px;
			width: 100%;
			border-bottom: 1px solid #ccc;
			.userinfo_left {
				margin-left: 20px;
				width: 295px;
				float: left;
				border-right: 1px dashed #ccc;
				margin-top: 20px;
				.header {
					float: left;
					.header_icon {
						background: #468fd9;
						width: 82px;
						height: 82px;
						border-radius: 82px;
						cursor: pointer;
					}
					.header_tools {
						font-size: 12px;
						margin-top: 10px;
						a {
							color: #468fd9;
						}
					}
				}
				.line {
					display: block;
					margin-left: 110px;
					margin-top: 10px;
					font-size: 12px;
					color: #434343;
					._userinfo_label {
						margin-right: 5px;
					}
				}
				.xiao_but {
					display: block;
					margin-left: 110px;
					margin-top: 10px;
					font-size: 12px;
					color: #959595;
					.notice2 {
						display: inline-block;
						margin-right: 20px;
						cursor: pointer;
						span {
							display: inline-block;
							width: 15px;
							height: 17px;
							background: url(../../../assets/img/personage.png) no-repeat;
							background-position: 0px -30px;
							margin-right: 5px;
						}
					}
					.notice3 {
    				display: inline-block;
    				cursor: pointer;
						span {
    					display: inline-block;
    					width: 15px;
    					height: 17px;
    					background: url(../../../assets/img/user_icon_name.png) no-repeat;
    					background-position: 0px 3px;
    					margin-right: 5px;
						}
					}
					.notice1 {
						display: inline-block;
						cursor: pointer;
						span {
							display: inline-block;
							width: 15px;
							height: 17px;
							background: url(../../../assets/img/personage.png) no-repeat;
							background-position: 0px -1px;
							margin-right: 5px;
						}
					}
				}
			}
			.userinfo_center {
				width: 255px;
				float: left;
				cursor: pointer;
				.take_icon {
					float: left;
					width: 62px;
					height: 62px;
					margin-left: 10px;
					background: url(../../../assets/img/personage.png) no-repeat;
					background-position: -77px 0px;
					margin-top: 40px;
				}
				.word {
					text-align: center;
					color: #434343;
					font-size: 18px;
					margin-top: 42px;
					position: relative;
					span {
						display: inline-block;
						width: 28px;
						height: 18px;
						background: url(../../../assets/img/hot_huang.gif) no-repeat;
						background-size: 28px 16px;
						position: absolute;
						margin-top: -15px;
						margin-left: -15px;
						animation: hot 0.5s linear infinite;
					}
				}
				.zhushi {
					color: #9d9d9d;
					font-size: 12px;
					margin-top: 10px;
					margin-left: 91px;
					width: 165px;
				}
			}
			.userinfo_right {
				width: 255px;
				float: left;
				border-left: 1px dashed #ccc;
				margin-top: 20px;
				height: 116px;
				.take_icon {
					float: left;
					width: 62px;
					height: 62px;
					margin-left: 10px;
					background: url(../../../assets/img/personage.png) no-repeat;
					background-position: -62px -81px;
					margin-top: 20px;
				}
				.word {
					text-align: center;
					color: #434343;
					font-size: 18px;
					margin-top: 22px;
					position: relative;
					span {
						display: inline-block;
						width: 28px;
						height: 18px;
						background: url(../../../assets/img/hot_hong.gif) no-repeat;
						background-size: 28px 17px;
						position: absolute;
						margin-top: -18px;
						margin-left: -15px;
						animation: hot 0.5s linear infinite;
					}
				}
				.zhushi {
					color: #9d9d9d;
					font-size: 12px;
					margin-top: 10px;
				}
			}
			.get_price {
				cursor: pointer;
			}
		}
		.xiaoxi {
			font-size: 15px;
			margin: 20px 0 10px 23px;
			line-height: 30px;
			span {
				margin-right: 10px;
				float: left;
				width: 25px;
				height: 25px;
				background: url(../../../assets/img/personage.png) no-repeat;
				background-position: -30px 2px;
			}
		}
		.xiaoxi_content {
			margin-bottom: 30px;
			img {
				display: block;
				margin: 150px auto;
			}
			.left_icon {
				width: 63px;
				height: 100%;
				float: left;
				span {
					display: inline-block;
					width: 46px;
					height: 49px;
					background: url(../../../assets/img/personage.png) no-repeat;
					background-position: -3px -53px;
					margin-top: 45px;
					margin-left: 15px;
				}
			}
			.xiaoxi_box {
				width: 661px;
				min-height: 105px;
				border: 1px solid #ccc;
				float: left;
				margin-top: 20px;
				border-radius: 10px;
				position: relative;
				margin-left: 10px;
				background: #fff;
				box-sizing: border-box;
				padding: 6px 20px 6px 20px;
				.miaosu {
					float: left;
					font-size: 14px;
					line-height: 1;
					margin-top: 10px;
					color: #959595;
					width: 577px;
					.web_title {
						color: rgb(44, 153, 229);
					}
				}
				p {
					font-size: 13px;
					line-height: 20px;
					margin-top: 10px;
					// color: #959595;
				}
			}
			.santiao {
				width: 10px;
				height: 10px;
				border-bottom: 1px solid #ccc;
				border-left: 1px solid #ccc;
				transform: rotate(45deg);
				position: absolute;
				margin-top: 65px;
				margin-left: 68px;
				background: #fff;
			}
		}
	}
	.userrank {
		width: 780px;
		margin-top: 20px;
		.box_container_head {
			border: 1px solid #eeeeee;
			background: #f7f7f7;
			border-radius: 5px;
			display: flex;
      position: relative;
			.box_container_left {
				margin: 22px 0 0 22px;
				position: relative;
				.member_name {
					font-size: 12px;
					color: #434343;
					text-align: center;
					width: 100px;
					overflow: hidden;
					position: absolute;
					bottom: 15px;
					left: -20px;
					height: 16px;
					line-height: 16px;
				}
			}
			.box_container_right {
				margin: 40px 0 0 22px;
				ul {
					list-style-type: none;
					li {
						font-family: '微软雅黑';
						color: #434343;
						font-size: 12px;
						margin-bottom: 9px;
						i {
							font-style: normal;
							margin-right: 12px;
						}
						b {
							font-weight: 400;
							color: #f13131;
						}
					}
					.box_container_gray {
						color: #b3b3b3;
						.recharge {
							height: 28px;
							width: 79px;
							border-radius: 3px;
							background: #e93248;
							border: none;
							color: #ffffff;
							margin-left: 15px;
							cursor: pointer;
						}
					}
				}
			}
      .statistics {
        padding-left: 20px;
        border-left: 1px dashed #ccc;
        height: 100px;
        position: absolute;
        top: 50%;
        right: 140px;
        transform: translateY(-50%);
        .tit {
          padding-left: 0 !important;
          color: rgb(141, 141, 141);
        }
        div {
          padding-left: 20px;
          line-height: 25px;
          span {
            color: red;
          }
        }
      }
		}
		.progress {
			width: 100%;
			box-sizing: border-box;
			padding: 0 0px 5px 0px;
		}
		.ivu-progress {
			margin-top: 15px;
			margin-bottom: 10px;
			position: relative;
			.ivu-progress-outer {
				padding-right: 0;
				.ivu-progress-inner {
					height: 15px;
					.ivu-progress-bg {
						height: 15px !important;
					}
				}
			}
			.ivu-progress-text {
				position: absolute;
				left: 50%;
				margin-left: 0;
				// color: rgb(231,24,38);
				transform: translateX(-50%);
				.ivu-icon-ios-checkmark:before {
					content: '';
				}
			}
		}
		.level_cur {
			float: left;
			left: 10px;
			font-size: 14px;
			color: #999;
		}
		.level_next {
			float: right;
			right: 10px;
			font-size: 14px;
			color: #999;
		}
		.center_info {
			text-align: center;
			font-size: 12px;
			color: #333;
			span {
				&:first-child {
					color: rgb(231, 24, 38);
				}
			}
		}

	}
	.loginpass {
			width: 400px;
			// height: 300px;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			border: 1px solid #ccc;
			box-shadow: #ccc 2px 3px 4px;
			padding: 0 10px 20px 10px;
			.head {
				padding: 5px 0;
				color: rgb(250, 132, 65);
				border-bottom: 1px solid rgb(250, 132, 65);
				position: relative;
				font-size: 13px;
			}
			.modify {
				padding: 10px 0;
				.box {
					width: 260px;
					margin: 0 auto;
					position: relative;
					.tit {
						display: inline-block;
						width: 60px;
						text-align: right;
						margin-right: 10px;
					}
					.tk_index {
						height: 25px;
						line-height: 25px;
						color: #999;
						width: 35px;
						text-align: center;
						font-size: 14px;
						margin: 0 5px;
						display: inline-block;
						background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ffffff), to(#f3f3f3));
						border: 1px Solid #cccccc;
					}
					.ivu-select-selection {
						height: 28px;
						border-radius: 2px;
						.ivu-select-placeholder {
							height: 28px;
							line-height: 28px;
						}
					}
					.ivu-input-wrapper {
						width: 180px !important;
					}
					.ivu-input {
						border-radius: 2px;
						height: 28px !important;
					}
					.verify_img {
						position: absolute;
						top: 5px;
						right: 10px;
						height: 28px;
					}
				}
			}
		}
		.modify {
			> div {
				padding: 5px 0;
			}
		}
		.enter {
			width: 70px;
			line-height: 24px;
			display: block;
			margin: 0 auto;
			color: #fff;
			text-align: center;
			cursor: pointer;
			background-color: rgb(62, 63, 64);
		}
		.close {
			display: inline-block;
			width: 20px;
			height: 20px;
			font-size: 20px;
			line-height: 20px;
			text-align: center;
			position: absolute;
			right: -8px;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
		}

  .lv {
    .ivu-tabs-nav-wrap {
      margin-bottom: 0 !important;
    }
    .ivu-tabs-content{
      border:none !important;
    }
    .ivu-tabs-bar{
      margin-top: 10px;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .ivu-tabs-tab{
        width: 70px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border:1px solid #ccc !important;
        border-bottom:1px solid #ccc !important;
        padding:0 !important;
        margin-right: 16px !important;
      }
      .ivu-tabs-tab-active {
        border: 1px solid #e71826 !important;
        background-color: #e71826 !important;
        color: #fff;
      }
    }
    .reward {
      .ivu-tabs-nav-wrap{
        // margin-bottom: -1px !important;
      }
      .ivu-tabs-bar{
        margin: 0 !important;
        padding: 0 20px !important;
      }
      .ivu-tabs-tab{
        width: 90px;
        border: none !important;
      }
      .ivu-tabs-tab-active {
        border: none !important;
        border-bottom: 4px solid #e71826 !important;
        background-color: #fff !important;
        color: #e71826;
      }
      li {
         border-bottom: 1px solid #ccc;
        span {
          display: inline-block;
          text-align: center;
          line-height: 35px;
          &:nth-child(1) {
            width: 15%;
          }
          &:nth-child(2) {
            width: 60%;
            color: #e71826;
          }
          &:nth-child(3) {
            width: 25%;
          }
        }
      }
      .gift {
        li {
          position: relative;
					cursor: pointer;
          &:after{
            content:'';
            width: 18px;
            height: 18px;
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: url('../../../assets/img/grade_gift.png') no-repeat;
            background-size: 100% 100%;
          }
          span {
            &:nth-child(1) {
              width: 20%;
              text-align: left;
              padding-left: 50px;
            }
            &:nth-child(3) {
              width: 20%;
							i{
								font-style: normal;
								display: inline-block;
								width: 50px;
								height: 20px;
								line-height: 20px;
								color: #fff;
								border-radius: 3px;
							}
            }
          }
        }
      }
    }
		.growing {
			li {
         border-bottom: 1px solid #ccc;
        span {
          display: inline-block;
          text-align: center;
          line-height: 35px;
          &:nth-child(1) {
            width: 15%;
          }
          &:nth-child(2) {
            width: 60%;
            color: #e71826;
          }
          &:nth-child(3) {
            width: 25%;
          }
        }
      }
		}
		.page {
			padding-top: 20px;
			position: relative;
			height: 46px;
			// >span{
			// 	display: inline-block;
			// 	border: 1px solid #DCDCDC;
			// 	width: 45px;
			// 	height: 24px;
			// 	border-radius: 3px;
			// 	text-align: center;
			// 	line-height: 22px;
			// 	position: absolute;
			// 	top: 20px;
			// 	cursor: pointer;
			// }
			// .h {
			// 	left: 230px;
			// }
			// .t{
			// 	left: 390px;
			// }
			.ivu-page{
				padding: 0;
				display: inline-block;
				position:absolute;
				top: 20px;
				left: 50%;
				transform: translateX(-50%);
				.ivu-page-total {
					// width: 45px;
					height: 24px;
					line-height: 24px;
					// position: absolute;
					// left: 270px;
					// top: 0;
				}
				li{
					height: 24px;
					min-width: 24px;
					line-height: 22px;
				}
				.ivu-page-options-elevator{
					height: 24px;
					line-height: 24px;
					input {
						height: 24px;
						line-height: 24px;
						text-align: center;
					}
				}
			}
		}
  }
	.rule {
		.tit {
			padding: 10px 0;
			border-bottom: 1px solid #ccc;
			p {
				color: #979797;
				line-height: 25px;
			}
			span {
				font-weight: 900;
				color: #000;
				line-height: 25px;
				margin-right: 40px;
				&:last-child{
					display: block;
				}
				i {
					color: #5F5F5F;
					font-weight: 400;
					 font-style:normal;
				}
			}
		}
	}
  .grade {
		font-size: 12px;
		color: #666;
		line-height: 40px;
		font-weight: 400;
	}
	table {
		tr {
			font-size: 12px;
			color: #666666;
		}
		th {
			width: 199px;
			border-collapse: collapse;
			background: #f2f7ff;
			text-align: center;
			line-height: 30px;
			border: 1px solid #e6e6e6;
			font-weight: 600;
		}
		td {
			line-height: 30px;
			text-align: center;
			border: 1px solid #e6e6e6;
		}
	}
}
</style>


