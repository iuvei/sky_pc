webpackJsonp([75],{1103:function(t,e,o){o(1561);var i=o(3)(o(1563),o(1564),"data-v-49945f52",null);t.exports=i.exports},1561:function(t,e,o){var i=o(1562);"string"==typeof i&&(i=[[t.i,i,""]]),o(2)(i,{}),i.locals&&(t.exports=i.locals)},1562:function(t,e,o){(t.exports=o(1)(void 0)).push([t.i,".correctLoginPW_main_body .content[data-v-49945f52]{height:43rem;background-color:#eee;padding:1.25rem}.correctLoginPW_main_body .content .form_ipt[data-v-49945f52]{overflow:hidden;border:.0625rem solid #bfbfbf;border-radius:.3125rem;height:auto}.correctLoginPW_main_body .content .form_ipt .verify_img[data-v-49945f52]{width:6.25rem;height:2rem}.correctLoginPW_main_body .content .tips[data-v-49945f52]{margin:1.625rem 0;text-align:center;font-size:.8125rem;color:#7d7d7d}.correctLoginPW_main_body .content .btn[data-v-49945f52]{margin-top:3.75rem;text-align:center}.correctLoginPW_main_body .content .btn button[data-v-49945f52]{width:18.75rem;height:2.5rem;font-size:1rem;line-height:1rem;color:#fff;background-color:#ff7c34;border-radius:.3125rem;outline:none;border:none}",""])},1563:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(1155),n=o.n(i);e.default={components:{publicHead:n.a},data:function(){return{funcName:"绑定QQ",isShow:!1,oldQQ:"",noldQQ1:"",newQQ:"",verifyImg:"",verifyNum:"",txt:"QQ",vid:""}},activated:function(){this.noldQQ="",this.noldQQ1="",this.newQQ="",this.verifyNum="",this.$dialog.loading.open("正在加载中···"),this.$store.state.userinfo.accountInfo.qq?(this.isShow=!0,this.funcName="修改QQ",this.txt="新QQ",this.oldQQ=this.$store.state.userinfo.accountInfo.qq):(this.isShow=!1,this.funcName="绑定QQ",this.txt="QQ"),this.getVerify()},methods:{submitData:function(){var t=this;(this.isShow?this.noldQQ1&&this.newQQ:this.newQQ)?this.verifyNum?/^[0-9]{4}$/.test(this.verifyNum)?this.$ajax("request",{ac:"updateUserInfo",oldqq:this.noldQQ1,qq:this.newQQ,vcode:1*this.verifyNum,vid:this.vid,type:5}).then(function(e){t.getVerify(),t.$dialog.alert({mes:"提交成功，请等待审核"}),t.$ajax("request",{ac:"encodeLogin",code:t.$store.state.userinfo.accountInfo.code}).then(function(e){t.$store.commit("GET_USERINFO",{accountInfo:e,isLogin:!0}),t.$router.back()})}):this.$dialog.toast({mes:"请输入正确验证码"}):this.$dialog.toast({mes:"请输入验证码"}):this.$dialog.toast({mes:"请输入qq号码"})},getVerify:function(t){var e=this;this.$ajax("request",{ac:"getVerifyImage"}).then(function(t){e.verifyImg=t.img,e.vid=t.vid,e.$dialog.loading.close()})},randomNum:function(){return Math.floor(1e4*Math.random())+""}}}},1564:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"correctLoginPW_main_body"},[o("publicHead",{attrs:{title:t.funcName,type:5}}),t._v(" "),o("div",{staticClass:"content"},[o("yd-cell-group",{staticClass:"form_ipt"},[o("yd-cell-item",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}]},[o("span",{slot:"left"},[t._v("原QQ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.noldQQ1,expression:"noldQQ1"}],attrs:{type:"text",placeholder:t.oldQQ},domProps:{value:t.noldQQ1},on:{input:function(e){e.target.composing||(t.noldQQ1=e.target.value)}},slot:"right"})]),t._v(" "),o("yd-cell-item",[o("span",{slot:"left"},[t._v(t._s(t.txt))]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.newQQ,expression:"newQQ"}],attrs:{type:"text",placeholder:"请输入新QQ号码"},domProps:{value:t.newQQ},on:{input:function(e){e.target.composing||(t.newQQ=e.target.value)}},slot:"right"})]),t._v(" "),o("yd-cell-item",[o("span",{slot:"left"},[t._v("验证码")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyNum,expression:"verifyNum"}],attrs:{type:"number",placeholder:"请输入验证码"},domProps:{value:t.verifyNum},on:{input:function(e){e.target.composing||(t.verifyNum=e.target.value)},blur:function(e){t.$forceUpdate()}},slot:"right"}),t._v(" "),o("span",{on:{click:t.getVerify},slot:"right"},[o("img",{staticClass:"verify_img",attrs:{src:t.verifyImg,alt:""}})])])],1),t._v(" "),o("p",{staticClass:"btn"},[o("button",{on:{click:t.submitData}},[t._v(t._s(t.isShow?"立即修改":"确定"))])])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=75.1396f4d229f98f32fbbf.js.map?1396f4d229f98f32fbbf