webpackJsonp([74],{1102:function(t,e,o){o(1557);var i=o(3)(o(1559),o(1560),"data-v-7b7952fd",null);t.exports=i.exports},1557:function(t,e,o){var i=o(1558);"string"==typeof i&&(i=[[t.i,i,""]]),o(2)(i,{}),i.locals&&(t.exports=i.locals)},1558:function(t,e,o){(t.exports=o(1)(void 0)).push([t.i,".correctLoginPW_main_body .content[data-v-7b7952fd]{height:43rem;background-color:#eee;padding:1.25rem}.correctLoginPW_main_body .content .form_ipt[data-v-7b7952fd]{overflow:hidden;border:.0625rem solid #bfbfbf;border-radius:.3125rem;height:auto}.correctLoginPW_main_body .content .form_ipt .verify_img[data-v-7b7952fd]{width:6.25rem;height:2rem}.correctLoginPW_main_body .content .tips[data-v-7b7952fd]{margin:1.625rem 0;text-align:center;font-size:.8125rem;color:#7d7d7d}.correctLoginPW_main_body .content .btn[data-v-7b7952fd]{margin-top:3.75rem;text-align:center}.correctLoginPW_main_body .content .btn button[data-v-7b7952fd]{width:18.75rem;height:2.5rem;font-size:1rem;line-height:1rem;color:#fff;background-color:#ff7c34;border-radius:.3125rem;outline:none;border:none}",""])},1559:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(1155),a=o.n(i);e.default={components:{publicHead:a.a},data:function(){return{funcName:"绑定微信",isShow:!1,oldWechat:"",oldWechat1:"",newWechat:"",verifyImg:"",verifyNum:"",vid:"",txt:"微信"}},activated:function(){this.oldWechat="",this.oldWechat1="",this.newWechat="",this.verifyNum="",this.$dialog.loading.open("正在加载中···"),this.$store.state.userinfo.accountInfo.wechat?(this.isShow=!0,this.txt="新微信",this.funcName="修改微信",this.oldWechat=this.$store.state.userinfo.accountInfo.wechat):(this.isShow=!1,this.txt="微信",this.funcName="绑定微信"),this.getVerify()},methods:{submitData:function(){var t=this;(this.isShow?this.oldWechat1&&this.newWechat:this.newWechat)?this.verifyNum?/^[0-9]{4}$/.test(this.verifyNum)?this.$ajax("request",{ac:"updateUserInfo",oldwechat:this.oldWechat1,wechat:this.newWechat,vcode:this.verifyNum,vid:this.vid,type:4}).then(function(e){t.getVerify(),t.$dialog.alert({mes:"提交成功，请等待审核"}),t.$ajax("request",{ac:"encodeLogin",code:t.$store.state.userinfo.accountInfo.code}).then(function(e){t.$store.commit("GET_USERINFO",{accountInfo:e,isLogin:!0}),t.$router.back()})}):this.$dialog.toast({mes:"请输入正确验证码"}):this.$dialog.toast({mes:"请输入验证码"}):this.$dialog.toast({mes:"请输入微信号"})},getVerify:function(t){var e=this;this.$ajax("request",{ac:"getVerifyImage"}).then(function(t){e.verifyImg=t.img,e.vid=t.vid,e.$dialog.loading.close()})},randomNum:function(){return Math.floor(1e4*Math.random())+""}}}},1560:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"correctLoginPW_main_body"},[o("publicHead",{attrs:{title:t.funcName,type:5}}),t._v(" "),o("div",{staticClass:"content"},[o("yd-cell-group",{staticClass:"form_ipt"},[o("yd-cell-item",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}]},[o("span",{slot:"left"},[t._v("原微信")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.oldWechat1,expression:"oldWechat1"}],attrs:{type:"text",placeholder:t.oldWechat},domProps:{value:t.oldWechat1},on:{input:function(e){e.target.composing||(t.oldWechat1=e.target.value)}},slot:"right"})]),t._v(" "),o("yd-cell-item",[o("span",{slot:"left"},[t._v(t._s(t.txt))]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.newWechat,expression:"newWechat"}],attrs:{type:"text",placeholder:"请输入新微信"},domProps:{value:t.newWechat},on:{input:function(e){e.target.composing||(t.newWechat=e.target.value)}},slot:"right"})]),t._v(" "),o("yd-cell-item",[o("span",{slot:"left"},[t._v("验证码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyNum,expression:"verifyNum"}],attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:t.verifyNum},on:{input:function(e){e.target.composing||(t.verifyNum=e.target.value)},blur:function(e){t.$forceUpdate()}},slot:"right"}),t._v(" "),o("span",{on:{click:t.getVerify},slot:"right"},[o("img",{staticClass:"verify_img",attrs:{src:t.verifyImg,alt:""}})])])],1),t._v(" "),o("p",{staticClass:"btn"},[o("button",{on:{click:t.submitData}},[t._v(t._s(t.isShow?"立即修改":"确定"))])])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=74.110a9a24d6e8499718bb.js.map?110a9a24d6e8499718bb